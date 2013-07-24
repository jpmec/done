'use strict';

angular.module('todosModule', ['LocalStorageModule'])
  .factory('todoFactory', function() {
    return {
      create: function() {

        var date = new Date();
        var id = CryptoJS.SHA256(date.toJSON()).toString();

        return {
          id: id,
          text: "",
          notes: "",
          done:false,
          priority: 0,
          createdDate: date.toString(),
          dueDate: null,
          startedDate: null,
          finishedDate: null
        };
      }
    };
  })
  .service('todosService', function(localStorageService) {
    this.todos = [];

    this.getTodos = function() {
      return this.todos;
    }

    this.getTodo = function(id) {
      return _.find(this.todos, function(obj) { return obj.id === id })
    }

    this.count = function() {
      return this.todos.length;
    };

    this.deleteAll = function() {
      localStorageService.clearAll();
      this.todos = [];
      return this.todos;
    };

    this.todoToString = function(todo) {
      return JSON.stringify(todo);
    }

    this.todoFromString = function(todoStr) {
      var todo = JSON.parse(todoStr);
      if(todo.dueDate) {
        todo.dueDate = new Date(todo.dueDate);
      }
      return todo;
    }

    this.loadFromLocalStorageService = function() {

      this.todos = []

      var keys = localStorageService.keys();
      for (var i in keys) {

        var key = keys[i];
        var todoStr = localStorageService.get(key);
        var todo = this.todoFromString(todoStr);

        this.todos.push(todo);
      }

      return this.todos;
    };

    this.saveTodo = function(todo) {
      var id = todo.id;
      var todoStr = this.todoToString(todo);

      localStorageService.add(id, todoStr);
    };

    this.addTodo = function(todo) {
      this.todos.push(todo);
      this.saveTodo(todo);
    };
  });




function TodosCtrl($scope, $location, localStorageService, todoFactory, todosService) {

  $scope.todos = [];
  $scope.positiveMessage = 'You did it!'

  $scope.init = function() {
    $scope.todos = todosService.loadFromLocalStorageService();
  };

  $scope.count = function() {
    return todosService.count();
  };

  $scope.addTodo = function() {

    if ($scope.newTodoText.length === 0) {
      return
    }

    var todo = todoFactory.create();
    todo.text = $scope.newTodoText;

    todosService.addTodo(todo);
    $scope.newTodoText = '';
  };

  $scope.editTodo = function(todo) {
    $location.path('/todo/' + todo.id.toString());
  };

  $scope.viewPrintTodos = function() {
    $location.path('/print/todos');
  };

  $scope.setStartedDate = function(todo) {
    todo.startedDate = new Date().toString();
    todosService.saveTodo(todo);
  };

  $scope.setFinishedDate = function(todo) {
    todo.finishedDate = new Date().toString();
    todosService.saveTodo(todo);
  };

  $scope.setDone = function(todo, done) {
    if(done) {
      $scope.setFinishedDate(todo);
      todo.done = true;
      todosService.saveTodo(todo);
    }
    else {
      todo.finishedDate = null;
      todo.done = false;
      todosService.saveTodo(todo);
    }
  }

  $scope.hasNotes = function(todo) {
    return (todo.notes && todo.notes.length !== 0)
  }

  $scope.clearTodos = function () {
    $scope.todos = todosService.deleteAll();
  };

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) {
        $scope.todos.push(todo);
      }
      else {
        localStorageService.remove(todo.key);
      }
    });
  };
}




function TodoCtrl($scope, $routeParams, $location, $log, todosService) {

  $scope.todoId = $routeParams.todoId

  $scope.init = function() {
    todosService.loadFromLocalStorageService();
    $scope.todo = todosService.getTodo($scope.todoId);
  };

  $scope.save = function() {
    todosService.saveTodo($scope.todo);
    $location.path('/');
  };

  $scope.cancel = function() {
    $location.path('/');
  };

  $scope.hasNotes = function() {
    return ($scope.todo.notes && $scope.todo.notes.length !== 0)
  };

};
