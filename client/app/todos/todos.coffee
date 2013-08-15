### jshint -W093 ###

'use strict'

todosModule = angular.module 'todosModule',
['obscureLocalStorageModule', 'userModule']




todosModule.factory 'todoFactory', ->
  create: ->
    date = new Date()
    id = CryptoJS.SHA256(date.toJSON()).toString()
    id: id
    text: ''
    notes: ''
    done: false
    priority: 0
    createdBy: ''
    createdDate: date.toString()
    dueDate: null
    startedDate: null
    finishedDate: null
    assignedTo: null




todosModule.service 'todosCrudService',
['todoFactory', 'obscureLocalStorageService',
(todoFactory, obscureLocalStorageService) ->

  @prefix = 'todos.'

  @keyFor = (obj) ->
    return null unless obj
    return null unless obj.id
    @prefix + obj.id

  @toString = (obj) ->
    JSON.stringify obj

  @fromString = (str) ->
    todo = str
    todo = JSON.parse(str) if 'string' is typeof str
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

  @retrieveAll = (where) ->
    todos = []
    prefixLength = @prefix.length
    keys = obscureLocalStorageService.keys()
    for i of keys
      key = keys[i]
      if @prefix == key.substr(0, prefixLength)
        todoStr = obscureLocalStorageService.get(key)
        todo = @fromString(todoStr)
        todos.push todo

    if where
      return _.where(todos, where)
    else
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

  @destroyAll = (where) ->
    if where
      console.log(where)

      keys = obscureLocalStorageService.keys()
      for i of keys
        key = keys[i]

        todoStr = obscureLocalStorageService.get(key)
        todo = _.where([@fromString(todoStr)], where)[0]

        if todo
          @destroy(todo)
    else
      obscureLocalStorageService.clearAll()
]




todosModule.service 'todosService',
['todosCrudService',
(todosCrudService) ->

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
    todo

  @destroyAll = (where) ->
    todosCrudService.destroyAll(where)
    @todos = []
    @todos

  @retrieveAll = (where) ->
    @todos = todosCrudService.retrieveAll(where)
    @todos

  @saveTodo = (todo) ->
    todosCrudService.update(todo)

  @addTodo = (todo) ->
    @todos.push todo
    @saveTodo todo

  @destroyTodo = (todo) ->
    todosCrudService.destroy(todo)
]




todosModule.directive 'todosNavbar', ->
  restrict: 'A'
  templateUrl: 'todos/todos_navbar.html'


todosModule.directive 'todosAdmin', ->
  restrict: 'A'
  templateUrl: 'todos/todos_admin.html'


todosModule.directive 'todosSearch', ->
  restrict: 'A'
  templateUrl: 'todos/todos_search.html'


todosModule.directive 'todosFilter', ->
  restrict: 'A'
  templateUrl: 'todos/todos_filter.html'


todosModule.directive 'todosAddForm', ->
  restrict: 'A'
  templateUrl: 'todos/todos_add_form.html'


todosModule.directive 'todoListView', ->
  restrict: 'A'
  templateUrl: 'todos/todo_list_view.html'





todosModule.controller 'TodosCtrl',
['$scope', '$location', 'activeUserService', 'todoFactory', 'todosService',
($scope, $location, activeUserService, todoFactory, todosService) ->

  $scope.todos = []
  $scope.positiveMessage = 'You did it!'
  $scope.todosListFilter = 'all'

  $scope.init = ->
    if activeUserService.userIsNull()
      $location.path '/'
      return
    $scope.todos = todosService.retrieveAll({createdBy: activeUserService.id()})

  $scope.isUser = ->
    activeUserService.name()

  $scope.count = ->
    todosService.count()

  $scope.addTodo = ->
    return if !$scope.newTodoText
    return if $scope.newTodoText.length is 0

    todo = todosService.create({ text: $scope.newTodoText,
    createdBy: activeUserService.id() })

    $scope.newTodoText = ''

  $scope.deleteTodo = (todo) ->
    todosService.destroyTodo todo
    i = _.indexOf($scope.todos, todo)
    $scope.todos.splice i, 1  unless i is -1

  $scope.saveTodo = (todo) ->
    todosService.saveTodo todo

  $scope.editTodo = (todo) ->
    $location.path '/todo/' + todo.id.toString()

  $scope.viewPrintTodos = ->
    $location.path '/print/todos'

  $scope.viewTodos = ->
    $location.path '/todos'

  $scope.createdBy = (todo) ->
    todo.createdBy

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
    $scope.todos = todosService.destroyAll({createdBy: activeUserService.id()})

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

  $scope.filterTodosNotDone = (todo) ->

    if todo.done
      return null

    if $scope.todosListFilter == 'done'
      return null

    if $scope.searchText && $scope.searchText.length != 0
      return null if todo.text.indexOf($scope.searchText) == -1

    return todo

  $scope.filterTodosDone = (todo) ->

    if !todo.done
      return null

    if $scope.todosListFilter == 'notDone'
      return null

    if $scope.searchText && $scope.searchText.length != 0
      return null if todo.text.indexOf($scope.searchText) == -1

    return todo

  $scope.prettyPrintTodo = (todo) ->
    JSON.stringify(todo, null, '\t')

]




todosModule.controller 'TodoCtrl',
['$scope', '$routeParams', '$location', 'todosService',
($scope, $routeParams, $location, todosService) ->

  $scope.todoId = $routeParams.todoId

  $scope.init = ->
    todosService.retrieveAll()
    $scope.todo = todosService.getTodo($scope.todoId)

  $scope.save = ->
    todosService.saveTodo $scope.todo
    $location.path '/todos'

  $scope.cancel = ->
    $location.path '/todos'

  $scope.hasNotes = ->
    $scope.todo.notes and $scope.todo.notes.length isnt 0
]
