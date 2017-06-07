var mongoose = require('mongoose');  

var TaskListController = function(){
    
    var self = this;  
    var TaskList = 
    
    self.Init(dbConnect){
        mongoose.connect(dbConnect);
        
        TaskList = mongoose.model('TaskList',{
            title : String
        });
    }   
    
}