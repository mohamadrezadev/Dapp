// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CERTNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address private owner;

    event mintnft(address owner, uint tokenid, string url, string code);
    event Owner(string code);
    constructor(address _owner, string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        owner = _owner;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
        emit Owner("Only the owner can call this function.");
    }

    function mint(string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        string memory url = string(abi.encodePacked("https://ipfs.io/ipfs/", tokenURI));
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, url);
        emit mintnft(msg.sender, newItemId, url, "ACTION_CONFIRMED");
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