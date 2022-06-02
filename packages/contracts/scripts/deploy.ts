import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import {
  config, ethers, tenderly, run, upgrades, network,
} from 'hardhat'
import { utils, Contract } from 'ethers'
import R from 'ramda'
import { Maybe } from '../../ui/lib/types'

const name = 'BulkDisbursableNFTs'

const DEBUG = false
const debug = (...info: Array<unknown>) => {
  if (DEBUG) console.debug(...info)
}

const chain = (
  process.env.HARDHAT_NETWORK ?? config.defaultNetwork
)

const main = async () => {
  console.log(`\n\n 📡 Deploying: ${name}…\n`)

  const proxy = await deploy(name)

  //const yourContract = await ethers.getContractAt('YourContract', '0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A') //<-- if you want to instantiate a version of a contract at a specific address!
  //If you want to verify your contract on tenderly.co (see setup details in the scaffold-eth README!)
  /*
  await tenderlyVerify(
    {contractName: 'YourContract',
     contractAddress: yourContract.address
  })
  */

  const implementationAddress = (
    await upgrades.erc1967.getImplementationAddress(proxy.address)
  )

  const verification = (
    await tenderlyVerify({ contract: name, address: implementationAddress })
  )

  try {
    console.log(chalk.hex('#FFD25E')(
      `\n 🔍 Verifying ${chalk.hex('#8454FF')(implementationAddress)}`
      + ` on ${['polygon', 'mumbai'].includes(chain) ? 'Polygon' : 'Ether'}scan…\n`
    ))
    await run('verify:verify', {
      address: implementationAddress,
      constructorArguments: [],
    })
  } catch(err) {
    console.error((err as Error).message)
  }

  let saveDir = config.paths.artifacts
  if(process.env.PWD && saveDir.startsWith(process.env.PWD)) {
    saveDir = saveDir.substring(process.env.PWD.length + 1)
  }
  console.log(
    '\n 💾  Artifacts (address, abi, and args) saved to:'
    + ` ${chalk.hex('#87FF37')(saveDir)}\n\n` 
  )
}

const fileTemplates = {
  address: `artifacts/${network.name}/{contract}.address`,
  args: `artifacts/${network.name}/{contract}.args`,
}

