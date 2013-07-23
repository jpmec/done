'use strict';

var exports = {}

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
    console.log(todo.id);
    $location.path('/todo/' + todo.id.toString());
  }

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
