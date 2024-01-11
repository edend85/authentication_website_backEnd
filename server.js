require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const server = express();
const DB = require('./utils/db');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

/*{
    origin:["http://localhost:5173","https://authentication_website.ordernet.com"]
}*/ 
server.use(cors());
server.use(express.json());

server.use('/api/user', require('./routes/userRoute'));
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});