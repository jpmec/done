'use strict';




angular.module('doneApp', ['userModule', 'todosModule', 'ui.bootstrap'])
  .directive('doneAppNavbar', function () {
    return {
      restrict: 'A',
      templateUrl: 'navbar/navbar.html'
    };
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/signin', {
        templateUrl: 'user/user_signin.html',
        controller: 'UserCtrl'
      })
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
        redirectTo: '/signin'
      });
  });
