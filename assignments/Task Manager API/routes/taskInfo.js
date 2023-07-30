const taskRoutes = require('express').Router();
const bodyParser = require('body-parser');
const fs =require('fs')
const validator = require('../helpers/validator');
taskRoutes.use(bodyParser.urlencoded({
    extended: true
}));
taskRoutes.use(bodyParser.json());

let taskArray=[
    {   taskId:1,
        title:'Task1',
        discription:'complete first task',
        completion_status:false,
        creationDate:new Date(),
        priority:'low'
    },
    {   taskId:2,
        title:'Task2',
        discription:'complete second task',
        completion_status:true,
        creationDate:"2023-07-29T13:19:40.789Z",
        priority:'high'
    }
]

taskRoutes.get('/',(req,res)=>{
    return res.status(200).json(taskArray);
 });

 taskRoutes.get('/:id',(req,res)=>{
    let  totalTasks= taskArray;
    let taskIdPassed = req.params.id;
    let result=  totalTasks.filter(val=>val.taskId==taskIdPassed)
    if(result==null || result==undefined || result.length==0){
        return res.status(404).json({"message":"Task that you are looking does not exists"})
    }
    return res.status(200).json(result);
 });

 taskRoutes.post('/',(req,res)=>{
    const taskDetails= req.body;
    const status=validator.validateTaskInfo(taskDetails,taskArray).status
    const statusInfo=validator.validateTaskInfo(taskDetails,taskArray)
    if(status){
       taskArray.push(taskDetails);
        res.status(200).json(statusInfo);
    }else{
        res.status(400).json(validator.validateTaskInfo(taskDetails,taskArray))
    }
 });

 taskRoutes.put('/:id',(req,res)=>{
    const taskDetails= req.body;
    const taskIdToFind= taskDetails.taskId;
    const taskIndexToUpdate = taskArray.findIndex(task => task.taskId === taskIdToFind);
    if (taskIndexToUpdate !== -1){
        const status=validator.validateTaskInfoForPut(taskDetails,taskArray).status
       const statusInfo=validator.validateTaskInfoForPut(taskDetails,taskArray)
        if(status){
            taskArray[taskIndexToUpdate].taskId=taskIdToFind;
            taskArray[taskIndexToUpdate].title= taskDetails.title;
            taskArray[taskIndexToUpdate].discription=taskDetails.discription;
            taskArray[taskIndexToUpdate].completion_status= taskDetails.completion_status
            taskArray[taskIndexToUpdate].creationDate= taskDetails.creationDate
            taskArray[taskIndexToUpdate].priority= taskDetails.priority
            res.status(200).json(statusInfo);
        }else{
            res.status(400).json(statusInfo)
        }
    }else{
        res.status(400).json("task id does not exists")
    }

 });

 taskRoutes.delete('/:id',(req,res)=>{
    let taskIdToDelete= req.params.id;
    console.log(taskIdToDelete)
    let idx= taskArray.findIndex(task=>task.taskId==taskIdToDelete)
    if(idx!=-1){
        taskArray= taskArray.filter(task => task.taskId != taskIdToDelete);
          console.log(taskArray)
         res.status(200).json("Task delted sucessfully")
     }else{
         res.status(400).json("can not delete task which does not exits")
     }
 })

 module.exports= taskRoutes;