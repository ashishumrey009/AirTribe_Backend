class validator {
    static validateTaskInfo(taskInfo, taskData) {
      if(taskInfo.hasOwnProperty("taskId") &&
        taskInfo.hasOwnProperty("title") &&
        taskInfo.hasOwnProperty("discription") &&
        taskInfo.hasOwnProperty("completion_status") &&
        taskInfo.hasOwnProperty("creationDate") &&
        taskInfo.hasOwnProperty("priority") &&
         this.validateUniqueTaskId(taskInfo, taskData)) {
          return {
            "status": true,
            "message": "Task has been added"
          };
        }
        if(!this.validateUniqueTaskId(taskInfo, taskData)){
          return {
            "status": false,
            "message": "Task id has to be unique"
          };
        }
        return {
          "status": false,
          "message": "Task Info is malformed please provide all the properties"
        }
    }
  
    static validateUniqueTaskId(taskInfo, taskData) {
      let valueFound = taskData.some(el => el.taskId === taskInfo.taskId);
      if(valueFound) return false;
      return true;
    }
     
    static validateTaskInfoForPut(taskInfo, taskData){
        if(taskInfo.hasOwnProperty("taskId") &&
        taskInfo.hasOwnProperty("title") &&
        taskInfo.hasOwnProperty("discription") &&
        taskInfo.hasOwnProperty("completion_status") &&
        taskInfo.hasOwnProperty("creationDate") &&
        taskInfo.hasOwnProperty("priority")) {
          return {
            "status": true,
            "message": "Task has been updated"
          };
        }
        return {
          "status": false,
          "message": "Task Info is malformed please provide all the properties"
        }
    }
  

  
    static isInt(value) {
      return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
    }
  }
  
  module.exports = validator;