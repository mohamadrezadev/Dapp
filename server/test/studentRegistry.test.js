const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('StudentRegistry', function () {
  let studentRegistry;

  beforeEach(async function () {
    const StudentRegistry = await ethers.getContractFactory('StudentRegistry');
    studentRegistry = await StudentRegistry.deploy();
    await studentRegistry.deployed();

    [owner, operator] = await ethers.getSigners();
    ownerAddress = owner.address;
    owners=["0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",ownerAddress]
    const NFTContract = await ethers.getContractFactory("CERTNFT");
    nftContract = await NFTContract.deploy(owners, "CERTBUQAEN", "CBQ");
    await nftContract.deployed();
  });

  it('should create a new student', async function () {
    const firstName = 'John';
    const lastName = 'Doe';
    const degree = 'BSc';
    const major = 'Computer Science';
    const year = '2022/12/1';
    const tax= await studentRegistry.createStudent(firstName, lastName, degree, major, year);
    const receipt=await tax.wait();
    const id=receipt.events[0].args[0]
    // console.log(id)
    // console.log(await studentRegistry.Students(0))
    expect(await studentRegistry.Students(0))
  });
  it('should read the student information', async function () {
          const firstName = 'John';
          const lastName = 'Doe';
          const degree = 'BSc';
          const major = 'Computer Science';
          const year = '2022/12/1';
          await studentRegistry.createStudent(firstName, lastName, degree, major, year);
          const students = await studentRegistry.getAallStudents();
          const student = students[0];
          expect(student.firstName).to.equal(firstName);
          expect(student.lastName).to.equal(lastName);
          expect(student.education.degree).to.equal(degree);
          expect(student.education.major).to.equal(major);
          expect(student.education.year).to.equal(year);
   });
   it('should return an empty student for an address with no information', async function () {
          const students = await studentRegistry.getAallStudents();
          expect(students)
         
          });
   it('should update the student information', async function () {
          const firstName = 'John';
          const lastName = 'Doe';
          const degree = 'BSc';
          const major = 'Computer Science';
          const year = '2022/12/1';
          const newFirstName = 'Jane';
          const newLastName = 'Smith';
          const newDegree = 'MSc';
          const newMajor = 'Electrical Engineering';
          const newYear = '2023/12/1';
          console.log(studentRegistry.Students)
          const tax= await studentRegistry.createStudent(firstName, lastName, degree, major, year);
          const receipt=await tax.wait();
          const id=receipt.events[0].args[0]
          // var result= await studentRegistry.createStudent(firstName, lastName, degree, major, year);
          await studentRegistry.updateStudent(id,newFirstName, newLastName, newDegree, newMajor, newYear);
      
          const students = await studentRegistry.getAallStudents();
          const student = students[0];
          expect(student.firstName).to.equal(newFirstName);
          expect(student.lastName).to.equal(newLastName);
          expect(student.education.degree).to.equal(newDegree);
          expect(student.education.major).to.equal(newMajor);
          expect(student.education.year).to.equal(newYear);
          });
      
   it('should throw an error if any of the required fields are empty', async function () {
          const firstName = 'John';
          const lastName = 'Doe';
          const degree = 'BSc';
          const major = 'Computer Science';
          const year = '2022/12/1';
          const emptyField = '';
         
          const tax= await studentRegistry.createStudent(firstName, lastName, degree, major, year);
          const receipt=await tax.wait();
          const id=receipt.events[0].args[0]

          // await studentRegistry.createStudent(firstName, lastName, degree, major, year);
      
          await expect(studentRegistry.updateStudent(id,emptyField, lastName, degree, major, year)).to.be.revertedWith('Firstname cannot be empty');
          await expect(studentRegistry.updateStudent(id,firstName, emptyField, degree, major, year)).to.be.revertedWith('Lastname cannot be empty');
          await expect(studentRegistry.updateStudent(id,firstName, lastName, emptyField, major, year)).to.be.revertedWith('Degree cannot be empty');
          await expect(studentRegistry.updateStudent(id,firstName, lastName, degree, emptyField, year)).to.be.revertedWith('Major cannot be empty');
        });
   it('should delete the student information', async function () {
          const firstName = 'John';
          const lastName = 'Doe';
          const degree = 'BSc';
          const major = 'Computer Science';
          const year = '2022/12/1';
      
          await studentRegistry.createStudent(firstName, lastName, degree, major, year);
          await studentRegistry.deleteStudent(0);
      
          const students = await studentRegistry.getAallStudents();
          
          const student = students[0];
          expect(students);
          
        });
    it('should issued nft',async function(){
      const firstName = 'John';
      const lastName = 'Doe';
      const degree = 'BSc';
      const major = 'Computer Science';
      const year = '2022/12/1';
      await studentRegistry.createStudent(firstName, lastName, degree, major, year);
     
      const tx = await nftContract.mint("QmcJH2iYfQ1f9RJjAbf5X5aF4nJSC2GJqRiNKAUx3rSZf6");
      const receipt2 = await tx.wait();
      // Get the ID of the newly minted NFT
      const tokenId = receipt2.events[1].args[1];
      // Get the token URI of the newly minted NFT
      const tokenURI = await nftContract.tokenURI(tokenId);
      const tax= await studentRegistry.isissuedcertificate(0,true,tokenURI,tokenId);
      const receipt=tax.wait();
      const students2 = await studentRegistry.getAallStudents();
      expect(receipt.events)
    })  
   it('should emit a StudentDeleted event', async function () {
          // const firstName = 'John';
          // const lastName = 'Doe';
          // const degree = 'BSc';
          // const major = 'Computer Science';
          // const year = 2022;
      
          // await studentRegistry.createStudent(firstName, lastName, degree, major, year);
          // const tx = await studentRegistry.deleteStudent();
      
          // const receipt = await tx.wait();
          // const event = receipt.events.find((e) => e.event === 'StudentDeleted');
          // expect(event.args[0]).to.equal(await ethers.provider.getSigner().getAddress());
        
        });
      
});