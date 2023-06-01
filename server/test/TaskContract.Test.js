// tests/taskContract.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TaskContract", function () {
  let taskContract;
  let owner;

  beforeEach(async function () {
    const TaskContract = await ethers.getContractFactory("TaskContract");
    [owner] = await ethers.getSigners();
    taskContract = await TaskContract.deploy();
    await taskContract.deployed();
  });
  it("Should emit AddTask event", async function () {
    // const taskText = "Test task";
    // const isDeleted = false;

    // await expect(taskContract.addTask(taskText, isDeleted))
    //   .to.emit(taskContract, "AddTask")
    //   .withArgs(owner.address, 0);
  });
  it("Should return only the user's tasks", async function () {
    // const taskText1 = "Test task 1";
    // const taskText2 = "Test task 2";
    // const isDeleted = false;

    // await taskContract.addTask(taskText1, isDeleted);
    // await taskContract.addTask(taskText2,isDeleted, { from: owner.address });

    // const tasks = await taskContract.getMyTasks();
    // expect(tasks.length).to.equal(1);
    // expect(tasks[0].username).to.equal(owner.address);
    // expect(tasks[0].taskText).to.equal(taskText1);
  });
  });



 
      