const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://dmschell18:2BDdm8EaZ7blMpb5@cluster0.jsbufva.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

const database = client.db('users');
const samples = database.collection('notebooks');

//writing
async function writeToUsers(username, password) {
  try {
    const user = { message: username }; 
    const pass = { message: password };
    const message = await database.insertOne(user);
    const samples = database.collection('passowrd');
    const message2 = await samples.insertOne(pass);
    console.log(message, ' + ', message2); 
  } finally {
      await client.close(); 
  }
}
async function writeToNotebooks(user, whatToWrite) {
  try {
    const write = { message: whatToWrite }; 
    const samples = database.collection('notebooks');
    const message = await samples.insertOne(write);
    console.log(message); 
  } finally {
      await client.close(); 
  }
}
async function writeToNotes(user, notebook, whatToWrite) {
  try {
    const write = { message: whatToWrite }; 
    const samples = database.collection('notebooks');
    const samples2 = database.collection('notes');
    const message = await samples2.insertOne(write);
    console.log(message); 
  } finally {
      await client.close(); 
  }
}

const writeUsers = (username, password) => {
  writeToUsers(username, password).catch(console.dir);
}
const writeNotebooks = (whatToWrite, user) => {
  writeToUsers(user, whatToWrite).catch(console.dir);
}
const writeNotes = (whatToWrite, user, notebook) => {
  writeToUsers(user, notebook, whatToWrite).catch(console.dir);
}
//writeMany().catch(console.dir);


//reading
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
  readFunction(whatToRead).catch(console.dir);
}
//readMany().catch(console.dir);