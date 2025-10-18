const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get('/', function (req,res){
    res.send('Welcome to our Hotel');
})

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuItem = require('./routes/menuItemRoutes');
app.use('/menuItem',menuItem);



app.listen(PORT,()=>{
    console.log('listening on port 3100');
})


