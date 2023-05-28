const express = require('express');
const addressContract= require('./config');
const studentabi= require('../artifacts/contracts/StudentRegistry.sol/StudentRegistry.json');
const Greeterabi= require('../artifacts/contracts/Greeter.sol/Greeter.json');
const TaskAbi= require('../artifacts/contracts/TaskContract.sol/TaskContract.json');
const { ethers,Contract } = require('ethers');
const swagger = require('./middleware/swagger');
const {JsonRpcProvider }= require('@ethersproject/providers')
const studentapi=require('./routes/StudentRegistryApi')
const Web3 = require('web3');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Registry API',
      version: '1.0.0',
      description: 'API documentation for the Student Registry',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['app.js'],
};

const app = express();
const port = 4000;
swagger(app)

const studentreigesteraddres="0x0b306bf915c4d645ff596e518faf3f9669b97016";
 try {
  const privatekey="0xb242c3e98193e7dd500d8c0cf61889d6e01fbf8873f42ff8b7befcc6446bb67d";
  let pylocl='0x1be38f456f5027fbf7bf5e484744c58828eaab8a807ae64493319b4873ee3e1f'

  const provider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:7545');
  provider.getBlockNumber().then((blockNumber) => {
    console.log("Current block number: " + blockNumber);
  });
  const signer = new ethers.Wallet(pylocl, provider);
  console.log(signer.address)

  //#region  taskcontract
  addrestask='0x42F9dC01529B7a4697EEcdaf5c8539f3C8E0E623'
  // const TaskContract = new ethers.Contract(
  //   addrestask,
  //   TaskAbi.abi,
  //   signer
  //   )
  //   console.log('TaskContract address :'+ TaskContract.address)
  //   TaskContract.getMyTasks().then((allTasks) => {
  //     // کدی که باید در صورت موفقیت اجرا شود
  //     console.log(allTasks)
  //   });
    //#endregion
  
  //#region  Greetercontract
  // let addGreeter='0xC6abde04D99a72F32010237525B2B52B960dDd12'
  // // 0xa6a89296fDd3fF0DF40c81C45797b899220BE63a
  // const Greeter=new ethers.Contract(
  //   addGreeter,Greeterabi.abi,signer
  //   )
  //   console.log('Greeter address :'+ Greeter.address)
    
  //   Greeter.greet().then((allTasks) => {
  //     console.log(allTasks)
  //   });
    
    //#endregion

 

} catch (error) {
  console.log(error);
}

swagger(app)

app.use(express.json());
app.use('/api',studentapi)

app.post('/students', async (req, res) => {
  console.log(req.body)
  const { firstName, lastName, degree, major, year } = req.body;
  try {
    const tx = await studentRegistry.createStudent(firstName, lastName, degree, major, year);
    await tx.wait();
    res.send('Student created successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating student');
  }
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskText:
 *                 type: string
 *               isDeleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Success message
 *       500:
 *         description: Error message
 */
app.post('/tasks', async (req, res) => {
  const { taskText, isDeleted } = req.body;
  try {
    const tx = await taskconteract.addTask(taskText, isDeleted);
    await tx.wait();
  res.send('Task created successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error creating task');
  }
  });


app.get('/tasks', async (req, res) => {
  try {
  const tasks = await contract.getMyTasks();
  res.send(tasks);
  } catch (err) {
  console.log(err);
  res.status(500).send('Error getting tasks');
  }
  });



app.put('/tasks/:taskId', async (req, res) => {
 const { isDeleted } = req.body;
 const taskId = parseInt(req.params.taskId);
 try {
   const tx = await contract.deleteTask(taskId, isDeleted);
   await tx.wait();
   res.send('Task updated successfully');
 } catch (err) {
   console.log(err);
   res.status(500).send('Error updating task');
 }
});


app.listen(port, () => { console.log(`App running on port ${port}`) });
