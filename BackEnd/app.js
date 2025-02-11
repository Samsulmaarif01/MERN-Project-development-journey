require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000 



// connect to mongodb 
mongoose.connect(process.env.MONGO_URL).then(() => console.log('connected to mongodb')).catch(err => console.log(err));

// start the server
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
