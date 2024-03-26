const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

const dbConnect = async () => {
  try {
    const client = new MongoClient(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // serverApi: ServerApiVersion.v1,
    });

    await client.connect();

    console.log(`usepayizzy connected`);
    return client; // Return the connected client
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


const dbName = 'user';
const client = new MongoClient(uri);

// Connect to the database
async function connect() {
  try {
    await client.connect();
    console.log('Connected successfully to db collection');
  } catch (err) {
    console.error('Failed to connect to server:', err);
  }
}

// Call the connect function to establish a connection to the database
connect();

module.exports = dbConnect;