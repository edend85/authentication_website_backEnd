require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const server = express();
const DB = require('./utils/db');
const PORT = process.env.PORT || 3000;
const db = new DB();

server.use(cors({origin:["https://authentication-zi9e.onrender.com","https://authentication_website.ordernet.com","https://lh3.googleusercontent.com/a-/ALV-UjXJBu6TS…D8xJSl8xHTnRdDbuRr_NYtBygCq3yS_WR9ozqnFSjLN=s96-c"]}));
server.use(express.json({ limit: '100mb'}));

server.use('/api/user', require('./routes/userRoute'));
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});