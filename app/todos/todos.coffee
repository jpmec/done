todosModule = angular.module "todosModule", ["obscureLocalStorageModule", "userModule"]


todosModule.factory "todoFactory", ->
  create: ->
    date = new Date()
    id = CryptoJS.SHA256(date.toJSON()).toString()
    id: id
    text: ""
    notes: ""
    done: false
    priority: 0
    createdBy: ""
    createdDate: date.toString()
    dueDate: null
    startedDate: null
    finishedDate: null
    assignedTo: null


todosModule.service "todosCrudService", (todoFactory, obscureLocalStorageService) ->
  @prefix = "todos."

  @keyFor = (obj) ->
    return null unless obj
    return null unless obj.id
    @prefix + obj.id

  @toString = (obj) ->
    JSON.stringify obj

  @fromString = (str) ->
    todo = str
    todo = JSON.parse(str) if "string" is typeof str
    todo.dueDate = new Date(todo.dueDate)  if todo.dueDate
    todo

  @create = (obj) ->
    item = _.extend(todoFactory.create(), obj)
    obscureLocalStorageService.add @keyFor(item), item
    item

  @retrieve = (obj) ->
    k = @keyFor(obj)
    return null unless k
    item = obscureLocalStorageService.get(k)
    item

  @retrieveAll = () ->
    todos = []
    prefixLength = @prefix.length
    keys = obscureLocalStorageService.keys()
    for i of keys
      key = keys[i]
      if @prefix == key.substr(0, prefixLength)
        todoStr = obscureLocalStorageService.get(key)
        todo = @fromString(todoStr)
        todos.push todo
    todos

  @update = (obj) ->
    return null unless obj
    item = obscureLocalStorageService.get(@keyFor(obj))
    return null unless item
    item = _.extend(item, obj)
    obscureLocalStorageService.add @keyFor(item), item
    item

  @destroy = (obj) ->
    return null unless obj
    item = obscureLocalStorageService.get(@keyFor(obj))
    obscureLocalStorageService.remove @keyFor(obj)
    item

  @count = ->
    obscureLocalStorageService.keys().length

  @destroyAll = ->
    obscureLocalStorageService.clearAll()



todosModule.service "todosService", (todosCrudService) ->
  @todos = []
  @getTodos = ->
    @todos

  @getTodo = (id) ->
    _.find @todos, (obj) ->
      obj.id is id

  @count = ->
    @todos.length

  @countDone = ->
    count = 0
    angular.forEach @todos, (todo) ->
      count += (if todo.done then 1 else 0)

    count

  @create = (obj) ->
    todo = todosCrudService.create(obj)
    @todos.push(todo) if todo

  @destroyAll = ->
    todosCrudService.destroyAll()
    @todos = []
    @todos

  @retrieveAll = ->
    @todos = todosCrudService.retrieveAll()
    @todos

  @saveTodo = (todo) ->
    todosCrudService.update(todo);

  @addTodo = (todo) ->
    @todos.push todo
    @saveTodo todo

  @destroyTodo = (todo) ->
    todosCrudService.destroy(todo)



todosModule.directive "todosNavbar", ->
  restrict: "A"
  templateUrl: "todos/todos_navbar.html"


todosModule.directive "todosAdmin", ->
  restrict: "A"
  templateUrl: "todos/todos_admin.html"


todosModule.controller "TodosCtrl", ["$scope", "$location", "userService", "todoFactory", "todosService", ($scope, $location, userService, todoFactory, todosService) ->
  $scope.todos = []
  $scope.positiveMessage = "You did it!"
  $scope.init = ->
    if userService.userIsNull()
      $location.path "/"
      return
    $scope.todos = todosService.retrieveAll()

  $scope.isUser = ->
    userService.name()

  $scope.count = ->
    todosService.count()

  $scope.addTodo = ->
    return if $scope.newTodoText.length is 0
    todo = todosService.create({ text: $scope.newTodoText, createdBy: userService.name() })

    $scope.newTodoText = ""

  $scope.deleteTodo = (todo) ->
    todosService.removeTodo todo
    i = _.indexOf($scope.todos, todo)
    $scope.todos.splice i, 1  unless i is -1

  $scope.editTodo = (todo) ->
    $location.path "/todo/" + todo.id.toString()

  $scope.viewPrintTodos = ->
    $location.path "/print/todos"

  $scope.setStartedDate = (todo) ->
    todo.startedDate = new Date().toString()
    todosService.saveTodo todo

  $scope.setFinishedDate = (todo) ->
    todo.finishedDate = new Date().toString()
    todosService.saveTodo todo

  $scope.setDone = (todo, done) ->
    if done
      $scope.setFinishedDate todo
      todo.done = true
      todosService.saveTodo todo
    else
      todo.finishedDate = null
      todo.done = false
      todosService.saveTodo todo

  $scope.hasNotes = (todo) ->
    todo.notes and todo.notes.length isnt 0

  $scope.clearTodos = ->
    $scope.todos = todosService.destroyAll()

  $scope.remaining = ->
    todosService.count() - todosService.countDone()

  $scope.archive = ->
    oldTodos = $scope.todos
    $scope.todos = []
    angular.forEach oldTodos, (todo) ->
      unless todo.done
        $scope.todos.push todo
      else
        todosService.destroyTodo todo
]


todosModule.controller "TodoCtrl", ["$scope", "$routeParams", "$location", "todosService", ($scope, $routeParams, $location, todosService) ->
  $scope.todoId = $routeParams.todoId
  $scope.init = ->
    todosService.retrieveAll()
    $scope.todo = todosService.getTodo($scope.todoId)

  $scope.save = ->
    todosService.saveTodo $scope.todo
    $location.path "/todos"

  $scope.cancel = ->
    $location.path "/todos"

  $scope.hasNotes = ->
    $scope.todo.notes and $scope.todo.notes.length isnt 0
]
