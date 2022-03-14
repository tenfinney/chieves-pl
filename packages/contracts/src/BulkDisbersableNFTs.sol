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
contract BulkDisbersableNFTs is Initializable, ERC1155Upgradeable, OwnableUpgradeable, ERC1155BurnableUpgradeable, ERC1155SupplyUpgradeable, UUPSUpgradeable {
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize() initializer public {
        __ERC1155_init("Error: Single Token URI Not Used");
        __Ownable_init();
        __ERC1155Burnable_init();
        __ERC1155Supply_init();
        __UUPSUpgradeable_init();
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155Upgradeable, ERC1155SupplyUpgradeable)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}

// import "./ReentrancyGuard.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

// // contract WearablesNFTs is ERC1155, AccessControlEnumerable, ReentrancyGuard {
// contract WearablesNFTs is ERC1155, ReentrancyGuard {
//   using Counters for Counters.Counter;

//   mapping (uint256 => string) private _uris;
//   Counters.Counter private _tokenCount;
//   string public name = "MetaFactory Wearables";
//   string public symbol = unicode"MF🎽s";

//   // bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
//   // bytes32 public constant META_MANAGER_ROLE = keccak256("META_MANAGER_ROLE");

//   constructor() ERC1155("Single Metadata URI Is Not Used") {
//     // _setupRole(DEFAULT_ADMIN_ROLE, 0x615b044B6Ccb048532bcF99AAdf619d7fdD2Aa01);
//   }

//   function mint(
//     address recipient,
//     uint256 amount,
//     string memory metadata,
//     bytes memory data
//   ) public virtual
//   nonReentrant
//   // onlyRole(MINTER_ROLE)
//   {
//     _tokenCount.increment();
//     uint256 id = _tokenCount.current();
//     _mint(recipient, id, amount, data);
//     setURI(metadata, id);
//   }

//   function uri(uint256 tokenId) public view virtual override
//   returns (string memory)
//   {
//     return _uris[tokenId];
//   }

//   function setURI(string memory newuri, uint256 tokenId) public virtual
//   // onlyRole(META_MANAGER_ROLE)
//   {
//     _uris[tokenId] = newuri;
//     emit URI(newuri, tokenId);
//   }

//   function tokenCount() public view returns (uint256) {
//     return _tokenCount.current();
//   }

//   function distributeSingles(
//     address from,
//     address[] memory to,
//     uint256 id,
//     bytes memory data
//   ) public virtual {
//     require(
//       from == _msgSender() || isApprovedForAll(from, _msgSender()),
//       "ERC1155: caller is not owner nor approved"
//     );
//     for (uint256 i = 0; i < to.length; ++i) {
//       _safeTransferFrom(from, to[i], id, 1, data);
//     }
//   }

//   // function supportsInterface(bytes4 interfaceId) public view override(ERC1155, AccessControlEnumerable) returns (bool) {
//   function supportsInterface(bytes4 interfaceId) public view override(ERC1155) returns (bool) {
//     return (
//       ERC1155.supportsInterface(interfaceId)
//       // || AccessControlEnumerable.supportsInterface(interfaceId)
//     );
//   }
// }