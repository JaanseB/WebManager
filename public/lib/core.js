var TaskManager = angular.module('TaskManager', []);

TaskManager.directive('draggable', function() {
    return function(scope, element) {
        
        var el = element[0];
        el.draggable = true;

        el.addEventListener(
            'dragstart',
            function(e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('TaskID', this.id);
                this.classList.add('drag');
                return false;
            },
            false
        );

        el.addEventListener(
            'dragend',
            function(e) {
                this.classList.remove('drag');
                return false;
            },
            false
        );
    }
});
    
TaskManager.directive('droppable', function() {
    return function(scope, element) {
            // again we need the native object
            var el = element[0];
            
            el.addEventListener(
                'dragover',
                function(e) {
                    e.dataTransfer.dropEffect = 'move';
                    // allows us to drop
                    if (e.preventDefault) e.preventDefault();
                    this.classList.add('over');
                    return false;
                },
                false
            );
            el.addEventListener(
                'dragenter',
                function(e) {
                    this.classList.add('over');
                    return false;
                },
                false
            );

            el.addEventListener(
                'dragleave',
                function(e) {
                    this.classList.remove('over');
                    return false;
                },
                false
            );
            
            el.addEventListener(
                'drop',
                function(e) {
                    // Stops some browsers from redirecting.
                    if (e.stopPropagation) e.stopPropagation();

                    console.log("Moving " + e.dataTransfer.getData('TaskID') + " to new task list " + this.id);
                    this.classList.remove('over');
                    scope.handleDrop(e.dataTransfer.getData('TaskID'), this.id);


                    return false;
                },
                false
            );
        }
});

TaskManager.controller('mainController', function($scope, $http) {
    $scope.tasklistData = {};
    $scope.taskData = {};
    $scope.taskBoards = {};

    // when landing on the page, get all todos and show them
    
   $http.get('/api/taskboards')
        .success(function(data) {
            $scope.taskBoards = data;
            console.log("Taskboards:" + data);
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        }); 
    
    $http.get('/api/tasklists')
        .success(function(data) {
            $scope.tasklists = data;
            console.log("taskslists:" + data);
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    $http.get('/api/tasks')
        .success(function(data) {
            $scope.tasks = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    
     // when submitting the add form, send the text to the node API
    $scope.createTaskList = function() {
        $http.post('/api/tasklists', $scope.tasklistData)
            .success(function(data) {
                $scope.tasklistData = {}; // clear the form so our user is ready to enter another
                $scope.tasklists = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
     // when submitting the add form, send the text to the node API
    $scope.deleteTaskList = function(id) {
        $http.delete('/api/tasklists/' + id)
            .success(function(data) {
                $scope.tasklists = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    

    // when submitting the add form, send the text to the node API
    $scope.createTask = function(tasklistID, taskData) {
        taskData.tasklistID = tasklistID;
        console.log(taskData);
        $http.post('/api/tasks', taskData)
            .success(function(data) {
                taskData = {}; // clear the form so our user is ready to enter another
                $scope.tasks = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTask = function(id) {
        $http.delete('/api/tasks/' + id)
            .success(function(data) {
                $scope.tasks = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.handleDrop = function(taskID, taskListID) {
        
          $http({ method: 'PATCH', url: '/api/tasks/' + taskID +"/tasklist/" +  taskListID, data: ""})
            .success(function(data) {
                $scope.tasks = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

});