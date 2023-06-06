const path = require('path')
const fs = require('fs');
const pinataSDK = require('@pinata/sdk');



function saveDataToFile(data,file_name) {
  const filename =  `../ipfs/${file_name}.json`;
  const jsonData = JSON.stringify(data);

  fs.writeFile(filename, jsonData, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Data saved to ${filename}`);
  });
}

const metadata = {
          "name": "Certificate of Completion",
          "description": "Certificate of completion for the Web Development Bootcamp",
          "image": "https://example.com/certificate.jpg",
          "attributes": [
            {
              "trait_type": "Name",
              "value": "John Smith"
            },
            {
              "trait_type": "Course",
              "value": "Web Development Bootcamp"
            },
            {
              "trait_type": "Date",
              "value": "2023-06-02"
            },
            {
              "trait_type": "Details",
              "value": "Completed all modules with a grade of A+"
            }
          ]
};
// saveDataToFile(metadata,"test")

function encode(data){
  const metadataJson = JSON.stringify(data);
  const metadataBuffer = Buffer.from(metadataJson, 'utf8');
  const metadataBase64 = metadataBuffer.toString('base64');
  return metadataBase64;
}
const base64str=encode(metadata);
console.log('encode  :'+base64str);

 
function decode(data) {
  try {
    const metadataBuffer = Buffer.from(data, 'base64');
    const metadataJson = metadataBuffer.toString('utf8');
    const metadata = JSON.parse(metadataJson);
    return metadata;
  } catch (error) {
    console.log(`Error decoding data: ${error}`);
    return null;
  }
}
// const base64String = 'eyJuaW1lIjoiQ2VydGlmaWNhdGUgb2YgQ29tcGxldGlvbiIsImRlc2NyaXB0aW9uIjoiQ2VydGlmaWNhdGUgb2YgY29tcGxldGlvbiBmb3IgdGhlIFdlYiBEZXZlbG9wbWVudCBCb290Y2FtcCIsImltYWdlIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9jaGVja2VybmV0LmpwZyIsImF0dHJpYnV0ZXMiOlt7InRyYWl0X3R5cGUiOiJOYW1lIiwidmFsdWUiOiJKb2huIFNtaXRoIn0seyJ0cmFpdF90eXBlIjoiQ291cnNlIiwidmFsdWUiOiJXZWIgRGV2ZWxvcG1lbnQgQm9vdGNhbXAifSx7InRyYWl0X3R5cGUiOiJEYXRlIiwidmFsdWUiOiIyMDIzLTA2LTAyIn0seyJ0cmFpdF90eXBlIjoiRGV0YWlscyIsInZhbHVlIjoiQ29tcGxldGVkIGFsbCBtb2R1bGVzIHdpdGggYSBncmFkZSBvZiBBKzAifV19';
// console.log(decode(base64str));


// function upload(filename){
  
//     const apiKey = '3466fa18a2d16a0c3954';
//     const apiSecret = 'fec6f1707964e71f68ba299067c7f7dc5047c0b854caec033813ffe821902216';
//     const metadataFilePath = `../ipfs/${filename}.json`;

//     // Read the metadata file as a JSON object
//     const metadata = JSON.parse(fs.readFileSync(metadataFilePath));

//     // Initialize the Pinata SDK with your API key and secret
//     const pinata = pinataSDK(apiKey, apiSecret);

//     // Upload the metadata to Pinata
//     pinata.pinJSONToIPFS(metadata)
//       .then(response => {
//         console.log(`Metadata uploaded with CID: ${response.IpfsHash}`);
//       })
//       .catch(error => {
//         console.error(error);
//       });
// }
function upload(filename){
  
  const apiKey = '3466fa18a2d16a0c3954';
  const apiSecret = 'fec6f1707964e71f68ba299067c7f7dc5047c0b854caec033813ffe821902216';
  const metadataFilePath = `../ipfs/${filename}.json`;

  // Read the metadata file as a JSON object
  const metadata = JSON.parse(fs.readFileSync(metadataFilePath));

  // Initialize the Pinata SDK with your API key and secret
  const pinata = pinataSDK(apiKey, apiSecret);

  // Upload the metadata to Pinata
  pinata.pinJSONToIPFS(metadata)
    .then(response => {
      console.log(`Metadata uploaded with CID: ${response.IpfsHash}`);
    })
    .catch(error => {
      console.error(error);
    });
}


