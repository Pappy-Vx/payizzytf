const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const { MongoClient } = require('mongodb');
const qr = require('qrcode')

const uri = process.env.MONGO_URI;
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


const collectionName = 'users'
const getUserQRCode = async (req, res) => {
    try {
      // Extract email from the request body
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
  
      const db = client.db(dbName);
  
      // Fetch the user's details using their email
      const user = await db.collection(collectionName).findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Extract name and account number fields from the user object
      const { name, accountNumber } = user;
  
      // Concatenate user name and account number to create QR code data
      const qrCodeData = `${name}, ${accountNumber}`;
  
      // Generate QR code data URL
      qr.toDataURL(qrCodeData, (err, dataURL) => {
        if (err) {
          console.error('Error generating QR code:', err);
          return res.status(500).json({ error: 'An error occurred' });
        }
        // Return the QR code data URL as the response
        res.status(200).json({ qrCodeDataURL: dataURL });
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  };


module.exports = {getUserQRCode}