const { expect } = require("chai");
const { ethers } = require("ethers");
const StudentRegistry = artifacts.require("StudentRegistry");

contract("StudentRegistry", accounts => {
  let studentRegistry;

  before(async () => {
    studentRegistry = await StudentRegistry.new();
  });

  describe("POST /students", () => {
    it("should create a new student", async () => {
      const tx = await studentRegistry.createStudent("John", "Doe", "BS", "Computer Science", 2023);
      await tx.wait();
      const student = await studentRegistry.readStudent();
      expect(student[0]).to.equal("John");
      expect(student[1]).to.equal("Doe");
      expect(student[2]).to.equal("BS");
      expect(student[3]).to.equal("Computer Science");
      expect(student[4].toNumber()).to.equal(2023);
    });
  });

  describe("GET /students", () => {
    it("should read student information", async () => {
      const [firstName, lastName, degree, major, year] = await studentRegistry.readStudent();
      expect(firstName).to.equal("John");
      expect(lastName).to.equal("Doe");
      expect(degree).to.equal("BS");
      expect(major).to.equal("Computer Science");
      expect(year.toNumber()).to.equal(2023);
    });
  });

  describe("PUT /students", () => {
    it("should update student information", async () => {
      const tx = await studentRegistry.updateStudent("Jane", "Doe", "MS", "Mathematics", 2024);
      await tx.wait();
      const student = await studentRegistry.readStudent();
      expect(student[0]).to.equal("Jane");
      expect(student[1]).to.equal("Doe");
      expect(student[2]).to.equal("MS");
      expect(student[3]).to.equal("Mathematics");
      expect(student[4].toNumber()).to.equal(2024);
    });
  });

  describe("DELETE /students", () => {
    it("should delete a student", async () => {
      const tx = await studentRegistry.deleteStudent();
      await tx.wait();
      const student = await studentRegistry.readStudent();
      expect(student[0]).to.equal("");
      expect(student[1]).to.equal("");
      expect(student[2]).to.equal("");
      expect(student[3]).to.equal("");
      expect(student[4].toNumber()).to.equal(0);
    });
  });
});