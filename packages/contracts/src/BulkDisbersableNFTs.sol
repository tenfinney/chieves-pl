// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.4;

// From: https://wizard.openzeppelin.com/#erc1155

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

/// @custom:security-contact dys@dhappy.org
contract BulkDisbersableNFTs is Initializable, ERC1155Upgradeable, OwnableUpgradeable, ERC1155BurnableUpgradeable, ERC1155SupplyUpgradeable, UUPSUpgradeable {
  using CountersUpgradeable for CountersUpgradeable.Counter;

  // Note that because the contract is proxied, the
  // storage members and order cannot change
  string public name;
  string public symbol;

  mapping (uint256 => string) private uris;
  CountersUpgradeable.Counter private numTokenTypes;

  enum Role {
    Superuser,
    Minter,
    Caster,
    Transferer,
    MetadataConfig,
    Maintainer,
    Reserved2,
    Reserved1
  }

  // 13 publicity bits defining groups to which
  // the the token information is accessible
  uint256 public constant TEAM = [
    binstr("0b0000000000001") << 243,
    binstr("0b0000000000010") << 243,
    binstr("0b0000000000100") << 243,
    binstr("0b0000000001000") << 243,
    binstr("0b0000000010000") << 243,
    binstr("0b0000000100000") << 243,
    binstr("0b0000001000000") << 243,
    binstr("0b0000010000000") << 243,
    binstr("0b0000100000000") << 243,
    binstr("0b0001000000000") << 243,
    binstr("0b0010000000000") << 243,
    binstr("0b0100000000000") << 243,
    binstr("0b1000000000000") << 243
  ];

  // The three alliances are combinations of the
  // 13 teams. Marking an alliance publicity might
  // give moderated access to an information stream.
  uint256 public constant RED_ALLAIANCE    = binstr("0x100") << 240;
  uint256 public constant PURPLE_ALLAIANCE = binstr("0x010") << 240;
  uint256 public constant BLUE_ALLAIANCE   = binstr("0x001") << 240;

  // Gating tokens control access to contract
  // functionality.
  uint256 public constant GATING_TYPE       = 0x1 << 236;
  // Membership tokens represent being given
  // access to a team's information.
  uint256 public constant MEMBERSHIP_TYPE   = 0x2 << 236;
  // Address tokens have a lower 160 bits which
  // correspond to an Ethereum address.
  uint256 public constant ADDRESS_TYPE      = 0x3 << 236; // ¿?
  // Experimental tokens are meant to demonstrate
  // properties of the system. Thje flag may be used
  // in conjunction with other types.
  uint256 public constant EXPERIMENTAL_TYPE = binstr("0b1000") << 253;

  // Superusers have access to the bulk of the
  // functions of the contract.  
  uint256 public constant SUPERUSER_ROLE  = uint(Role.Minter) << 248;
  // Minters have the capacity to create new tokens
  // subject to restrictions on quantity and whether
  // an individual may hold duplicates.
  uint256 public constant MINTER_ROLE     = uint(Role.Minter) << 248;
  // Casters may cast roles upon other users except
  // for superusers who may only be created by
  // other superusers (or the owner).
  uint256 public constant CASTER_ROLE     = uint(Role.Caster) << 248;
  // Transferers have the ability to move certain
  // tokens between accounts.
  uint256 public constant TRANSFERER_ROLE = uint(Role.Transferer) << 248;

  uint256 public constant SUPERUSER_TOKEN = (
    GATING_TYPE + SUPERUSER_ROLE
  );
  uint256 public constant MINTER_TOKEN = (
    GATING_TYPE + MINTER_ROLE
  );
  uint256 public constant CASTER_TOKEN = (
    GATING_TYPE + MINTER_ROLE
  );
  uint256 public constant TRANSFERER_TOKEN = (
    GATING_TYPE + TRANSFERER_ROLE
  );
  uint256 public constant METADATA_CONFIG_TOKEN = (
    (uint(Role.MetadataConfig) << 248) + GATING_BYTE
  );
  uint256 public constant MAINTAINER_TOKEN = (
    (uint(Role.Maintainer) << 248) + GATING_BYTE
  );

function binstr(
  bytes5 input
)
  public
  pure
  returns (uint8 value)
{
  uint8 n = 0;
  uint8 i = 0;

  if(input[0] == "0" && input[1] == "b") {
    i = 2;
  }

  for(i; i < 5; i++) {
    n *= 2;
    if(input[i] == "1") {
      n += 1;
    } else {
      require(input[i] == "0");
    }
  }

  return n;
}


  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() initializer {}

  function initialize(string calldata _name, string calldata _symbol)
    initializer
    public
  {
    name = _name;
    symbol = _symbol;

    __ERC1155_init("Error: Single Token URI Not Used");
    __Ownable_init();
    __ERC1155Burnable_init();
    __ERC1155Supply_init();
    __UUPSUpgradeable_init();
  }

  function hasRole(Role role)
    public
    virtual
    view
    returns (bool has)
  {
    return hasRole(role, _msgSender());
  }

  function hasRole(Role role, address user)
    public
    virtual
    view
    returns (bool has)
  {
    return hasRole(role, user, 0);
  }

  function hasRole(Role role, address user, uint256 id)
    public
    virtual
    view
    returns (bool has)
  {
    uint256 gate = (uint(role) << 248) + GATING_BYTE;
    return balanceOf(user, gate) > 0 || balanceOf(user, gate + id) > 0;
  }

  function isSuper()
    public
    virtual
    view
    returns (bool superuser)
  {
    return hasRole(Role.Superuser) || _msgSender() == owner();
  }

  function grantRole(Role role, address user)
    public
    virtual
    returns (uint8 assignments)
  {
    return grantRole(role, user, 0)
  }

  function grantRole(Role role, address user, uint256 id)
    public
    virtual
    returns (uint8 assignments)
  {
    if(role == Role.Superuser) {
      require(
        _isSuper(),
        "You must be a superuser to create new ones."
      );
    } else {
      require(
        hasRole(Role.Caster) || _isSuper(),
        "You must have the Caster role to assign new roles."
      );
    }
    if(!hasRole(role, user, id)) {
      uint256 id = (uint(role) << 248) + GATING_BYTE + id;
      mint(user, id, 1, []);
      return 1;
    }
    return 0;
  }

  function uri(uint256 id)
    public
    view
    virtual
    override
    returns (string memory)
  {
    return uris[id];
  }

  function setURI(uint256 id, string calldata uri)
    public
    virtual
  {
    require(
      _hasRole(Role.MetadataConfig) || _isSuper(),
      "You must have a MetadataConfig token to change metadata."
    );
    uris[id] = uri;
    emit URI(uri, id);
  }

  function setMax(
    uint256 id,
    uint256 max
  )
    public
    virtual
    returns (uint256 tokenId)
  {

  }

  function create()
    public
    virtual
    returns (uint256 tokenId)
  {
    return create(0);
  }

  function create(
    uint256 max
  )
    public
    virtual
    returns (uint256 tokenId)
  {
    numTokenTypes.increment();
    uint256 id = numTokenTypes.current();
    setMax(max, id);
    return id;
  }

  function configure(
    uint256 id,
    string calldata metadataURI,
    uint256 max
  )
    public
    virtual

  function mint(
    address recipient,
    uint256 id,
    uint256 amount,
    bytes memory data
  )
    public
    virtual
  {
    if((id & LOWER248) == LOWER248) { // token gate
      require(
        _hasRole(Role.RoleGiver) || _isSuper(),
        "You must have a RoleGiver token to mint token gates."
      );
    } else {
      require(
        _hasRole(Role.Minter) || _isSuper(),
        "You must have a Minter token to mint tokens."
      );
    }
    _mint(recipient, id, amount, data);
  }

  function distributeSingles(
    address from,
    address[] memory to,
    uint256 id,
    bytes memory data
  )
    public
    virtual
  {
    require(
      from == _msgSender() || isApprovedForAll(from, _msgSender()),
      "ERC1155: caller is not owner nor approved"
    );
    for (uint256 i = 0; i < to.length; ++i) {
      _safeTransferFrom(from, to[i], id, 1, data);
    }
  }

  function tokenTypeCount()
    public
    view
    returns (uint256 numTypes)
  {
    return numTokenTypes.current();
  }

  function _authorizeUpgrade(address)
    internal
    view
    override
  {
    require(
      _hasRole(Role.Maintainer) || _isSuper(),
      "You must have a Maintainer token to upgrade the contract."
    );
  }

  // The following functions are overrides required by Solidity.
  function _beforeTokenTransfer(
    address operator,
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  )
    internal
    override(ERC1155Upgradeable, ERC1155SupplyUpgradeable)
  {
    require(
      _hasRole(Role.Transferer) || _isSuper(),
      "You must have a Transferer token to transfer tokens."
    );
    super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
  }
}