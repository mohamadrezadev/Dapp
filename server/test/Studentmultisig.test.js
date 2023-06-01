// // Import the necessary modules from Hardhat
// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// // Define the test suite
// describe("StudentRegistry", function () {
//   // Define global variables
//   let studentRegistry;
//   let owner1;
//   let owner2;

//   // Define the test setup
//   beforeEach(async function () {
//     // Deploy the contract
//     const StudentRegistry = await ethers.getContractFactory("StudentRegistry");
//     studentRegistry = await StudentRegistry.deploy([owner1.address, owner2.address], 2);

//     // Get the accounts to use as owners
//     [owner1, owner2] = await ethers.getSigners();
//   });

//   // Define the individual tests
//   describe("createStudent", function () {
//     it("should create a new student", async function () {
//       // Call the createStudent function
//       await studentRegistry.createStudent("John", "Doe", "B.S.", "Computer Science", 2023);

//       // Check that the student count has increased
//       const studentCount = await studentRegistry.studentCount();
//       expect(studentCount).to.equal(1);

//       // Check that the student was created correctly
//       const student = await studentRegistry.students(1);
//       expect(student.firstName).to.equal("John");
//       expect(student.lastName).to.equal("Doe");
//       expect(student.education.degree).to.equal("B.S.");
//       expect(student.education.major).to.equal("Computer Science");
//       expect(student.education.year).to.equal(2023);
//     });

//     it("should revert if first name is empty", async function () {
//       // Call the createStudent function with an empty first name
//       await expect(studentRegistry.createStudent("", "Doe", "B.S.", "Computer Science", 2023)).to.be.revertedWith("First name cannot be empty");
//     });

//     // Add more tests for edge cases and error conditions
//   });

//   describe("updateStudent", function () {
//     // Define the test setup
//     beforeEach(async function () {
//       // Create a new student
//       await studentRegistry.createStudent("John", "Doe", "B.S.", "Computer Science", 2023);
//     });

//     it("should update an existing student", async function () {
//       // Call the updateStudent function
//       await studentRegistry.updateStudent(1, "Jane", "Doe", "B.S.", "Computer Science", 2024);

//       // Check that the student was updated correctly
//       const student = await studentRegistry.students(1);
//       expect(student.firstName).to.equal("Jane");
//       expect(student.lastName).to.equal("Doe");
//       expect(student.education.degree).to.equal("B.S.");
//       expect(student.education.major).to.equal("Computer Science");
//       expect(student.education.year).to.equal(2024);
//     });

//     it("should revert if student does not exist", async function () {
//       // Call the updateStudent function with a non-existent student ID
//       await expect(studentRegistry.updateStudent(2, "Jane", "Doe", "B.S.", "Computer Science", 2024)).to.be.revertedWith("VM Exception while processing transaction: revert");
//     });

//     // Add more tests for edge cases and error conditions
//   });

//   // Define more tests for the other functions in the contract
// });