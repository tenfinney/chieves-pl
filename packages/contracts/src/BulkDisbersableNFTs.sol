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

  uint256 public constant TEAM_BOUNDARY = 243;
  uint256 public constant MODE_BOUNDARY = 240;
  uint256 public constant TYPE_BOUNDARY = 236;
  uint256 public constant ROLE_BOUNDARY = 230;
  
  // 13 publicity bits defining groups to which
  // the the token information is accessible

  // Error: Constants of non-value type not yet implemented.
  // uint256[] public constant TEAM = []

  uint256 public constant TEAM_1 = 2**0 << TEAM_BOUNDARY;
  uint256 public constant TEAM_2 = 2**1 << TEAM_BOUNDARY;
  uint256 public constant TEAM_3 = 2**2 << TEAM_BOUNDARY;
  uint256 public constant TEAM_4 = 2**3 << TEAM_BOUNDARY;
  uint256 public constant TEAM_5 = 2**4 << TEAM_BOUNDARY;
  uint256 public constant TEAM_6 = 2**5 << TEAM_BOUNDARY;
  uint256 public constant TEAM_7 = 2**6 << TEAM_BOUNDARY;
  uint256 public constant TEAM_8 = 2**7 << TEAM_BOUNDARY;
  uint256 public constant TEAM_9 = 2**8 << TEAM_BOUNDARY;
  uint256 public constant TEAM_A = 2**9 << TEAM_BOUNDARY;
  uint256 public constant TEAM_B = 2**10 << TEAM_BOUNDARY;
  uint256 public constant TEAM_C = 2**11 << TEAM_BOUNDARY;
  uint256 public constant TEAM_D = 2**12 << TEAM_BOUNDARY;

  // There are four modes for how the publicity
  // is interpreted.
  uint256 public constant REQUIRE_ALL   = 1 << MODE_BOUNDARY;
  uint256 public constant REQUIRE_NONE  = 2 << MODE_BOUNDARY;
  uint256 public constant REQUIRE_ONE   = 3 << MODE_BOUNDARY;
  uint256 public constant USE_ONCE      = 4 << MODE_BOUNDARY;
  uint256 public constant USE_UNLIMITED = 5 << MODE_BOUNDARY;
  uint256 public constant UNIQUE        = 6 << MODE_BOUNDARY;
  

  // Gating tokens control access to contract
  // functionality.
  uint256 public constant GATING_TYPE        = 1 << TYPE_BOUNDARY;
  // Membership tokens represent being given
  // access to a team's information.
  uint256 public constant MEMBERSHIP_TYPE    = 2 << TYPE_BOUNDARY;
  // Address tokens have a lower 160 bits which
  // correspond to an Ethereum address.
  uint256 public constant ADDRESS_TYPE       = 3 << TYPE_BOUNDARY; // ¿?
  // Time tokens are divisible tokens to be
  // distributed in response to activities
  // that require time in proportion to that
  // time. I.e. 1 for 1 hour of pair programming.
  uint256 public constant RECORDED_TIME_TYPE = 4 << TYPE_BOUNDARY;
  uint256 public constant VOUCHED_TIME_TYPE  = 5 << TYPE_BOUNDARY;
  uint256 public constant RECORDING_TYPE     = 6 << TYPE_BOUNDARY;
  uint256 public constant REVIEW_TYPE        = 7 << TYPE_BOUNDARY;

  // Experimental tokens are meant to demonstrate
  // properties of the system. The flag may be used
  // in conjunction with other types.
  uint256 public constant EXPERIMENTAL_TYPE = 2**3 << TYPE_BOUNDARY;

  enum Role {
    Superuser,
    Minter,
    Caster,
    Transferer,
    Configurer,
    Maintainer,
    Creator,
    Limiter,
    Burner,
    Destroyer,
    Oracle
  }

  // Superusers have access to the bulk of the
  // functions of the contract.  
  uint256 public constant SUPERUSER_ROLE = (
    uint(Role.Minter) << ROLE_BOUNDARY
  );
  // Minters have the capacity to create instances
  // of existing tokens subject to restrictions on
  // quantity and whether an individual may hold
  // duplicates.
  uint256 public constant MINTER_ROLE = (
    uint(Role.Minter) << ROLE_BOUNDARY
  );
  // Casters may cast roles upon other users except
  // for superusers who may only be created by
  // other superusers (or the owner).
  uint256 public constant CASTER_ROLE = (
    uint(Role.Caster) << ROLE_BOUNDARY
  );
  // Transferers have the ability to move tokens
  // between accounts.
  uint256 public constant TRANSFERER_ROLE = (
    uint(Role.Transferer) << ROLE_BOUNDARY
  );
  // Configurers can update the URI associated
  // with a token.
  uint256 public constant CONFIGURER_ROLE = (
    uint(Role.Configurer) << ROLE_BOUNDARY
  );
  // Maintainers may update the contract.
  uint256 public constant MAINTAINER_ROLE = (
    uint(Role.Maintainer) << ROLE_BOUNDARY
  );
  // Creators can create new tokens.
  uint256 public constant CREATOR_ROLE = (
    uint(Role.Creator) << ROLE_BOUNDARY
  );
  // Limiters can change the maximum number of
  // tokens allowed to be minted.
  uint256 public constant LIMITER_ROLE = (
    uint(Role.Limiter) << ROLE_BOUNDARY
  );
  // Oracles provide information about the world.
  // Trusted information like the length of
  // videos submitted for time tokens
  uint256 public constant ORACLE_ROLE = (
    uint(Role.Oracle) << ROLE_BOUNDARY
  );
  

  function binstr(
    bytes32 input
  )
    public
    pure
    returns (uint256 value)
  {
    uint256 n = 0;
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

  function initialize(
    string calldata _name,
    string calldata _symbol
  )
    initializer
    public
  {
    __Ownable_init();
    __ERC1155_init("Error: Single Token URI Not Used");
    __ERC1155Burnable_init();
    __ERC1155Supply_init();
    __UUPSUpgradeable_init();

    setDescription(_name, _symbol);
  }

  function setDescription(
    string calldata _name,
    string calldata _symbol
  )
    public
    virtual
    onlyOwner
  {
    name = _name;
    symbol = _symbol;
  }

  function roleToken(Role role)
    public
    virtual
    view
    returns (uint256 tokenId)
  {
    return roleToken(role, 0);
  }

  function roleToken(
    Role role,
    uint256 id
  )
    public
    virtual
    view
    returns (uint256 tokenId)
  {
    return GATING_TYPE + (uint(role) << ROLE_BOUNDARY) + id;
  }

  function hasRole(Role role)
    public
    virtual
    view
    returns (bool has)
  {
    return hasRole(role, _msgSender());
  }

  function hasRole(
    Role role,
    address user
  )
    public
    virtual
    view
    returns (bool has)
  {
    return hasRole(role, user, 0);
  }

  function hasRole(
    Role role,
    uint256 id
  )
    public
    virtual
    view
    returns (bool has)
  {
    return hasRole(role, _msgSender(), id);
  }

  function hasRole(
    Role role,
    address user,
    uint256 id
  )
    public
    virtual
    view
    returns (bool has)
  {
    uint256 gate = roleToken(role);    
    return (
      balanceOf(user, gate) > 0
      || balanceOf(user, gate + id) > 0
    );
  }

  function isSuper()
    public
    virtual
    view
    returns (bool superuser)
  {
    return isSuper(_msgSender());
  }

  function isSuper(address user)
    public
    virtual
    view
    returns (bool superuser)
  {
    return hasRole(Role.Superuser, user) || user == owner();
  }

  function grantRole(
    Role role,
    address user
  )
    public
    virtual
    returns (bool added)
  {
    return grantRole(role, user, 0);
  }

  function grantRole(
    Role role,
    address user,
    uint256 id
  )
    public
    virtual
    returns (bool added)
  {
    if(role == Role.Superuser) {
      require(
        isSuper(),
        "You must be a superuser to create new ones."
      );
    } else {
      require(
        hasRole(Role.Caster, id) || isSuper(),
        "You must have the Caster role to assign new roles."
      );
    }

    if(!hasRole(role, user, id)) {
      uint256 token = roleToken(role, id);
      mint(user, token, 1, "");
      return true;
    }
    return false;
  }

  function uri(uint256 id)
    public
    view
    virtual
    override
    returns (string memory)
  {
    string memory response = uris[id];
    if(bytes(response).length == 0) {
      // To Do: Send generic role tokens
    }
    return response;
  }

  function setURI(
    uint256 id,
    string calldata newURI
  )
    public
    virtual
  {
    require(
      hasRole(Role.Configurer, id) || isSuper(),
      "You must have a Configurer token to change metadata."
    );
    uris[id] = newURI;
    emit URI(newURI, id);
  }

  function setMax(
    uint256 id,
    uint256 max
  )
    public
    virtual
  {
    require(
      hasRole(Role.Limiter, id) || isSuper(),
      "You must have a Limiter token to change quantity."
    );
    max;
  }

  event Created(uint256 id, address controller);

  function create()
    public
    virtual
    returns (uint256 tokenId)
  {
    return create(_msgSender());
  }

  function create(
    address maintainer
  )
    public
    virtual
    returns (uint256 tokenId)
  {
    numTokenTypes.increment();
    uint256 id = numTokenTypes.current();

    require(
      hasRole(Role.Creator, id) || isSuper(),
      "You must have a Creator token to create new tokens."
    );

    grantRole(Role.Minter, maintainer, id);
    grantRole(Role.Configurer, maintainer, id);
    grantRole(Role.Limiter, maintainer, id);

    emit Created(id, maintainer);

    return id;
  }

  function configure(
    uint256 id,
    string calldata newURI,
    uint256 max
  )
    public
    virtual
  {
    setURI(id, newURI);
    setMax(id, max);
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
    if((id & GATING_TYPE) == GATING_TYPE) { // token gate
      require(
        hasRole(Role.Caster, id) || isSuper(),
        "You must have a Caster token to mint token gates."
      );
    } else {
      require(
        hasRole(Role.Minter, id) || isSuper(),
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
    for(uint256 i = 0; i < to.length; ++i) {
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
      hasRole(Role.Maintainer) || isSuper(),
      "You must have a Maintainer token to upgrade the contract."
    );
  }

  function tokenOfOwnerByIndex(
    address owner, 
    uint256 index
  ) 
    public 
    view 
    virtual 
    override 
    returns (uint256) 
  {
    require(index < ERC721.balanceOf(owner), "ERC721Enumerable: owner index out of bounds");
    return _ownedTokens[owner][index];
  }

  function tokenByIndex(uint256 index) 
    public
    view
    virtual
    override 
    returns (uint256) 
  {
    require(index < ERC721Enumerable.totalSupply(), "ERC721Enumerable: global index out of bounds");
    return _allTokens[index];
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
    if(!isSuper()) {
      for(uint256 i = 0; i < ids.length; ++i) {
        require(
          hasRole(Role.Transferer, from, ids[i]),
          "You must have a Transferer token to transfer tokens."
        );
      }
    }
    super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
  }
}