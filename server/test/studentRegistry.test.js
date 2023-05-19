const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('StudentRegistry', function () {
  let studentRegistry;

  beforeEach(async function () {
    const StudentRegistry = await ethers.getContractFactory('StudentRegistry');
    studentRegistry = await StudentRegistry.deploy();
    await studentRegistry.deployed();
  });

  it('should create a new student', async function () {
    const firstName = 'John';
    const lastName = 'Doe';
    const degree = 'BSc';
    const major = 'Computer Science';
    const year = 2022;

    await studentRegistry.createStudent(firstName, lastName, degree, major, year);

    const student = await studentRegistry.readStudent();
    expect(student[0]).to.equal(firstName);
    expect(student[1]).to.equal(lastName);
    expect(student[2]).to.equal(degree);
    expect(student[3]).to.equal(major);
    expect(student[4].toNumber()).to.equal(year);
  });
  it('should read the student information', async function () {
          const firstName = 'John';
          const lastName = 'Doe';
          const degree = 'BSc';
          const major = 'Computer Science';
          const year = 2022;
      
          await studentRegistry.createStudent(firstName, lastName, degree, major, year);
      
          const student = await studentRegistry.readStudent();
          expect(student[0]).to.equal(firstName);
          expect(student[1]).to.equal(lastName);
          expect(student[2]).to.equal(degree);
          expect(student[3]).to.equal(major);
          expect(student[4].toNumber()).to.equal(year);
   });
   it('should return an empty student for an address with no information', async function () {
          const student = await studentRegistry.readStudent();
          expect(student[0]).to.equal('');
          expect(student[1]).to.equal('');
          expect(student[2]).to.equal('');
          expect(student[3]).to.equal('');
          expect(student[4].toNumber()).equal(0);
          });
   it('should update the student information', async function () {
          const firstName = 'John';
          const lastName = 'Doe';
          const degree = 'BSc';
          const major = 'Computer Science';
          const year = 2022;
          const newFirstName = 'Jane';
          const newLastName = 'Smith';
          const newDegree = 'MSc';
          const newMajor = 'Electrical Engineering';
          const newYear = 2023;
      
          await studentRegistry.createStudent(firstName, lastName, degree, major, year);
          await studentRegistry.updateStudent(newFirstName, newLastName, newDegree, newMajor, newYear);
      
          const student = await studentRegistry.readStudent();
          expect(student[0]).to.equal(newFirstName);
          expect(student[1]).to.equal(newLastName);
          expect(student[2]).to.equal(newDegree);
          expect(student[3]).to.equal(newMajor);
          expect(student[4].toNumber()).to.equal(newYear);
          });
      
   it('should throw anerror if any of the required fields are empty', async function () {
          const firstName = 'John';
          const lastName = 'Doe';
          const degree = 'BSc';
          const major = 'Computer Science';
          const year = 2022;
          const emptyField = '';
      
          await studentRegistry.createStudent(firstName, lastName, degree, major, year);
      
          await expect(studentRegistry.updateStudent(emptyField, lastName, degree, major, year)).to.be.revertedWith('First name cannot be empty');
          await expect(studentRegistry.updateStudent(firstName, emptyField, degree, major, year)).to.be.revertedWith('Last name cannot be empty');
          await expect(studentRegistry.updateStudent(firstName, lastName, emptyField, major, year)).to.be.revertedWith('Degree cannot be empty');
          await expect(studentRegistry.updateStudent(firstName, lastName, degree, emptyField, year)).to.be.revertedWith('Major cannot be empty');
        });
   it('should delete the student information', async function () {
          const firstName = 'John';
          const lastName = 'Doe';
          const degree = 'BSc';
          const major = 'Computer Science';
          const year = 2022;
      
          await studentRegistry.createStudent(firstName, lastName, degree, major, year);
          await studentRegistry.deleteStudent();
      
          const student = await studentRegistry.readStudent();
          expect(student[0]).to.equal('');
          expect(student[1]).to.equal('');
          expect(student[2]).to.equal('');
          expect(student[3]).to.equal('');
          expect(student[4].toNumber()).to.equal(0);
        });
      
   it('should emit a StudentDeleted event', async function () {
          const firstName = 'John';
          const lastName = 'Doe';
          const degree = 'BSc';
          const major = 'Computer Science';
          const year = 2022;
      
          await studentRegistry.createStudent(firstName, lastName, degree, major, year);
          const tx = await studentRegistry.deleteStudent();
      
          const receipt = await tx.wait();
          const event = receipt.events.find((e) => e.event === 'StudentDeleted');
          expect(event.args[0]).to.equal(await ethers.provider.getSigner().getAddress());
        });
      
});