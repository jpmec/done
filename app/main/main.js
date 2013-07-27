'use strict';




angular.module('mainModule', ['userModule', 'todosModule', 'ui.bootstrap'])
  .directive('doneAppNavbar', function () {
    return {
      restrict: 'A',
      templateUrl: 'navbar/navbar.html'
    };
  })
  .directive('mainBrand', function () {
    return {
      restrict: 'A',
      templateUrl: 'main/main_navbar.html'
    };
  })
  .controller('MainCtrl', ['$scope', function($scope){
    $scope.init = function() {
    };

    $scope.brand = function() {
      return 'Done! - a motivational app for getting things done.';
    };
  }])
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
      .when('/help/about', {
        templateUrl: 'help/help_about.html'
      })
      .otherwise({
        redirectTo: '/signin'
      });
  });
