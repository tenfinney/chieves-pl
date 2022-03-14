pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: CC0-1.0

import "./ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

// contract WearablesNFTs is ERC1155, AccessControlEnumerable, ReentrancyGuard {
contract WearablesNFTs is ERC1155, ReentrancyGuard {
  using Counters for Counters.Counter;

  mapping (uint256 => string) private _uris;
  Counters.Counter private _tokenCount;
  string public name = "MetaFactory Wearables";
  string public symbol = unicode"MF🎽s";

  // bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  // bytes32 public constant META_MANAGER_ROLE = keccak256("META_MANAGER_ROLE");

  constructor() ERC1155("Single Metadata URI Is Not Used") {
    // _setupRole(DEFAULT_ADMIN_ROLE, 0x615b044B6Ccb048532bcF99AAdf619d7fdD2Aa01);
  }

  function mint(
    address recipient,
    uint256 amount,
    string memory metadata,
    bytes memory data
  ) public virtual
  nonReentrant
  // onlyRole(MINTER_ROLE)
  {
    _tokenCount.increment();
    uint256 id = _tokenCount.current();
    _mint(recipient, id, amount, data);
    setURI(metadata, id);
  }

  function uri(uint256 tokenId) public view virtual override
  returns (string memory)
  {
    return _uris[tokenId];
  }

  function setURI(string memory newuri, uint256 tokenId) public virtual
  // onlyRole(META_MANAGER_ROLE)
  {
    _uris[tokenId] = newuri;
    emit URI(newuri, tokenId);
  }

  function tokenCount() public view returns (uint256) {
    return _tokenCount.current();
  }

  function distributeSingles(
    address from,
    address[] memory to,
    uint256 id,
    bytes memory data
  ) public virtual {
    require(
      from == _msgSender() || isApprovedForAll(from, _msgSender()),
      "ERC1155: caller is not owner nor approved"
    );
    for (uint256 i = 0; i < to.length; ++i) {
      _safeTransferFrom(from, to[i], id, 1, data);
    }
  }

  // function supportsInterface(bytes4 interfaceId) public view override(ERC1155, AccessControlEnumerable) returns (bool) {
  function supportsInterface(bytes4 interfaceId) public view override(ERC1155) returns (bool) {
    return (
      ERC1155.supportsInterface(interfaceId)
      // || AccessControlEnumerable.supportsInterface(interfaceId)
    );
  }
}