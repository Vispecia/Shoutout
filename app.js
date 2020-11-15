const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys/keys')
const bodyParser = require('body-parser')
const PORT = 5000;

mongoose.connect(MONGOURI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
});

mongoose.connection.on('connection',()=>{
    console.log("connected to DB")
})

mongoose.connection.on('error',()=>{
    console.log("error connecting in DB")
})

require('./models/user');
require('./models/post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(require('./routes/auth'));

app.use(require('./routes/post'));

app.listen(PORT,()=>{
    console.log("server is running")
})
