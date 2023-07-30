
const express= require('express');
const bodyParser = require('body-parser')
const routes = require('express').Router();
const taskInfo = require('./routes/taskInfo')

const app = express();
app.use(bodyParser.json());
app.use(routes)
const PORT = 3000;

app.get('/',(req,res)=>{
    return res.status(200).send("welcome to task managemnt assignment app")
})

routes.use('/tasks',taskInfo)

app.listen(PORT,(error)=>{
    if(!error){
        console.log('Server has started successfully')
    }else{
        console.log('Eroor occured')
    }
})