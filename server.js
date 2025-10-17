const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req,res){
    res.send('Welcome to our Hotel');
})

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuItem = require('./routes/menuItemRoutes');
app.use('/menuItem',menuItem);

app.listen(3100,()=>{
    console.log('listening on port 3100');
})


