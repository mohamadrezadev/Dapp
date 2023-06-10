// //SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CERTNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    event mintnft(address owner,uint tokenid,string  url,string message);
    constructor(string memory _name, string memory _symbol, uint256 initialSupply) ERC721(_name, _symbol) 
    {
        _mint(msg.sender, initialSupply);
    }
    function mint(string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        string memory url  = string.concat("https://ipfs.io/ipfs/",tokenURI);
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, url);
        emit mintnft(msg.sender,newItemId,url,"minted nft ");
        return newItemId;
    }

     function getAllTokenIdsAndUrls() public view returns (uint256[] memory, string[] memory) {
        uint256[] memory tokenIds = new uint256[](_tokenIds.current());
        string[] memory tokenUrls = new string[](_tokenIds.current());
        for (uint256 i = 0; i < _tokenIds.current(); i++) {
            tokenIds[i] = i + 1;
            tokenUrls[i] = tokenURI(tokenIds[i]);
        }
        return (tokenIds, tokenUrls);
    }
   
}