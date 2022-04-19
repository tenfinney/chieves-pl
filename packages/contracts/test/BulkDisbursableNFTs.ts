import { expect } from 'chai'
import { ethers as Ethers } from 'ethers'
import { ethers, upgrades } from 'hardhat'

describe('The Token Contract', () => {
  it(
    'should create four tokens when reserving.',
    async () => {
      const [owner] = await ethers.getSigners()
      const Token = await ethers.getContractFactory(
        'BulkDisbursableNFTs'
      )
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

      expect(event).to.not.be.undefined

      const [createdId, _controller] = event.args

      const [
        TYPE_WIDTH, TYPE_BOUNDARY,
        GATING_TYPE, VANILLA_TYPE,
        ROLE_WIDTH, ROLE_BOUNDARY,
        MINTER_ROLE, CONFIGURER_ROLE, LIMITER_ROLE,
      ] = [
        await token.TYPE_WIDTH(),
        await token.TYPE_BOUNDARY(),
        await token.GATING_TYPE(),
        await token.VANILLA_TYPE(),
        await token.ROLE_WIDTH(),
        await token.ROLE_BOUNDARY(),
        await token.roleValueForName("Minter"),
        await token.roleValueForName("Configurer"),
        await token.roleValueForName("Limiter"),
      ]
      .map((val) => BigInt(val))

      expect(createdId).to.equal(VANILLA_TYPE + 1n)

      expect(await token['totalSupply()']()).to.equal(4)

      const tokens = await Promise.all(
        Array.from({ length: 4 }, (_, i) => i)
        .map(async (idx) => (
          (await token.tokenByIndex(idx)).toBigInt()
        ))
      )

      const vanilla = tokens[0]
      const gates = tokens.slice(1)

      expect(vanilla).to.equal(createdId)

      await Promise.all(gates.map(async (tkn) => (
        (tkn & ((2n**TYPE_WIDTH) - 1n)) === GATING_TYPE
      )))

      const roles = await Promise.all(
        gates.map(async (tkn) => (
          (tkn >> ROLE_BOUNDARY) & 2n**ROLE_WIDTH - 1n
        ))
      )

      expect(roles).to.have.members(
        [MINTER_ROLE, CONFIGURER_ROLE, LIMITER_ROLE]
      )
    }
  )
})
