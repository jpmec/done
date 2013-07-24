'use strict';




angular.module('doneApp', ['todosModule', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/todos', {
        templateUrl: 'todos/todos.html',
        controller: 'TodosCtrl'
      })
      .when('/print/todos', {
        templateUrl: 'todos/print_todos.html',
        controller: 'TodosCtrl'
      })
      .when('/todo', {
        redirectTo: '/'
      })
      .when('/todo/:todoId', {
        templateUrl: 'todos/todo.html',
        controller: 'TodoCtrl'
      })
      .when('/print/todo/:todoId', {
        templateUrl: 'todos/print_todo.html',
        controller: 'TodoCtrl'
      })
      .otherwise({
        redirectTo: '/todos'
      });
  });
