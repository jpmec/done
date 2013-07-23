'use strict';




angular.module('doneApp', ['LocalStorageModule', 'ui.bootstrap'])
  .factory('todoFactory', function() {
    return {
      create: function() {

        var date = new Date();
        var id = CryptoJS.SHA256(date.toJSON()).toString();

        return {
          id: id,
          text: "",
          notes: "",
          done:false,
          priority: 0,
          createdDate: date.toString(),
          dueDate: null,
          startedDate: null,
          finishedDate: null
        };
      }
    };
  })

  .service('todosService', function(localStorageService) {
    this.todos = [];

    this.getTodos = function() {
      return this.todos;
    }

    this.getTodo = function(id) {
      return _.find(this.todos, function(obj) { return obj.id === id })
    }

    this.count = function() {
      return this.todos.length;
    };

    this.deleteAll = function() {
      localStorageService.clearAll();
      this.todos = [];
      return this.todos;
    };

    this.loadFromLocalStorageService = function() {

      this.todos = []

      var keys = localStorageService.keys();
      for (var i in keys) {

        var key = keys[i];
        var todoStr = localStorageService.get(key);
        var todo = JSON.parse(todoStr);

        this.todos.push(todo);
      }

      return this.todos;
    };

    this.saveTodo = function(todo) {
      localStorageService.add(todo.id, JSON.stringify(todo));
    };

    this.addTodo = function(todo) {
      this.todos.push(todo);
      this.saveTodo(todo);
    };
  })

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
      .when('/print/todo/:todoId', {
        templateUrl: 'views/print_todo.html',
        controller: 'TodoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
