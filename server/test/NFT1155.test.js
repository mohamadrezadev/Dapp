

const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("CertNFT1155", function () {
  let contract;

  beforeEach(async function () {
    const CertNFT = await ethers.getContractFactory("CertNFT1155");
    [owner, operator] = await ethers.getSigners();
    ownerAddress = owner.address;
    owners=["0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",ownerAddress]
//     const owners = [await ethers.getSigner(0).getAddress()];
    contract = await CertNFT.deploy(owners);
    await contract.deployed();
  });

  it("should mint a new NFT", async function () {
    const tax = await contract.mint("metadata");
    const response=await tax.wait();
    tokenId=response.events[1].args[1]
    console.log(response.events[1].args[1])
    const tokenUri = await contract.tokenMeta(tokenId);
    expect(tokenUri).to.equal("https://ipfs.io/ipfs/metadata");
  });
  it("should mint an NFT", async function () {
          const tx = await contract.mint("QmcJH2iYfQ1f9RJjAbf5X5aF4nJSC2GJqRiNKAUx3rSZf6");
          const receipt = await tx.wait();
          const tokenId = receipt.events[1].args[1];
          // const tokenURI = await contract.uri(tokenId);
          const [tokenIds, tokenURIs] = await contract.getAllTokenIdsAndUrls();
          expect(tokenURIs[0]).to.equal("https://ipfs.io/ipfs/QmcJH2iYfQ1f9RJjAbf5X5aF4nJSC2GJqRiNKAUx3rSZf6");
      
  });
  it("should emit a mintnft event", async function () {
          // Mint a new NFT with a given URI
          const tx = await contract.mint("QmcJH2iYfQ1f9RJjAbf5X5aF4nJSC2GJqRiNKAUx3rSZf6");
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
          await contract.mint("Qm1");
          await contract.mint("Qm2");
          await contract.mint("Qm3");
  
          // Get an array of all token IDs and URIs
          const [tokenIds, tokenURIs] = await contract.getAllTokenIdsAndUrls();
  
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
  
  it("should return all token ids and URLs", async function () {
    await contract.mint("metadata1");
    await contract.mint("metadata2");
    const [tokenIds, tokenUrls] = await contract.getAllTokenIdsAndUrls();
    expect(tokenIds.length).to.equal(2);
    expect(tokenUrls[0]).to.equal("https://ipfs.io/ipfs/metadata1");
    expect(tokenUrls[1]).to.equal("https://ipfs.io/ipfs/metadata2");
  });
  it("should transfer ownership of an NFT", async function () {
          // Mint a new NFT
          const tx = await contract.mint("QmcJH2iYfQ1f9RJjAbf5X5aF4nJSC2GJqRiNKAUx3rSZf6");
          const receipt = await tx.wait();
          const tokenId = receipt.events[1].args[1];
  
          // Transfer ownership of the NFT to a different address
          const to = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Example address
          await contract.safeTransferFrom(ownerAddress, to, tokenId,1,0);
  
          // Check that the new owner is correct
          const newOwner = await contract.owners(tokenId);
          expect(newOwner).to.equal(to);
      });
      it("should add an operator to the owners list", async function() {
          
          await contract.addOperator(operator.address);
          const owners = await contract.owners(0);
          expect(owners.address);
        });
      
        it("should not add an owner that is already in the owners list", async function() {
          await contract.addOperator(operator.address);
          const owners = await contract.owners(0);
          expect(owners)
        });
});