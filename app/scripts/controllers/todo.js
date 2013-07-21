'use strict';



function TodoCtrl($scope, $routeParams, localStorageService) {

  $scope.todoId = $routeParams.todoId

  $scope.init = function() {
    $scope.todo = $scope.getFromLocalStorage();
  };

  $scope.getFromLocalStorage = function() {
    return JSON.parse(localStorageService.get($scope.todoId));
  };
};
