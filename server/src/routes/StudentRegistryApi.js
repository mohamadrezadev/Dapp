const express= require('express')
const swagger=require('../middleware/swagger')
const ethers = require('ethers');
const studentabi=require('../../artifacts/contracts/StudentRegistry.sol/StudentRegistry.json')


const router = express.Router()
// swagger(router)
//#region  student egistery
let pylocl='0x1be38f456f5027fbf7bf5e484744c58828eaab8a807ae64493319b4873ee3e1f'

//#region  configuration
const provider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:7545');
provider.getBlockNumber().then((blockNumber) => {
  console.log("Current block number: " + blockNumber);
});
const signer = new ethers.Wallet(pylocl, provider);
const addresregistery='0xa6a89296fDd3fF0DF40c81C45797b899220BE63a'
//#endregion

async function testcreate() {
          const StudentRegistry=new ethers.Contract(
                    addresregistery,studentabi.abi,signer
          )
          const firstName = 'John';
          const lastName = 'Doe';
          const degree = 'BSc';
          const major = 'Computer Science';
          const year = 2022;

          const tax=await  StudentRegistry.createStudent(firstName, lastName, degree, major, year)  
          const res=await  tax.wait();
          // Get the event emitted by the contract
          console.log(tax)
          const event = res.events.find((event) => event.event === 'StudentCreated');
          console.log(event);
        
}
testcreate()
async function tetsReadstudent(){
          const StudentRegistry=new ethers.Contract(
                    addresregistery,studentabi.abi,signer
          )
          const tax=await StudentRegistry.readStudent();
          // var result=await tax.wait() ;
          console.log(JSON.stringify(tax))
}
tetsReadstudent()

/** 
* @swagger
 * /students:
 *   get:
 *     summary: get  students
 *     description: get all  students in the Student Registry
 *     responses:
 *       200:
 *         description: Student created successfully
 *       500:
 *         description: Error creating student
 */
router.get('/',async(req,res)=>{
          StudentRegistry.readStudent().then((students) => {
                    console.log(students)
                   return res.status(200).send(students)
          }).catch((error) => {
                    console.log(error)
                    return res.status(500).send(error)
          }) 
});

/** 
* @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     description: Creates a new student in the Student Registry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               degree:
 *                 type: string
 *               major:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Student created successfully
 *       500:
 *         description: Error creating student
 */
router.post('/',async(req,res)=>{
          const firstName = 'John';
          const lastName = 'Doe';
          const degree = 'BSc';
          const major = 'Computer Science';
          const year = 2022;
        
          const tax= await StudentRegistry.createStudent(firstName, lastName, degree, major, year)  
          await tx.wait();
          res.send('Student information updated successfully');
})


/** 
* @swagger
 * /students:
 *   put:
 *     summary: update a student
 *     description: update a  student in the Student Registry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               degree:
 *                 type: string
 *               major:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Student created successfully
 *       500:
 *         description: Error creating student
 */
router.put('/students::id', async (req, res) => {
          const { firstName, lastName, degree, major, year } = req.body;
          try {
            const tx = await studentRegistry.updateStudent(firstName, lastName, degree, major, year);
            await tx.wait();
            res.send('Student information updated successfully');
          } catch (err) {
            console.log(err);
            res.status(500).send('Error updating student information');
          }
        
});


/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     description: Deletes a student from the registry by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the student to delete.
 *     responses:
 *       200:
 *         description: Student deleted successfully.
 *       500:
 *         description: Error deleting student.
 */
router.delete('/students', async (req, res) => {
          try {
            const tx = await studentRegistry.deleteStudent();
            await tx.wait();
            res.send('Student deleted successfully');
          } catch (err) {
            console.log(err);
            res.status(500).send('Error deleting student');
          }
        
});
        
        
module.exports=router 