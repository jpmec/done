function TodoCtrl($scope, localStorageService) {
  $scope.todos = []

  $scope.init = function() {
    keys = localStorageService.keys()

    for (var i in keys) {

      var key = keys[i]
      var todo_str = localStorageService.get(key)
      var todo = JSON.parse(todo_str)

      $scope.todos.push(todo)
    }
  }

  $scope.addTodo = function() {
    var date = new Date();

    var todo = {
      text:$scope.todoText,
      done:false,
      created: date.toString()
    }

    localStorageService.add(date.toJSON(), JSON.stringify(todo));

    $scope.todos.push(todo);
    $scope.todoText = '';
  };

  $scope.clearTodos = function () {
    localStorageService.clearAll();
    $scope.todos = [];
  }

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
    count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
    if (!todo.done) $scope.todos.push(todo);
    });
  };
}
