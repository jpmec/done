'use strict';




angular.module('doneApp', ['LocalStorageModule', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/todos.html',
        controller: 'TodosCtrl'
      })
      .when('/todo', {
        redirectTo: '/'
      })
      .when('/todo/:todoId', {
        templateUrl: 'views/todo.html',
        controller: 'TodoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