const deploy = async (contract: string, _args = [], overrides = {}, libraries = {}) => {
  const files = Object.fromEntries(
    Object.entries(fileTemplates).map(
      ([name, template]) => {
        template = template.replace(/\{contract\}/g, contract)
        const dir = path.dirname(template)
        if(!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }
        return [name, template]
      }
    )
  )

  console.log(`\n 🛰  Deploying: ${contract}`)

  if(!ethers) throw new Error('`ethers` is not defined.')

  const args = _args ?? []
  const artifacts = await ethers.getContractFactory(
    contract, { libraries }
  )

  let deployed
  let impl: { new?: string, old?: string } = {}

  if(!fs.existsSync(files.address)) {
    console.log(
      `\n 🥂 ${chalk.hex('#FF7D31')(files.address)} doesn't exist;`
      + ' creating a new proxy…'
    )
    deployed = await upgrades.deployProxy(
      artifacts,
      ['SmartLaw Cred Tokens'],
      { kind: 'uups', timeout: 10 * 60 * 1000 },
    )
  } else {
    const existing = (
      fs.readFileSync(files.address).toString().trim()
    )
    impl.old = (
      await upgrades.erc1967.getImplementationAddress(existing)
    )

    console.log(
      `\n ⚇ Existing deployment proxied at ${chalk.hex('#AD4EFF')(existing)}`
      + ` for implementation ${chalk.hex('#87BED5')(impl.old)};`
      + ' upgrading'
    )
    deployed = await upgrades.upgradeProxy(
      existing,
      artifacts,
      { kind: 'uups', timeout: 10 * 60 * 1000 },
    )
  }

  const {
    address: proxy,
    signer: signator,
    deployTransaction: {
      gasPrice: gas, hash: tx, chainId: chain,
    },
  } = deployed
  const signer = await signator.getAddress()
  const gasPrice = gas ?? 'Undefined'

  console.debug(
    ` 🍅 ${chalk.hex('#00AA7F')('Deployed in TX:')} `
    + chalk.hex('#6572AA')(tx)
  )
  let loops = 0
  const timeout =  4 * 1000
  const maxLoops = 25
  let done = false

  while(!done && ++loops <= maxLoops) {
    try {
      impl.new = (
        await upgrades.erc1967.getImplementationAddress(proxy)
      )
    } catch(err) {} // fails if the proxy isn't yet connected
    done = impl.new != null && impl.old !== impl.new
    if(!done) {
      console.info(
        ` ${chalk.hex('#FF0606')(loops.toString())}:`
        + ' No new implmentation found at'
        + ` ${chalk.hex('#FFF013')(proxy)};`
        + ` sleeping ${timeout / 1000}s`
      )
      await sleep(timeout)
    }
  }

  if(!impl.new) {
    throw new Error('Proxy implementation never loaded.')
  }

  console.log(
    `\n 📄 ${chalk.cyan(contract)},`
    + ` deployed as a proxy at ${chalk.magenta(proxy)}`
    + ` to the implementation at ${chalk.hex('#DE307E')(impl.new)}`
    + ` by ${chalk.hex('#5A5FA5')(signer)}`
    + ` on chain ${chalk.bold.yellowBright(`#${chain}`)}`
    + ` ${chalk.green(`(saved to ${files.address})`)}.`
  )
  fs.writeFileSync(files.address, proxy)

  let gasInfo = '𐌵ⲛⲕⲛⲟⲱⲛ'
  if(typeof(gasPrice) === 'number') {
    const gasUsed = (
      deployed.deployTransaction.gasLimit.mul(gasPrice)
    )
    gasInfo = (
      `${utils.formatEther(gasUsed)} `
      + (network.name === 'polygon' ? 'MATIC' : 'ETH')
    )
  }

  console.log(`\n ⛽ ${chalk.hex('#C6A831')(gasInfo)}`)

  const encoded = abiEncodeArgs(deployed, args)

  if(encoded && encoded.length > 2) {
    console.log(
      `\n 📚 Serializing ${encoded.length}`
      + ` arguments to ${chalk.hex('#6FBCFF')(files.args)}.`
    )
    fs.writeFileSync(files.args, encoded.slice(2))
  }

  return deployed
}

// ------ utils -------

// abi encodes contract arguments
// useful when you want to manually verify the contracts
// for example, on Etherscan
const abiEncodeArgs = (deployed: Contract, args: Array<unknown>) => {
  if (
    args
    && deployed
    && R.hasPath(['interface', 'deploy'], deployed)
  ) {
    return (
      utils.defaultAbiCoder.encode(
        deployed.interface.deploy.inputs, args
      )
    )
  }
}

// checks if it is a Solidity file
const isSolidity = (filename: string) => (
  /\.(sol|swp|swap)$/i.test(filename)
)

const sleep = (ms: number) => (
  new Promise(resolve => setTimeout(resolve, ms))
)

// If you want to verify on https://tenderly.co/
const tenderlyVerify = async ({
  contract: name, address, network = null,
}: {
  contract: string, address: string, network?: Maybe<string>,
}) => {
  let tenderlyNetworks = [
    'kovan', 'goerli', 'mainnet', 'rinkeby', 'ropsten',
    'matic', 'mumbai', 'xDai', 'POA',
  ]
  network ??= chain

  if(!tenderlyNetworks.includes(network)) {
    console.error(chalk.grey(
      ` 🧐 Contract verification not supported`
      + ` on ${chalk.hex('#98FFC1')(network)}.`
    ))
  } else {
    console.log(
      '\n 📁 Attempting tenderly verification of'
      + ` ${chalk.hex('#98FFC1')(name)}`
      + ` (${chalk.hex('#FF2EFC')(address)}) on`
      + ` ${chalk.green(network)}.`
    )

    console.log(chalk.hex('#00AAFF')(
      '\n 🎙 Persisting Tenderly artifacts…\n'
    ))
    await tenderly.persistArtifacts({ name, address })

    return (
      tenderly.verify({
        name, address, network
      })
    )
  }
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error({ error })
  process.exit(-1)
})
