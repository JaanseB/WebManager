
var TaskBoardController = function(){
    
    var self = this;  
    var TaskBoard; 
    var mongooseConn;
    var taskListController;
    
    self.Init = function(mongooseConn, taskListController){
        this.mongooseConn = mongooseConn;
        this.taskListController = taskListController;
        
        
        TaskBoard = mongooseConn.model('TaskBoard',{
            title : String
        });
    }
    
    self.GetTaskBoards = function (response)
    {
        TaskBoard.find(function(err, taskslists){

            if (err)
                response.send(err);           
          
            response.json(taskslists); 
        });   
    }
    
    self.AddTaskBoard = function (title, response)
    {
    
        TaskBoard.create({
            title : title
        }, function(err, taskslists) {
            if (err)
                response.send(err);
            self.GetTaskBoards(response);
        });
    }
    
    self.DeleteTaskBoard = function (id, response)
    {
    
        TaskBoard.remove({
            _id : id
        }, function(err, taskslists) {
            if (err)
                response.send(err);
            self.GetTaskBoards(response);
        });
    }
    
}

module.exports = TaskBoardController;