import { expect } from 'chai'
import { ethers as Ethers } from 'ethers'
import { ethers, upgrades } from 'hardhat'

describe('The Token Contract', () => {
  it(
    'should create four tokens when reserving.',
    async () => {
      const [owner] = await ethers.getSigners()

      const Token = await ethers.getContractFactory('BulkDisbursableNFTs')
      const token = await upgrades.deployProxy(
        Token,
        ['MetaGame ’Chievemints', 'MG’s 🏆s'],
        { kind: 'uups', timeout: 10 * 60 * 1000 },
      )
      expect(await token.owner()).to.equal(owner.address)
      const tx = await token['create()']()
      const receipt = await tx.wait()
      let event = receipt.events.find(
        (evt: Ethers.Event) => evt.event === 'Created'
      )
      if(!event) {
        throw new Event(
          'Couldn’t find a creation event.'
        )
      }
      const [id, _controller] = event.args
      expect(id).to.equal(1)
      expect(await token['totalSupply()']()).to.equal(4)
      expect((await token.tokenByIndex(1)).toHexString())
      .to.equal('0x0c0400000000000000000000000000000000000000000000000000000001')
    }
  )
})
