### jshint -W093 ###

'use strict'

mainModule = angular.module 'mainModule',
['userModule', 'tasksModule', 'ui.bootstrap']




mainModule.directive 'doneAppNavbar', ->
  restrict: 'A'
  templateUrl: 'navbar/navbar.html'


mainModule.directive 'mainBrand', ->
  restrict: 'A'
  templateUrl: 'main/main_navbar.html'


mainModule.controller 'MainCtrl', ['$scope', ($scope) ->
  $scope.init = ->

  $scope.brand = ->
    'Done! - a motivational app for getting things done.'
]




mainModule.config ['$routeProvider', ($routeProvider) ->

  $routeProvider.when('/signin',
    templateUrl: 'user/user_signin.html'
    controller: 'UserSigninCtrl'
  ).when('/tasks',
    templateUrl: 'tasks/tasks.html'
    controller: 'TasksCtrl'
  ).when('/print/tasks',
    templateUrl: 'tasks/print_tasks.html'
    controller: 'TasksCtrl'
  ).when('/task',
    redirectTo: '/'
  ).when('/task/:taskId',
    templateUrl: 'tasks/task.html'
    controller: 'TaskCtrl'
  ).when('/print/task/:taskId',
    templateUrl: 'tasks/print_task.html'
    controller: 'TaskCtrl'
  ).when('/help/about',
    templateUrl: 'help/help_about.html'
  ).when('/user',
    templateUrl: 'user/user_view.html'
    controller: 'UserCtrl'
  ).when('/user/edit',
    templateUrl: 'user/user_edit.html'
    controller: 'UserEditCtrl'
  ).otherwise redirectTo: '/signin'
]
