const express = require('express');
const bodyParser = require('body-parser');
const qr = require('qrcode')
const morgan = require('morgan')
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const dbConnect = require('./database/database')
const qrRoutes = require('./routes/qrRoute')





app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))
dotenv.config({path: 'config.env'})
app.use(morgan('tiny'))

app.use(qrRoutes)



dbConnect()







app.get('/', (req, res) => {
    res.send('Welcome to Payizzy Wallet API Version 1');
    
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`server is running on port ${PORT}`)})
