'use strict';



function TodoCtrl($scope, $routeParams, $location, todosService) {

  $scope.todoId = $routeParams.todoId

  $scope.init = function() {
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
