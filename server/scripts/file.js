const fs = require('fs');

function write(obj) {
  try {
    const json = JSON.stringify(obj);
    fs.writeFileSync('./contrcatAddress.json', json, 'utf8');
    console.log('File has been saved');
  } catch (err) {
    console.error(err);
  }
}

module.exports.write = write;
// const fs = require('fs');
// // Create a JavaScript object to write to the file
// // const obj = {
// //   addres:"",
// //   address2:"",
// //   address3:""
// // };

// // Convert the object to a JSON string

// // Write the JSON string to a file
// function write(obj){
//           const json = JSON.stringify(obj);
//           fs.writeFile('./file.json', json, 'utf8', (err) => {
//                     if (err) {
//                       console.error(err);
//                       return;
//                     }
//                     console.log('File has been saved');        
//           });
// }
// module.exports=write;