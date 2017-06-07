
var TaskListController = function(){
    
    var self = this;  
    var TaskList; 
    var mongooseConn;
    var taskController;
    
    self.Init = function(mongooseConn, taskController){
        this.mongooseConn = mongooseConn;
        this.taskController = taskController;
        
        
        TaskList = mongooseConn.model('TaskList',{
            title : String,
            taskBoardID: String
        });
    }
    
    self.GetTaskLists = function (response)
    {
        TaskList.find(function(err, taskslists){

            if (err)
                response.send(err);           
          
            response.json(taskslists); 
        });   
    }
    
     self.GetTaskListsByBoard = function (id, response)
    {
        TaskList.find({ taskBoardID: id }).exec(function(err, taskslists){            
           
            if (err)
                response.send(err);
            response.json(taskslists);                   
            
        });
    }
    
    self.AddTaskList = function (body, response)
    {
    
        TaskList.create({
            title : body.title,
            taskBoardID: body.taskBoardID
        }, function(err, taskslists) {
            if (err)
                response.send(err);
            self.GetTaskListsByBoard(body.taskBoardID, response);
        });
    }
    
    self.DeleteTaskList = function (id, response)
    {
    
        TaskList.remove({
            _id : id
        }, function(err, taskslists) {
            if (err)
                response.send(err);
            self.GetTaskLists(response);
        });
    }
    
}

module.exports = TaskListController;