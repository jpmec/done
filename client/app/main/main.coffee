
mainModule = angular.module("mainModule", ["userModule", "todosModule", "ui.bootstrap"])


mainModule.directive "doneAppNavbar", ->
  restrict: "A"
  templateUrl: "navbar/navbar.html"


mainModule.directive "mainBrand", ->
  restrict: "A"
  templateUrl: "main/main_navbar.html"


mainModule.controller "MainCtrl", ["$scope", ($scope) ->
  $scope.init = ->

  $scope.brand = ->
    "Done! - a motivational app for getting things done."
]


mainModule.config ["$routeProvider", "$locationProvider", ($routeProvider, $locationProvider) ->

  $routeProvider.when("/signin",
    templateUrl: "user/user_signin.html"
    controller: "UserSigninCtrl"
  ).when("/todos",
    templateUrl: "todos/todos.html"
    controller: "TodosCtrl"
  ).when("/print/todos",
    templateUrl: "todos/print_todos.html"
    controller: "TodosCtrl"
  ).when("/todo",
    redirectTo: "/"
  ).when("/todo/:todoId",
    templateUrl: "todos/todo.html"
    controller: "TodoCtrl"
  ).when("/print/todo/:todoId",
    templateUrl: "todos/print_todo.html"
    controller: "TodoCtrl"
  ).when("/help/about",
    templateUrl: "help/help_about.html"
  ).when("/user",
    templateUrl: "user/user_view.html"
    controller: "UserCtrl"
  ).when("/user/edit",
    templateUrl: "user/user_edit.html"
    controller: "UserEditCtrl"
  ).otherwise redirectTo: "/signin"
]
