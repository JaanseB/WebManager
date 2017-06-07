
// set up ========================
var express  = require('express');
var app      = express();                               
var mongoose = require('mongoose');                     
var morgan = require('morgan');             
var bodyParser = require('body-parser');    
var methodOverride = require('method-override'); 
var views = __dirname + '/public/views/';
var TaskListController = require('./controllers/TaskListController.js');
var TaskController = require('./controllers/TaskController.js');
var TaskBoardController = require('./controllers/TaskBoardController.js');

// configuration =================

mongoose.connect('mongodb://localhost:27017');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 
app.use(morgan('dev'));                                        
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());

// DB setup =========================
var taskCtrl = new TaskController();
taskCtrl.Init(mongoose);

var taskListCtrl = new TaskListController();
taskListCtrl.Init(mongoose, taskCtrl);

var taskBoardCtrl = new TaskBoardController();
taskBoardCtrl.Init(mongoose, taskListCtrl);




// Routes ===========================
app.get('/api/tasks', function(req, res) {
    taskCtrl.GetTasks(res);
});


app.post('/api/tasks', function(req, res) {
    taskCtrl.AddTask(req.body, res);
});

// delete a todo
app.delete('/api/tasks/:id', function(req, res) {
    taskCtrl.DeleteTask(req.params.id, res);
});

// update a todo
app.patch('/api/tasks/:id/tasklist/:tasklistID', function(req, res) {
    taskCtrl.UpdateTasklist(req.params.id, req.params.tasklistID, res);
});

app.get('/api/tasklists', function(req, res) {
    taskListCtrl.GetTaskLists(res);
});

app.get('/api/tasklists/tasks/:id', function(req, res) {
    taskCtrl.GetTasksForTaskLists(req.params.id, res);
});


app.post('/api/tasklists', function(req, res) {
    taskListCtrl.AddTaskList(req.body.title, res);
});

// delete a todo
app.delete('/api/tasklists/:id', function(req, res) {
    taskListCtrl.DeleteTaskList(req.params.id, res);
});

app.get('/api/taskboards', function(req, res) {
    taskBoardCtrl.GetTaskLists(res);
});


app.get('*', function(req, res) {
        res.sendfile(views + 'index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");