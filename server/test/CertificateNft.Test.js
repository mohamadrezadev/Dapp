const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CERTNFT", function () {
  
    let nftContract;
    let owner; // Address of the contract owner
    let ownerAddress; // Address of the contract owner as a string
    let operator;
    

    beforeEach(async () => {
        // Get the contract owner's address
        [owner, operator] = await ethers.getSigners();
        ownerAddress = owner.address;
      
        
        owners=["0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",ownerAddress]
        // Deploy the contract
        const NFTContract = await ethers.getContractFactory("CERTNFT");
        nftContract = await NFTContract.deploy(owners, "CERTBUQAEN", "CBQ");
        await nftContract.deployed();
    });

    it("should mint an NFT", async function () {
        const tx = await nftContract.mint("QmcJH2iYfQ1f9RJjAbf5X5aF4nJSC2GJqRiNKAUx3rSZf6");
        const receipt = await tx.wait();
        const tokenId = receipt.events[1].args[1];
        const tokenURI = await nftContract.tokenURI(tokenId);
        expect(tokenURI).to.equal("https://ipfs.io/ipfs/QmcJH2iYfQ1f9RJjAbf5X5aF4nJSC2GJqRiNKAUx3rSZf6");
    });

    it("should emit a mintnft event", async function () {
        // Mint a new NFT with a given URI
        const tx = await nftContract.mint("QmcJH2iYfQ1f9RJjAbf5X5aF4nJSC2GJqRiNKAUx3rSZf6");
        const receipt = await tx.wait();

        // Get the ID of the newly minted NFT
        const tokenId = receipt.events[1].args[1];

        // Check that the mintnft event was emitted with the correct parameters
        const event = receipt.events[1];
        expect(event.event).to.equal("mintnft");
        expect(event.args[0]).to.equal(ownerAddress);
        expect(event.args[1]).to.equal(tokenId);
        expect(event.args[2]).to.equal("https://ipfs.io/ipfs/QmcJH2iYfQ1f9RJjAbf5X5aF4nJSC2GJqRiNKAUx3rSZf6");
        expect(event.args[3]).to.equal("ACTION_CONFIRMED");
    });

    it("should return token IDs and URIs of all minted NFTs", async function () {
        // Mint some NFTs
        await nftContract.mint("Qm1");
        await nftContract.mint("Qm2");
        await nftContract.mint("Qm3");

        // Get an array of all token IDs and URIs
        const [tokenIds, tokenURIs] = await nftContract.getAllTokenIdsAndUrls();

        // Check that the arrays have the correct length
        expect(tokenIds.length).to.equal(3);
        expect(tokenURIs.length).to.equal(3);
        
        // Check that the token IDs and URIs are correct
        expect(parseInt(tokenIds[0], 16)).to.deep.equal(1);
        expect(parseInt(tokenIds[1], 16)).to.deep.equal(2);
        expect(parseInt(tokenIds[2], 16)).to.deep.equal(3);
        expect(tokenURIs).to.deep.equal([
            "https://ipfs.io/ipfs/Qm1",
            "https://ipfs.io/ipfs/Qm2",
            "https://ipfs.io/ipfs/Qm3"
        ]);
    });

    it("should transfer ownership of an NFT", async function () {
        // Mint a new NFT
        // const tx = await nftContract.mint("QmcJH2iYfQ1f9RJjAbf5X5aF4nJSC2GJqRiNKAUx3rSZf6");
        // const receipt = await tx.wait();
        // const tokenId = receipt.events[1].args[1];

        // // Transfer ownership of the NFT to a different address
        // const to = "0x1234567890123456789012345678901234567890"; // Example address
        // await nftContract.transferFrom(ownerAddress, to, tokenId);

        // // Check that the new owner is correct
        // const newOwner = await nftContract.ownerOf(tokenId);
        // expect(newOwner).to.equal(to);
    });
    it("should add an operator to the owners list", async function() {
        
        await nftContract.addOperator(operator.address);
        const owners = await nftContract.owners(0);
        expect(owners.address);
      });
    
      it("should not add an owner that is already in the owners list", async function() {
        await nftContract.addOperator(operator.address);
        const owners = await nftContract.owners(0);
        expect(owners)
      });
      it("should burn nft", async function() {
        const response= await nftContract.mint("Qm1");
        const [tokenIds, tokenURIs] = await nftContract.getAllTokenIdsAndUrls();
        
        const tokenid= parseInt(tokenIds[0], 16)
        await nftContract.burn(tokenid)
        
      });
    });
