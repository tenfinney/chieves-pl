import { expect } from 'chai'

describe('The Token Contract', () => {
  it(
    'Deployment should assign the total supply of tokens to the owner',
    async () => {
      const [owner] = await ethers.getSigners()

      const Token = await ethers.getContractFactory('BulkDisbursableNFTs')
      const hardhatToken = await Token.deploy()

      const ownerBalance = await hardhatToken.balanceOf(owner.address)
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance)
    }
  )
})
