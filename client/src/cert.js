import Certabi from './utils/Certificate.json'
import {CertContractAddress, TaskContractAddress} from './config.js';
import { ethers } from 'ethers';
const Getstudent=async ()=>{
          try {
                 const {ethereum}=window   
                 if(ethereum){
                    const provider=new ethers.providers.Web3Provider(ethereum);
                    const signer= provider.getSigner();
                    const Certcontract=new ethers.Contract(
                              TaskContractAddress,
                              Certabi.abi,
                              signer
                    )
                    // let allstudent=await Certcontract.
                 }
          } catch (error) {
                    
          }
}
const CreateStudent=async ()=>{
          let task = {
                    'taskText': input,
                    'isDeleted': false
          };
          try {
                    const {ethereum} = window
              
                    if(ethereum) {
                      const provider = new ethers.providers.Web3Provider(ethereum);
                      const signer = provider.getSigner();
                      const Certcontract = new ethers.Contract(
                        CertContractAddress,
                         Certabi.abi,
                        signer
                      )
              
                      Certcontract.createStudent(task.taskText, task.isDeleted)
                      .then(response => {
                        setTasks([...tasks, task]);
                        console.log("Completed Task");
                      })
                      .catch(err => {
                        console.log("Error occured while adding a new task");
                      });
                      ;
                    } else {
                      console.log("Ethereum object doesn't exist!");
                    }
                  } catch(error) {
                    console.log("Error submitting new Tweet", error);
                  }
              

}
const TaskContract = new ethers.Contract(
          CertContractAddress,
          Certabi.abi,
          signer
        )