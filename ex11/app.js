angular.module('TodoApp', [])

.controller('AppCtrl', function($scope, $rootScope, TodoRESTFactory, TodoDataFactory) {

    $scope.$on('LoadTodos', function($event, todos) {
        if (todos) {
            $rootScope.$broadcast('LoadOtherCtrlTodos', todos);
        } else {
            TodoRESTFactory
                .getAll()
                .then(function(response) {
                    $scope.todos = response.data;
                    $rootScope.$broadcast('LoadOtherCtrlTodos', response.data);
                })
                .catch(function(error) {
                    console.log(error);
                })
        }
    });

    $scope.$broadcast('LoadTodos');

    var uid = 0;
    $scope.createTodo = function($event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            //console.log($scope.todoText);
            var todo = {
                id: uid++,
                text: $scope.todoText,
                isCompleted: false
            }

            //$scope.todos.push(todo);
            TodoRESTFactory
                .post(todo)
                .then(function(response) {
                    console.log(response);
                    if (response.status === 201) {
                        $scope.todoText = '';
                        $scope.todos.push(response.data);
                        $scope.$broadcast('LoadTodos', $scope.todos);
                    }
                })
                //console.log($scope.todos);
        }
    }

    $scope.editTodo = function(todo) {
        todo.isEditMode = true;
    }

    $scope.saveTodo = function(todo) {
        delete todo.isEditMode;
        TodoRESTFactory.put(todo.id, todo);
    }

    $scope.deleteTodo = function($index, todo) {

        TodoRESTFactory
            .delete(todo.id)
            .then(function(response) {
                if (response.status === 200) {
                    $scope.todos.splice($index, 1);
                    $scope.$broadcast('LoadTodos', $scope.todos);
                }
            })

    }
})

.controller('HeaderCtrl', function($scope, $rootScope, TodoRESTFactory, TodoDataFactory) {
    $rootScope.$on('LoadOtherCtrlTodos', function($event, todos) {
        $scope.todos = todos;
    })

})

.factory('TodoDataFactory', function() {
    var todos = [];

    var API = {
        get: function() {
            return todos;
        }
    };
    return API;
})

.value('RESTURL', 'http://localhost:3000/todos')

.factory('TodoRESTFactory', function($http, RESTURL) {

    var API = {
        getAll: function() {
            return $http.get(RESTURL);
        },
        post: function(todo) {
            return $http.post(RESTURL, todo);
        },
        put: function(id, todo) {
            return $http.put(RESTURL + '/' + id, todo);
        },
        delete: function(id) {
            return $http.delete(RESTURL + '/' + id);
        }
    };
    return API;
})
