
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
    
    self.AddTaskList = function (title, response)
    {
    
        TaskList.create({
            title : title
        }, function(err, taskslists) {
            if (err)
                response.send(err);
            self.GetTaskLists(response);
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