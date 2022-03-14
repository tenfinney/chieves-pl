const fs = require("fs")
const chalk = require("chalk")
const hre = require("hardhat")

const publishDir = "../ui/contracts"
const graphDir = "../subgraph"

function publishContract(contractName) {
  console.log(
    ` 💽 Publishing ${chalk.cyan(contractName)}`
    + ` to ${chalk.gray(publishDir)}`
  )
  try {
    let contract = (
      JSON.parse(
        fs
        .readFileSync(`${hre.config.paths.artifacts}/contracts/${contractName}.sol/${contractName}.json`)
        .toString()
      )
    )
    const address = (
      fs
      .readFileSync(`${hre.config.paths.artifacts}/${contractName}.address`)
      .toString()
    )
    let graphConfigPath = `${graphDir}/config/config.json`
    let graphConfig
    try {
      if (fs.existsSync(graphConfigPath)) {
        graphConfig = fs
          .readFileSync(graphConfigPath)
          .toString()
      } else {
        graphConfig = '{}'
      }
    } catch (e) {
      console.error(e)
    }

    graphConfig = JSON.parse(graphConfig)
    graphConfig[contractName + "Address"] = address
    fs.writeFileSync(
      `${publishDir}/${contractName}.address.js`,
      `module.exports = "${address}"`
    )
    fs.writeFileSync(
      `${publishDir}/${contractName}.abi.js`,
      `module.exports = ${JSON.stringify(contract.abi, null, 2)}`
    )
    fs.writeFileSync(
      `${publishDir}/${contractName}.bytecode.js`,
      `module.exports = "${contract.bytecode}"`
    )

    const folderPath = graphConfigPath.replace('/config.json', '')
    if (!fs.existsSync(folderPath)){
      fs.mkdirSync(folderPath)
    }
    fs.writeFileSync(
      graphConfigPath,
      JSON.stringify(graphConfig, null, 2)
    )
    fs.writeFileSync(
      `${graphDir}/abis/${contractName}.json`,
      JSON.stringify(contract.abi, null, 2)
    )

    console.log(
      ` 📠 Published ${chalk.green(contractName)} to the frontend.`
    )

    return true
  } catch (e) {
    if(/no such file or directory/i.test(e.message)) {
      console.log(chalk.yellow(
        ` ⚠️  Can't publish ${contractName} yet. (is it deployed?)`
      ))
    } else {
      console.error(e)
      return false
    }
  }
}

async function main() {
  if(!fs.existsSync(publishDir)) {
    fs.mkdirSync(publishDir)
  }
  const finalContractList = []
  fs.readdirSync(hre.config.paths.sources).forEach(
    (file) => {
      if(file.endsWith('.sol')) {
        const contractName = file.replace(/\.sol$/, '')
        if(publishContract(contractName)) {
          finalContractList.push(contractName)
        }
      }
    }
  )
  fs.writeFileSync(
    `${publishDir}/contracts.js`,
    `module.exports = ${JSON.stringify(finalContractList)}`
  )
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error)
  process.exit(1)
})
