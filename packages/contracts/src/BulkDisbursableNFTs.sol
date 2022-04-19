// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.4;

// From: https://wizard.openzeppelin.com/#erc1155

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/// @custom:security-contact dys@dhappy.org
contract BulkDisbursableNFTs is
 Initializable, ERC1155Upgradeable, OwnableUpgradeable,
 ERC1155BurnableUpgradeable, ERC1155SupplyUpgradeable, UUPSUpgradeable
{
  struct CheckableList {
    uint256[] entries;
    mapping (uint256 => uint256) indices;
  }

  // Note that because the contract is proxied, the
  // storage members and order cannot change
  string public name;
  string public symbol;

  mapping (uint256 => string) private uris;

  // To allow enumeration of all the tokens a list is kept.
  CheckableList private tokens;

  // To allow listing the tokens held by a user, a map
  // of owner to a list of tokens is maintained.
  mapping (address => CheckableList) private owned;

  // Each _WIDTH is the number of bits given to the
  // particular field
  uint8 public constant TEAM_WIDTH = 13;
  uint8 public constant TEAM_BOUNDARY = 255 - TEAM_WIDTH;
  uint8 public constant TYPE_WIDTH = 8;
  uint8 public constant TYPE_BOUNDARY = TEAM_BOUNDARY - TYPE_WIDTH;
  uint8 public constant REQUIREMENT_WIDTH = 3;
  uint8 public constant REQUIREMENT_BOUNDARY = TEAM_BOUNDARY - REQUIREMENT_WIDTH;
  uint8 public constant REPETITION_WIDTH = 3;
  uint8 public constant REPETITION_BOUNDARY = REQUIREMENT_BOUNDARY - REPETITION_WIDTH;
  uint8 public constant UNIQUENESS_WIDTH = 1;
  uint8 public constant UNIQUENESS_BOUNDARY = REPETITION_BOUNDARY - UNIQUENESS_WIDTH;
  uint8 public constant ROLE_WIDTH = 8;
  uint8 public constant ROLE_BOUNDARY = TYPE_BOUNDARY - ROLE_WIDTH;
  uint8 public constant COUNTER_WIDTH = 42;
  
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
  uint256 public constant REQUIRE_ALL   = 1 << REQUIREMENT_BOUNDARY;
  uint256 public constant REQUIRE_NONE  = 2 << REQUIREMENT_BOUNDARY;
  uint256 public constant REQUIRE_ONE   = 3 << REQUIREMENT_BOUNDARY;
  uint256 public constant USE_ONCE      = 1 << REPETITION_BOUNDARY;
  uint256 public constant USE_UNLIMITED = 2 << REPETITION_BOUNDARY;
  uint256 public constant USE_UNTIL     = 3 << REPETITION_BOUNDARY;
  uint256 public constant USE_AFTER     = 4 << REPETITION_BOUNDARY;
  uint256 public constant UNIQUE        = 1 << UNIQUENESS_BOUNDARY;
  

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
  // Whereas recorded time is directly viewable,
  // vouched time is represented by a summary of what
  // was accomplished and how long it took. As with
  // recorded time, the token is distributed proportionally
  // to the time spent.
  uint256 public constant VOUCHED_TIME_TYPE  = 5 << TYPE_BOUNDARY;
  // A recording is a reactable event.
  uint256 public constant RECORDING_TYPE     = 6 << TYPE_BOUNDARY;
  // A review is a set of reactions to a recording.
  uint256 public constant REVIEW_TYPE        = 7 << TYPE_BOUNDARY;
  // 20 bytes of a hash of a reaction, be it a word or
  // image along with a signed byte representing the weight.
  // This may be too much info for a token or even to have in
  // the contract…
  uint256 public constant REACTION_TYPE      = 8 << TYPE_BOUNDARY;
  // Vanilla NFTs are created by using `create` to reserve
  // an id.
  uint256 public constant VANILLA_TYPE       = 9 << TYPE_BOUNDARY;


  // Experimental tokens are meant to demonstrate
  // properties of the system. The flag may be used
  // in conjunction with other types.
  uint256 public constant EXPERIMENTAL_TYPE = 2**TYPE_WIDTH << TYPE_BOUNDARY;

  enum Role {
    // The first value is zero and all tokens should
    // have a positive value.
    Reserved00,

    // Superusers have access to the bulk of the
    // functions of the contract.
    Superuser,

    // Minters have the capacity to create instances
    // of existing tokens subject to restrictions on
    // quantity and whether an individual may hold
    // duplicates.
    Minter,

    // Casters may cast roles upon other users except
    // for superusers who may only be created by
    // other superusers (or the owner).
    Caster,

    // Transferers have the ability to move tokens
    // between accounts.
    Transferer,

    // Configurers can update the URI associated
    // with a token.
    Configurer,

    // Maintainers may update the contract.
    Maintainer,

    // Creators can create new tokens.
    Creator,

    // Limiters can change the maximum number of
    // tokens allowed to be minted.
    Limiter,

    // Burners can destroy minted tokens.
    Burner,

    // Destroyers can remove a created token.
    Destroyer,

    // Oracles provide information about the world.
    // Trusted information like the length of
    // videos submitted for time tokens.
    Oracle,

    // These spots are reserved because the storage
    // layout has to remain the same.
    Reserved01,
    Reserved02,
    Reserved03,
    Reserved04,
    Reserved05,
    Reserved06,
    Reserved07,
    Reserved08,
    Reserved09,
    Reserved10,
    Reserved11,
    Reserved12,
    Reserved13,
    Reserved14,
    Reserved15,
    Reserved16,
    Reserved17,
    Reserved18,
    Reserved19,
    Reserved20,
    Reserved21,
    Reserved22,
    Reserved23,
    Reserved24,
    Reserved25,
    Reserved26,
    Reserved27,
    Reserved28,
    Reserved29,
    Reserved30,
    Reserved31,
    Reserved32,
    Reserved33,
    Reserved34,
    Reserved35,
    Reserved36,
    Reserved37,
    Reserved38,
    Reserved39,
    Reserved40,
    Reserved41,
    Reserved42,
    Reserved43,
    Reserved44,
    Reserved45,
    Reserved46,
    Reserved47,
    Reserved48,
    Reserved49
  }

  function roleValueForName(string memory roleName)
    public
    pure
    returns (Role role)
  {
    bytes32 hash = keccak256(abi.encodePacked(roleName));
    if(hash == keccak256(abi.encodePacked('Superuser'))) {
      return Role.Superuser;
    }
    if(hash == keccak256(abi.encodePacked('Minter'))) {
      return Role.Minter;
    }
    if(hash == keccak256(abi.encodePacked('Caster'))) {
      return Role.Caster;
    }
    if(hash == keccak256(abi.encodePacked('Transferer'))) {
      return Role.Transferer;
    }
    if(hash == keccak256(abi.encodePacked('Configurer'))) {
      return Role.Configurer;
    }
    if(hash == keccak256(abi.encodePacked('Maintainer'))) {
      return Role.Maintainer;
    }
    if(hash == keccak256(abi.encodePacked('Creator'))) {
      return Role.Creator;
    }
    if(hash == keccak256(abi.encodePacked('Limiter'))) {
      return Role.Limiter;
    }
    if(hash == keccak256(abi.encodePacked('Burner'))) {
      return Role.Burner;
    }
    if(hash == keccak256(abi.encodePacked('Destroyer'))) {
      return Role.Destroyer;
    }
    if(hash == keccak256(abi.encodePacked('Oracle'))) {
      return Role.Oracle;
    }
    return Role.Reserved00;
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

  /**
   * @notice This function returns the gating token with the given
   * role. It is possible for gating tokens to operate only on a
   * single other token, but this method creates a token for id zero
   * which allows it to operate on any token.
   */
  function roleToken(Role role)
    public
    virtual
    view
    returns (uint256 tokenId)
  {
    return roleToken(role, 0);
  }

  /**
   * @notice Creates the gating token for oprtations on a single
   * other token, given by id.
   */
  function roleToken(
    Role role,
    uint256 id
  )
    public
    virtual
    view
    returns (uint256 tokenId)
  {
    return (
      GATING_TYPE
      + UNIQUE
      + (uint(role) << ROLE_BOUNDARY)
      + id
    );
  }

  /**
   * @notice Checks if the message sender has the specified gating
   * role.
   */
  function hasRole(Role role)
    public
    virtual
    view
    returns (bool has)
  {
    return hasRole(role, _msgSender());
  }

  /**
   * @notice Checks if the specified user has the given gating
   * role.
   */
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

  /**
   * @notice Checks if the message sender has the specified gating
   * role for the listed token id.
   */
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

  /**
   * @notice Checks if the specified user has the given gating
   * role for the listed token id.
   */
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

  /**
   * @notice Checks if the message sender holds a Superuser token
   * or is the contract owner.
   */
  function isSuper()
    public
    virtual
    view
    returns (bool superuser)
  {
    return isSuper(_msgSender());
  }

  /**
   * @notice Checks if the specified user holds a Superuser token
   * or is the contract owner.
   */
  function isSuper(address user)
    public
    virtual
    view
    returns (bool superuser)
  {
    return hasRole(Role.Superuser, user) || user == owner();
  }

  /**
   * @notice Create an all-token gating token for the listed
   * role given to the specified user.
   */
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

  /**
   * @notice Create an gating token for the given listed
   * role given to the specified user.
   */
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

    return mint(user, roleToken(role, id), 1, "");
  }

  /**
   * @return metadata The metadata URI associated with the given token.
   */
  function uri(uint256 id)
    public
    view
    virtual
    override
    returns (string memory metadata)
  {
    string memory response = uris[id];
    if(bytes(response).length == 0) {
      if((id & (2**TYPE_WIDTH - 1) << TYPE_BOUNDARY) == GATING_TYPE) {
        uint256 gate = id & ((2**256 - 1) << COUNTER_WIDTH);
        response = uris[gate];
      }
    }
    return response;
  }

  /**
   * @notice Set the metadata URI for the given token.
   */
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

  /**
    * @notice ¡Unimplmemented! Set the maximum number of tokens
    * allowed to be minted. Trumps the Minter role.
   */
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

  /**
   * @notice Event fired when a new token type is created.
   */
  event Created(uint256 id, address controller);

  /**
   * @notice Call `create` with the message sender as the
   * maintainer.
   * @return id The reserved token id.
   */
  function create()
    public
    virtual
    returns (uint256 id)
  {
    return create(_msgSender());
  }

  /**
   * @notice Reserve a new token id & mint gating tokens
   * with the Minter, Configurer, & Limiter for the
   * listed maintainer.
   * @return id The reserved token id.
   */
  function create(
    address maintainer
  )
    public
    virtual
    returns (uint256 id)
  {
    uint256 tokenId = VANILLA_TYPE + tokens.entries.length + 1;

    require(
      hasRole(Role.Creator, tokenId) || isSuper(),
      "You must have a Creator token to create new tokens."
    );

    tokens.entries.push(tokenId);
    grantRole(Role.Minter, maintainer, tokenId);
    grantRole(Role.Configurer, maintainer, tokenId);
    grantRole(Role.Limiter, maintainer, tokenId);

    emit Created(tokenId, maintainer);

    return tokenId;
  }

  /**
   * @notice Set the properties of a previously created token.
   */
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

  /**
   * @notice Create new tokens instances.
   * @return minted If a token instance was actually created.
   * If the token to be minted is unique & the user already
   * has one, the function will succeed and return `false`.
   */
  function mint(
    address recipient,
    uint256 id,
    uint256 amount,
    bytes memory data
  )
    public
    virtual
    returns (bool minted)
  {
    if((id & UNIQUE) == UNIQUE && balanceOf(recipient, id) > 0) {
      return false;
    }
    if((id & GATING_TYPE) == GATING_TYPE) {
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

  /**
   * @notice Mint a given token to a group of
   * addresses.
   */
  function mint(
    address[] memory to,
    uint256 id,
    bytes memory data
  )
    public
    virtual
  {
    for(uint256 i = 0; i < to.length; ++i) {
      mint(to[i], id, 1, data);
    }
  }

  /**
   * @return count The number of types of tokens.
   */
  function totalSupply()
    public
    view
    virtual
    returns (uint256 count)
  {
    return tokens.entries.length;
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
    returns (uint256)
  {
    require(
      index < owned[owner].entries.length,
      "ERC-1155 Enumerable: token index out of bounds"
    );
    return owned[owner].entries[index];
  }

  function tokenByIndex(uint256 index) 
    public
    view
    virtual
    returns (uint256)
  {
    require(
      index < tokens.entries.length,
      "ERC-1155 Enumerable: token index out of bounds"
    );
    return tokens.entries[index];
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
    if(to != address(0)) {
      for(uint256 i = 0; i < ids.length; ++i) {
        if(tokens.indices[ids[i]] == 0) {
          tokens.entries.push(ids[i]);
          tokens.indices[ids[i]] = tokens.entries.length;
        }
        if(owned[to].indices[ids[i]] == 0) {
          owned[to].entries.push(ids[i]);
          owned[to].indices[ids[i]] = tokens.entries.length;
        }
      }
    }
    if(from != address(0)) {
      for(uint256 i = 0; i < ids.length; ++i) {
        if(balanceOf(from, ids[i]) <= amounts[i]) {
          uint256 index = owned[from].indices[ids[i]];
          delete owned[from].entries[index];
          delete owned[from].indices[ids[i]];
        }
      }
    }
    super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
  }
}