'use strict';

var exports = {}

function TodosCtrl($scope, localStorageService) {

  $scope.todos = [];
  $scope.selectedTodo = null;
  $scope.over = null;
  $scope.clicked = null;
  $scope.positiveMessage = 'You did it!'

  $scope.init = function() {
    var keys = localStorageService.keys();

    for (var i in keys) {

      var key = keys[i];
      var todoStr = localStorageService.get(key);
      var todo = JSON.parse(todoStr);

      $scope.todos.push(todo);
    }
  };

  $scope.addTodo = function() {

    if ($scope.newTodoText.length === 0) {
      return
    }
    var date = new Date();

    var id = CryptoJS.SHA256(date.toJSON());

    var todo = {
      key: id,
      text:$scope.newTodoText,
      notes: "",
      done:false,
      priority: 0,
      createdDate: date.toString(),
      dueDate: null,
      startedDate: null,
      finishedDate: null
    };

    $scope.saveTodo(todo)

    $scope.todos.push(todo);
    $scope.newTodoText = '';
  };

  $scope.saveTodo = function(todo) {
    localStorageService.add(todo.key, JSON.stringify(todo));
  };

  $scope.setStartedDate = function(todo) {
    todo.startedDate = new Date().toString();
    $scope.saveTodo(todo);
  };

  $scope.setFinishedDate = function(todo) {
    todo.finishedDate = new Date().toString();
    $scope.saveTodo(todo);
  };

  $scope.setDone = function(todo, done) {
    if(done) {
      $scope.setFinishedDate(todo);
      todo.done = true;
      $scope.saveTodo(todo);
    }
    else {
      todo.finishedDate = null;
      todo.done = false;
      $scope.saveTodo(todo);
    }
  }

  $scope.hasNotes = function(todo) {
    return (todo.notes && todo.notes.length !== 0)
  }

  $scope.clearTodos = function () {
    localStorageService.clearAll();
    $scope.todos = [];
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

  $scope.mouseoverTodo = function(todo) {
    $scope.over = todo;
  };

  $scope.clickTodo = function(todo) {
    $scope.clicked = todo;
  };

  $scope.reset = function() {
    console.log('reset');
    $scope.over = null;
    $scope.clicked = null;
  };

  $scope.priorityUp = function(todo) {
    todo.priority = todo.priority + 1;
  }

  $scope.priorityDown = function(todo) {
    if (todo.priority == 0) {
      return;
    }
    todo.priority = todo.priority - 1;
  }

  $scope.alertme = function() {
    alert('me!');
  }
}
