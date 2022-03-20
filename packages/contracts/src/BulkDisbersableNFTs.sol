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
    RoleGiver,
    Transferer,
    MetadataConfig,
    Maintainer,
    Reserved2,
    Reserved1
  }

  // internal token gating tokens are the top eight bits 
  uint256 public constant LOWER248 = 2**248 - 1;
  uint256 public constant SUPERUSER_TOKEN = (
    (uint(Role.Superuser) << 248) + LOWER248
  );
  uint256 public constant MINTER_TOKEN = (
    (uint(Role.Minter) << 248) + LOWER248
  );
  uint256 public constant ROLE_GIVER_TOKEN = (
    (uint(Role.RoleGiver) << 248) + LOWER248
  );
  uint256 public constant TRANSFERER_TOKEN = (
    (uint(Role.Transferer) << 248) + LOWER248
  );
  uint256 public constant METADATA_CONFIG_TOKEN = (
    (uint(Role.MetadataConfig) << 248) + LOWER248
  );
  uint256 public constant MAINTAINER_TOKEN = (
    (uint(Role.Maintainer) << 248) + LOWER248
  );


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

  function _hasRole(Role role)
    internal
    view
    returns (bool has)
  {
    uint256 id = (uint(role) << 248) + LOWER248;
    return balanceOf(_msgSender(), id) > 0;
  }

  function _isSuper()
    internal
    view
    returns (bool superuser)
  {
    return _hasRole(Role.Superuser) || _msgSender() == owner();
  }

  function addSuperuser(address user)
    public
  {
    require(
      _isSuper(),
      "You must be a superuser to create new ones."
    );
    uint256 tokenId = (uint(Role.Superuser) << 248) + LOWER248;
    mint(user, tokenId, 1, "New Superuser");
  }

  function uri(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    return uris[tokenId];
  }

  function setURI(string calldata newuri, uint256 tokenId)
    public
    virtual
  {
    require(
      _hasRole(Role.MetadataConfig) || _isSuper(),
      "You must have a MetadataConfig token to change metadata."
    );
    uris[tokenId] = newuri;
    emit URI(newuri, tokenId);
  }

  function mint(
    address recipient,
    uint256 amount,
    string calldata metadata,
    bytes memory data
  )
    public
    virtual
    returns (uint256 tokenId)
  {
    numTokenTypes.increment();
    uint256 id = numTokenTypes.current();
    mint(recipient, id, amount, data);
    setURI(metadata, id);
    return id;
  }

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