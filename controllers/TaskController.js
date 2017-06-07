var TaskController = function (){
    
    var self = this;  
    var Task; 
    var mongooseConn;
    var TaskSchema
    
    
    self.Init = function (mongooseConn){
        this.mongooseConn = mongooseConn;
        
        var Schema = mongooseConn.Schema;
        TaskSchema = new Schema({
          title: { type: String, required: true},
          description: String,
          tasklistID: String,
          created_at: Date,
          updated_at: Date
        });
        Task = mongooseConn.model('Task', TaskSchema);

    }   
    self.GetTasks = function (response)
    {
        Task.find(function(err, tasks){
            if (err)
                response.send(err);

            response.json(tasks); 
        });   
    }
    
    self.AddTask = function (body, response)
    {
    
        Task.create({
            title : body.title,
            description: body.description,
            tasklistID: body.tasklistID
        }, function(err, tasks) {
            if (err)
                response.send(err);
            self.GetTasks(response);
        });
    }
    
    self.DeleteTask = function (id, response)
    {
    
        Task.remove({
            _id : id
        }, function(err, tasks) {
            if (err)
                response.send(err);
            self.GetTasks(response);
        });
    }
    
    self.UpdateTasklist = function (id, tasklistID, response)
    {
        console.log("Updating task " + id + " to new tasklistID " + tasklistID);
    
        
        Task.update({
            _id : id
        }, {tasklistID:tasklistID}, function(err, tasks) {
            if (err)
                response.send(err);
            self.GetTasks(response);
        });
    }
    
    self.GetTasksForTaskLists = function(id, response)
    {
        Task.find({ tasklistID: id }).exec(function(err, tasks){            
           
            if (err)
                response.send(err);
            response.json(tasks);                   
            
        });   
        
    }
    
    
}

module.exports = TaskController;