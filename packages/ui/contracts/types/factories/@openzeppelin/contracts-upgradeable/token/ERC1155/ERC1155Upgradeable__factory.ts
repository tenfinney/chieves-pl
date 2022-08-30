/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ERC1155Upgradeable,
  ERC1155UpgradeableInterface,
} from "../../../../../@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506113f0806100206000396000f3fe608060405234801561001057600080fd5b50600436106100775760003560e01c8062fdd58e1461007c57806301ffc9a7146100a25780630e89341c146100c55780632eb2c2d6146100e55780634e1273f4146100fa578063a22cb4651461011a578063e985e9c51461012d578063f242432a14610169575b600080fd5b61008f61008a366004610e2b565b61017c565b6040519081526020015b60405180910390f35b6100b56100b0366004610f1e565b610214565b6040519015158152602001610099565b6100d86100d3366004610f5d565b610266565b60405161009991906110de565b6100f86100f3366004610cea565b6102fa565b005b61010d610108366004610e54565b610346565b604051610099919061109d565b6100f8610128366004610df1565b6104a7565b6100b561013b366004610cb8565b6001600160a01b03918216600090815260666020908152604080832093909416825291909152205460ff1690565b6100f8610177366004610d8f565b6104b6565b60006001600160a01b0383166101ec5760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a2061646472657373207a65726f206973206e6f742061207660448201526930b634b21037bbb732b960b11b60648201526084015b60405180910390fd5b5060009081526065602090815260408083206001600160a01b03949094168352929052205490565b60006001600160e01b03198216636cdb3d1360e11b148061024557506001600160e01b031982166303a24d0760e21b145b8061026057506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606067805461027590611252565b80601f01602080910402602001604051908101604052809291908181526020018280546102a190611252565b80156102ee5780601f106102c3576101008083540402835291602001916102ee565b820191906000526020600020905b8154815290600101906020018083116102d157829003601f168201915b50505050509050919050565b6001600160a01b0385163314806103165750610316853361013b565b6103325760405162461bcd60e51b81526004016101e3906110f1565b61033f85858585856104fb565b5050505050565b606081518351146103ab5760405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e677468604482015268040dad2e6dac2e8c6d60bb1b60648201526084016101e3565b600083516001600160401b038111156103d457634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156103fd578160200160208202803683370190505b50905060005b845181101561049f5761046485828151811061042f57634e487b7160e01b600052603260045260246000fd5b602002602001015185838151811061045757634e487b7160e01b600052603260045260246000fd5b602002602001015161017c565b82828151811061048457634e487b7160e01b600052603260045260246000fd5b6020908102919091010152610498816112b9565b9050610403565b509392505050565b6104b23383836106f7565b5050565b6001600160a01b0385163314806104d257506104d2853361013b565b6104ee5760405162461bcd60e51b81526004016101e3906110f1565b61033f85858585856107d8565b815183511461055d5760405162461bcd60e51b815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e677468206044820152670dad2e6dac2e8c6d60c31b60648201526084016101e3565b6001600160a01b0384166105835760405162461bcd60e51b81526004016101e390611188565b3360005b84518110156106895760008582815181106105b257634e487b7160e01b600052603260045260246000fd5b6020026020010151905060008583815181106105de57634e487b7160e01b600052603260045260246000fd5b60209081029190910181015160008481526065835260408082206001600160a01b038e16835290935291909120549091508181101561062f5760405162461bcd60e51b81526004016101e3906111cd565b60008381526065602090815260408083206001600160a01b038e8116855292528083208585039055908b1682528120805484929061066e90849061123a565b9250508190555050505080610682906112b9565b9050610587565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb87876040516106d99291906110b0565b60405180910390a46106ef818787878787610906565b505050505050565b816001600160a01b0316836001600160a01b0316141561076b5760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c20737461747573604482015268103337b91039b2b63360b91b60648201526084016101e3565b6001600160a01b03838116600081815260666020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0384166107fe5760405162461bcd60e51b81526004016101e390611188565b33600061080a85610a81565b9050600061081785610a81565b905060008681526065602090815260408083206001600160a01b038c1684529091529020548581101561085c5760405162461bcd60e51b81526004016101e3906111cd565b60008781526065602090815260408083206001600160a01b038d8116855292528083208985039055908a1682528120805488929061089b90849061123a565b909155505060408051888152602081018890526001600160a01b03808b16928c821692918816917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a46108fb848a8a8a8a8a610ada565b505050505050505050565b610918846001600160a01b0316610bab565b156106ef5760405163bc197c8160e01b81526001600160a01b0385169063bc197c81906109519089908990889088908890600401610ffa565b602060405180830381600087803b15801561096b57600080fd5b505af192505050801561099b575060408051601f3d908101601f1916820190925261099891810190610f41565b60015b610a48576109a7611300565b806308c379a014156109e157506109bc611318565b806109c757506109e3565b8060405162461bcd60e51b81526004016101e391906110de565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e20455243313135356044820152732932b1b2b4bb32b91034b6b83632b6b2b73a32b960611b60648201526084016101e3565b6001600160e01b0319811663bc197c8160e01b14610a785760405162461bcd60e51b81526004016101e390611140565b50505050505050565b60408051600180825281830190925260609160009190602080830190803683370190505090508281600081518110610ac957634e487b7160e01b600052603260045260246000fd5b602090810291909101015292915050565b610aec846001600160a01b0316610bab565b156106ef5760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e6190610b259089908990889088908890600401611058565b602060405180830381600087803b158015610b3f57600080fd5b505af1925050508015610b6f575060408051601f3d908101601f19168201909252610b6c91810190610f41565b60015b610b7b576109a7611300565b6001600160e01b0319811663f23a6e6160e01b14610a785760405162461bcd60e51b81526004016101e390611140565b6001600160a01b03163b151590565b80356001600160a01b0381168114610bd157600080fd5b919050565b600082601f830112610be6578081fd5b81356020610bf382611217565b604051610c00828261128d565b8381528281019150858301600585901b87018401881015610c1f578586fd5b855b85811015610c3d57813584529284019290840190600101610c21565b5090979650505050505050565b600082601f830112610c5a578081fd5b81356001600160401b03811115610c7357610c736112ea565b604051610c8a601f8301601f19166020018261128d565b818152846020838601011115610c9e578283fd5b816020850160208301379081016020019190915292915050565b60008060408385031215610cca578182fd5b610cd383610bba565b9150610ce160208401610bba565b90509250929050565b600080600080600060a08688031215610d01578081fd5b610d0a86610bba565b9450610d1860208701610bba565b935060408601356001600160401b0380821115610d33578283fd5b610d3f89838a01610bd6565b94506060880135915080821115610d54578283fd5b610d6089838a01610bd6565b93506080880135915080821115610d75578283fd5b50610d8288828901610c4a565b9150509295509295909350565b600080600080600060a08688031215610da6578081fd5b610daf86610bba565b9450610dbd60208701610bba565b9350604086013592506060860135915060808601356001600160401b03811115610de5578182fd5b610d8288828901610c4a565b60008060408385031215610e03578182fd5b610e0c83610bba565b915060208301358015158114610e20578182fd5b809150509250929050565b60008060408385031215610e3d578182fd5b610e4683610bba565b946020939093013593505050565b60008060408385031215610e66578182fd5b82356001600160401b0380821115610e7c578384fd5b818501915085601f830112610e8f578384fd5b81356020610e9c82611217565b604051610ea9828261128d565b8381528281019150858301600585901b870184018b1015610ec8578889fd5b8896505b84871015610ef157610edd81610bba565b835260019690960195918301918301610ecc565b5096505086013592505080821115610f07578283fd5b50610f1485828601610bd6565b9150509250929050565b600060208284031215610f2f578081fd5b8135610f3a816113a1565b9392505050565b600060208284031215610f52578081fd5b8151610f3a816113a1565b600060208284031215610f6e578081fd5b5035919050565b6000815180845260208085019450808401835b83811015610fa457815187529582019590820190600101610f88565b509495945050505050565b60008151808452815b81811015610fd457602081850181015186830182015201610fb8565b81811115610fe55782602083870101525b50601f01601f19169290920160200192915050565b6001600160a01b0386811682528516602082015260a06040820181905260009061102690830186610f75565b82810360608401526110388186610f75565b9050828103608084015261104c8185610faf565b98975050505050505050565b6001600160a01b03868116825285166020820152604081018490526060810183905260a06080820181905260009061109290830184610faf565b979650505050505050565b602081526000610f3a6020830184610f75565b6040815260006110c36040830185610f75565b82810360208401526110d58185610f75565b95945050505050565b602081526000610f3a6020830184610faf565b6020808252602f908201527f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60408201526e195c881b9bdc88185c1c1c9bdd9959608a1b606082015260800190565b60208082526028908201527f455243313135353a204552433131353552656365697665722072656a656374656040820152676420746f6b656e7360c01b606082015260800190565b60208082526025908201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604082015264647265737360d81b606082015260800190565b6020808252602a908201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60408201526939103a3930b739b332b960b11b606082015260800190565b60006001600160401b03821115611230576112306112ea565b5060051b60200190565b6000821982111561124d5761124d6112d4565b500190565b600181811c9082168061126657607f821691505b6020821081141561128757634e487b7160e01b600052602260045260246000fd5b50919050565b601f8201601f191681016001600160401b03811182821017156112b2576112b26112ea565b6040525050565b60006000198214156112cd576112cd6112d4565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b600060033d111561131557600481823e5160e01c5b90565b600060443d10156113265790565b6040516003193d81016004833e81513d6001600160401b03808311602484018310171561135557505050505090565b828501915081518181111561136d5750505050505090565b843d87010160208285010111156113875750505050505090565b6113966020828601018761128d565b509095945050505050565b6001600160e01b0319811681146113b757600080fd5b5056fea26469706673582212202b00cf579f08c45080da57cea77e89e14ac2459cd03c5cc576a1dd223acdfbfc64736f6c63430008040033";

type ERC1155UpgradeableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155UpgradeableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155Upgradeable__factory extends ContractFactory {
  constructor(...args: ERC1155UpgradeableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC1155Upgradeable> {
    return super.deploy(overrides || {}) as Promise<ERC1155Upgradeable>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ERC1155Upgradeable {
    return super.attach(address) as ERC1155Upgradeable;
  }
  override connect(signer: Signer): ERC1155Upgradeable__factory {
    return super.connect(signer) as ERC1155Upgradeable__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155UpgradeableInterface {
    return new utils.Interface(_abi) as ERC1155UpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155Upgradeable {
    return new Contract(address, _abi, signerOrProvider) as ERC1155Upgradeable;
  }
}
