const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dmschell18:2BDdm8EaZ7blMpb5@cluster0.jsbufva.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

const database = client.db('users');
const samples = database.collection('notebooks');

async function writeFunction(whatToWrite) {
  try {
    const write = { message: whatToWrite }; 
    const message = await samples.insertOne(write);
    console.log(message); 
  } finally {
      await client.close(); 
  }
}

const write = (whatToWrite) => {
  write(whatToWrite);
}
//writeMany().catch(console.dir);

async function readFunction(whatToRead) {

  try {
    const query = { message: whatToRead};
    const sample = await samples.findOne(query);
    console.log(sample)
  } finally {
    await client.close();
  }
}

const read = (whatToRead) => {
  readFunction(whatToRead);
}
//readMany().catch(console.dir);