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
    templateUrl: 'app/app_signin.html'
    controller: 'UserSigninCtrl'
  ).when('/tasks/list',
    templateUrl: 'app/app_tasks_list.html'
    controller: 'TasksCtrl'
  ).when('/tasks/dashboard',
    templateUrl: 'app/app_tasks_dashboard.html'
    controller: 'TasksCtrl'
  ).when('/tasks/print/:printFilter',
    templateUrl: 'app/app_tasks_list_print.html'
    controller: 'TasksPrintCtrl'
  ).when('/tasks/print',
    redirectTo: '/tasks/print/all'
  ).when('/task',
    redirectTo: '/'
  ).when('/task/edit/:taskId',
    templateUrl: 'app/app_task_edit.html'
    controller: 'TaskCtrl'
  ).when('/task/print/:taskId',
    templateUrl: 'app/app_task_print.html'
    controller: 'TaskCtrl'
  ).when('/help/about',
    templateUrl: 'help/help_about.html'
  ).when('/user/:userId',
    templateUrl: 'user/user_view.html'
    controller: 'UserCtrl'
  ).when('/user/edit/:userId',
    templateUrl: 'user/user_edit.html'
    controller: 'UserEditCtrl'
  ).otherwise redirectTo: '/signin'
]
