import React, {useState, useEffect } from 'react';
import {TextField , Button } from '@mui/material';
import Task from './Task';
import './App.css';

import { TaskContractAddress } from './config.js';
import {ethers} from 'ethers';
import TaskAbi from './utils/TaskContract.json';
import certai from './utils/Certificate.json';
import studetntabi from './utils/StudentRegistry.json';
import GreatAbi   from './utils/Greeter.json'


function App() {
  const [tasks,setTasks]=useState([]);
  const [input, setInput]=useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);
    
  const Greeting=async()=>{
    const addressGreet="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    try {
      const {ethereum} = window
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        // console.log(signer);
        const GreatContract = new ethers.Contract(
          addressGreet,
          GreatAbi.abi,
          signer
        );
        const great = await GreatContract.greet();
        // const students = await StudentContract.readStudent();
        console.log('grrat:');
        console.log('grrat:'+ great);
        // setTasks(students);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch(error) {
      console.log(error);
    }
  }

  const students=async()=>{
    const addresstudent='0x5FbDB2315678afecb367f032d93F642f64180aa3'
    try {
      const {ethereum} = window
      // console.log(ethereum)
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        // console.log(signer);
        const studentRegistry = new ethers.Contract(
          addresstudent,
          studetntabi.abi,
          signer
        );
        const student = await studentRegistry.readStudent();
        // const students = await StudentContract.readStudent();
        console.log(student);
        // setTasks(students);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch(error) {
      console.log(error);
    }
  }

  const getAllTasks = async() => {
  try {
    const {ethereum} = window

    if(ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const TaskContract = new ethers.Contract(
        TaskContractAddress,
        TaskAbi.abi,
        signer
      )
      let allTasks = await TaskContract.getMyTasks();
      // setTasks(allTasks);
    } else {
      console.log("Ethereum object doesn't exist");
    }
  } catch(error) {
    console.log(error);
    
  }
  }
  students();
  useEffect(() => {
    Greeting()
      // students()
      // getAllTasks()
    },[]);
    
    // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log('Metamask not detected')
        return
      }
      let chainId = await ethereum.request({ method: 'eth_chainId'})
      console.log('Connected to chain:' + chainId)
      
      const rinkebyChainId = '0xaa36a7'
      setCorrectNetwork(true);

      // if (chainId !== rinkebyChainId) {
      //   alert('You are not connected to the Rinkeby Testnet!')
      //   return
      // } else {
      // }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Found account', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log('Error connecting to metamask', error)
    }
  }  
    
  const addTask= async (e)=>{
    e.preventDefault();

    let task = {
      'taskText': input,
      'isDeleted': false
    };

    try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log(signer)
        const TaskContract = new ethers.Contract(
          '0x42F9dC01529B7a4697EEcdaf5c8539f3C8E0E623',
          TaskAbi.abi,
          signer
        )
        if (signer._isSigner)
        {
          // signer.getSigner
        
          // console.log(signer.getAddress()/)
          alert('sing')
          TaskContract.addTask(task.taskText, task.isDeleted)
          .then(response => {
            setTasks([...tasks, task]);
            console.log("Completed Task");
          })
          .catch(err => {
            console.log("Error occured while adding a new task");
          });
          

        }
       
        
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch(error) {
      console.log("Error submitting new Tweet", error);
    }

    setInput('')
  };
  
  const deleteTask = key => async() => {
    console.log(key);

    // Now we got the key, let's delete our tweet
    try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          '0x42F9dC01529B7a4697EEcdaf5c8539f3C8E0E623',
          TaskAbi.abi,
          signer
        )

        let deleteTaskTx = await TaskContract.deleteTask(key, true);
        let allTasks = await TaskContract.getMyTasks();
        setTasks(allTasks);
      } else {
        console.log("Ethereum object doesn't exist");
      }

    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div>
{currentAccount === '' ? (
  <button
  className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
  onClick={connectWallet}
  >

  Connect Wallet
  </button>
  ) : correctNetwork ? (
    <div className="App">
      <h2> Task Management App</h2>
      <form>
         <TextField id="outlined-basic" label="Make Todo" variant="outlined" style={{margin:"0px 5px"}} size="small" value={input}
         onChange={e=>setInput(e.target.value)} />
        <Button variant="contained" color="primary" onClick={addTask}  >Add Task</Button>
      </form>
      <ul>
          {tasks.map(item=> 
            <Task 
              key={item.id} 
              taskText={item.taskText} 
              onClick={deleteTask(item.id)}
            />)
          }
      </ul>
    </div>
  ) : (
  <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
  <div>----------------------------------------</div>
  <div>Please connect to the Rinkeby Testnet</div>
  <div>and reload the page</div>
  <div>----------------------------------------</div>
  </div>
)}
</div>
  );
}

export default App;
