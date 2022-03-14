const fs = require('fs')
const chalk = require('chalk')
const { config, ethers, tenderly, run, upgrades } = require('hardhat')
const { utils } = require('ethers')
const R = require('ramda')

const name = 'BulkDisbersableNFTs'

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

  console.log(chalk.blue(' 🎙 Persisting Tenderly Artifacts…'))
  await tenderly.persistArtifacts({
    name: contract,
    address: proxy.address,
  })

  const verification = (
    await tenderlyVerify({ contract: name, address: proxy.address })
  )

  console.debug({ verification })

  console.log(chalk.blue(' 🔍 Verifying on Etherscan…'))
  await run('verify:verify', {
    address: proxy.address,
    constructorArguments: [],
  })

  console.log(
    ' 💾  Artifacts (address, abi, and args) saved to:'
    + chalk.blue(__dirname)
    + "\n\n"
  )
}

const fileTemplates = {
  address: 'artifacts/{contract}.address',
  args: 'artifacts/{contract}.args',
}

const deploy = async (contract, _args = [], overrides = {}, libraries = {}) => {
  const files = Object.fromEntries(
    Object.entries(fileTemplates).map(([name, template]) => ([
      name,
      template.replace(/\{contract\}/g, contract)
    ]))
  )

  console.log(` 🛰  Deploying: ${contract}`)

  if(!ethers) throw new Error('`ethers` is not defined.')

  const args = _args ?? []
  const artifacts = await ethers.getContractFactory(
    contract, { libraries }
  )

  let deployed
  if(!fs.existsSync(files.address)) {
    console.log(`${chalk.hex('#FF7D31')(files.address)} doesn't exist; creating a new proxy…`)
    deployed = await upgrades.deployProxy(artifacts, { kind: 'uups' })
  } else {
    const existing = await fs.readFileSync(files.address).toString().trim()
    console.log(`Existing deployment at ${chalk.hex('#AD4EFF')(existing)}; upgrading`)
    deployed = await upgrades.upgradeProxy(existing, artifacts)
  }

  const {
    address,
    signer: { address: signer },
    deployTransaction: { gasPrice, hash: tx, chainId: chain },
  } = deployed

  const implementation = (
    await upgrades.erc1967.getImplementationAddress(address)
  )

  debug({ deployed, implementation })

  console.log(
    ` 📄 ${chalk.cyan(contract)},`
    + ` deployed as a proxy at ${chalk.magenta(address)}`
    + ` to the implementation at ${chalk.hex('#DE307E')(implementation)}`
    + ` by ${chalk.hex('#5A5FA5')(signer)}`
    + ` on chain ${chalk.yellow(`#${chain}`)}`
    + ` ${chalk.green(`(saved to ${files.address})`)}.`
  )
  fs.writeFileSync(files.address, address)

  let gasInfo = '𐌵ⲛⲕⲛⲟⲱⲛ'
  if(deployed?.deployTransaction) {
    const gasUsed = (
      deployed.deployTransaction.gasLimit.mul(gasPrice)
    )
    gasInfo = (
      `${utils.formatEther(gasUsed)} ETH, TX Hash: ${tx}`
    )
  }

  console.log(` ⛽ ${chalk.grey(gasInfo)}`)

  const encoded = abiEncodeArgs(deployed, args)

  if (encoded.length > 2) {
    console.log(
      ` 📚 Serializing ${encoded.length}`
      + ` arguments to ${chalk.blue(files.args)}.`
    )
    fs.writeFileSync(files.args, encoded.slice(2))
  }

  return deployed
}

// ------ utils -------

// abi encodes contract arguments
// useful when you want to manually verify the contracts
// for example, on Etherscan
const abiEncodeArgs = (deployed, args) => {
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
const isSolidity = (filename) => (
  /\.(sol|swp|swap)$/i.test(filename)
)

const sleep = (ms) => (
  new Promise(resolve => setTimeout(resolve, ms))
)

// If you want to verify on https://tenderly.co/
const tenderlyVerify = async ({
  contract: name, address, network = null,
}) => {
  let tenderlyNetworks = [
    'kovan', 'goerli', 'mainnet', 'rinkeby', 'ropsten',
    'matic', 'mumbai', 'xDai', 'POA',
  ]
  network ??= (
    process.env.HARDHAT_NETWORK ?? config.defaultNetwork
  )

  if(!tenderlyNetworks.includes(network)) {
    console.error(chalk.grey(
      ` 🧐 Contract verification not supported`
      + ` on ${chalk.blue(network)}.`
    ))
  } else {
    console.log(
      ' 📁 Attempting tenderly verification of'
      + ` ${chalk.blue(name)} on`
      + ` ${chalk.green(network)}.`
    )

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
