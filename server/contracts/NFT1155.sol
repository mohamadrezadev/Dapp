// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CertNFT1155 is ERC1155 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) private _tokenMeta;
    address[] public owners;

    event mintnft(address owner, uint tokenid, string url, string code);
    event Owner(string code);
    event burnnft(string code);

    constructor(address[] memory _owners ) ERC1155("") {
        owners = _owners;
    }
    modifier onlyOwner() {
        bool isOwner = false;
        for (uint i = 0; i < owners.length; i++) {
            if (msg.sender == owners[i]) {
                isOwner = true;
                break;
            }
        }
        require(isOwner, "Only the owner can call this function.");
        _;
        emit Owner("Only the owner can call this function.");
    }
    function addOperator(address _operator) public onlyOwner {
        bool isOwner = false;
        for (uint i = 0; i < owners.length; i++) {
            if (_operator == owners[i]) {
                isOwner = true;
                break;
            }
        }
        require(!isOwner, "Operator is already an owner.");
        owners.push(_operator);
    }
    function mint( string memory tokenURI) public onlyOwner returns(uint) {
         _tokenIds.increment();
         string memory url = string(abi.encodePacked("https://ipfs.io/ipfs/", tokenURI));
         uint256 newItemId = _tokenIds.current();
         _mint(msg.sender, newItemId, 1, "");
        _setTokenMeta(newItemId, url);
        emit mintnft(msg.sender, newItemId, url, "ACTION_CONFIRMED");
        return newItemId;
    }

    function _setTokenMeta(uint256 id, string memory meta) private {
        _tokenMeta[id] = meta;
    }

    function tokenMeta(uint256 id) public view returns (string memory) {
        return _tokenMeta[id];
    }
  
    function getAllTokenIdsAndUrls() public view returns (uint256[] memory, string[] memory) {
        uint256[] memory tokenIds = new uint256[](_tokenIds.current());
        string[] memory tokenUrls = new string[](_tokenIds.current());
        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            tokenIds[i] = i + 1;
            tokenUrls[i] = tokenMeta(tokenIds[i]);
        }
        return (tokenIds, tokenUrls);
    }
    
}