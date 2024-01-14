require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const server = express();
const DB = require('./utils/db');
const PORT = process.env.PORT || 3000;
const db = new DB();

server.use(cors({origin:["https://authentication-zi9e.onrender.com","https://authentication_website.ordernet.com","https://www.googleapis.com/oauth2"]}));
server.use(express.json({ limit: '100mb'}));

server.use('/api/user', require('./routes/userRoute'));
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});