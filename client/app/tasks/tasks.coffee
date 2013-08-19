### jshint -W093 ###

'use strict'

tasksModule = angular.module 'tasksModule',
['obscureLocalStorageModule', 'userModule']




tasksModule.factory 'taskFactory', ->
  create: ->
    date = new Date()
    id = CryptoJS.SHA256(date.toJSON()).toString()
    id: id
    text: ''
    notes: ''
    done: false
    priority: 0
    mustDo: false
    createdBy: ''
    createdDate: date.toString()
    dueDate: null
    startedDate: null
    finishedDate: null
    assignedTo: null
    steps: []




tasksModule.factory 'taskStepFactory', ->
  create: (text) ->
    text: text
    done: false




tasksModule.service 'tasksCrudService',
['taskFactory', 'obscureLocalStorageService',
(taskFactory, obscureLocalStorageService) ->

  @prefix = 'tasks.'

  @keyFor = (obj) ->
    return null unless obj
    return null unless obj.id
    @prefix + obj.id

  @toString = (obj) ->
    JSON.stringify obj

  @fromString = (str) ->
    task = str
    task = JSON.parse(str) if 'string' is typeof str
    task.dueDate = new Date(task.dueDate)  if task.dueDate
    task

  @create = (obj) ->
    item = _.extend(taskFactory.create(), obj)
    obscureLocalStorageService.add @keyFor(item), item
    item

  @retrieve = (obj) ->
    k = @keyFor(obj)
    return null unless k
    item = obscureLocalStorageService.get(k)
    item

  @retrieveAll = (where) ->
    tasks = []
    prefixLength = @prefix.length
    keys = obscureLocalStorageService.keys()
    for i of keys
      key = keys[i]
      if @prefix == key.substr(0, prefixLength)
        taskStr = obscureLocalStorageService.get(key)
        task = @fromString(taskStr)
        tasks.push task

    if where
      return _.where(tasks, where)
    else
      tasks

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

        taskStr = obscureLocalStorageService.get(key)
        task = _.where([@fromString(taskStr)], where)[0]

        if task
          @destroy(task)
    else
      obscureLocalStorageService.clearAll()
]




tasksModule.service 'tasksService',
['tasksCrudService',
(tasksCrudService) ->

  @tasks = []

  @getTasks = ->
    @tasks

  @getTask = (id) ->
    _.find @tasks, (obj) ->
      obj.id is id

  @count = ->
    @tasks.length

  @countDone = ->
    count = 0
    angular.forEach @tasks, (task) ->
      count += (if task.done then 1 else 0)
    count

  @create = (obj) ->
    task = tasksCrudService.create(obj)
    @tasks.push(task) if task
    task

  @destroyAll = (where) ->
    tasksCrudService.destroyAll(where)
    @tasks = []
    @tasks

  @retrieveAll = (where) ->
    @tasks = tasksCrudService.retrieveAll(where)
    @tasks

  @saveTask = (task) ->
    tasksCrudService.update(task)

  @addTask = (task) ->
    @tasks.push task
    @saveTask task

  @destroyTask = (task) ->
    tasksCrudService.destroy(task)
]




tasksModule.directive 'tasksNavbar', ->
  restrict: 'A'
  templateUrl: 'tasks/tasks_navbar.html'


tasksModule.directive 'tasksAdmin', ->
  restrict: 'A'
  templateUrl: 'tasks/tasks_admin.html'


tasksModule.directive 'tasksSearch', ->
  restrict: 'A'
  templateUrl: 'tasks/tasks_search.html'


tasksModule.directive 'tasksFilter', ->
  restrict: 'A'
  templateUrl: 'tasks/tasks_filter.html'


tasksModule.directive 'tasksAddForm', ->
  restrict: 'A'
  templateUrl: 'tasks/tasks_add_form.html'


tasksModule.directive 'taskListView', ->
  restrict: 'A'
  templateUrl: 'tasks/task_list_view.html'





tasksModule.controller 'TasksCtrl',
['$scope', '$location', 'activeUserService', 'taskFactory', 'taskStepFactory',
'tasksService',
($scope, $location, activeUserService, taskFactory, taskStepFactory,
tasksService) ->

  $scope.tasks = []
  $scope.positiveMessage = 'You did it!'
  $scope.tasksListFilter = 'all'

  $scope.init = ->
    if activeUserService.userIsNull()
      $location.path '/'
      return
    $scope.tasks = tasksService.retrieveAll({createdBy: activeUserService.id()})

  $scope.isUser = ->
    activeUserService.name()

  $scope.count = ->
    tasksService.count()

  $scope.addTask = ->
    return if !$scope.newTaskText
    return if $scope.newTaskText.length is 0

    task = tasksService.create({ text: $scope.newTaskText,
    createdBy: activeUserService.id() })

    $scope.newTaskText = ''

  $scope.deleteTask = (task) ->
    tasksService.destroyTask task
    i = _.indexOf($scope.tasks, task)
    $scope.tasks.splice i, 1  unless i is -1

  $scope.saveTask = (task) ->
    tasksService.saveTask task

  $scope.editTask = (task) ->
    $location.path '/task/' + task.id.toString()

  $scope.viewPrintTasks = ->
    $location.path '/print/tasks'

  $scope.viewTasks = ->
    $location.path '/tasks'

  $scope.createdBy = (task) ->
    task.createdBy

  $scope.setStartedDate = (task) ->
    task.startedDate = new Date().toString()
    tasksService.saveTask task

  $scope.setFinishedDate = (task) ->
    task.finishedDate = new Date().toString()
    tasksService.saveTask task

  $scope.setDone = (task, done) ->
    if done
      $scope.setFinishedDate task
      task.done = true
      tasksService.saveTask task
    else
      task.finishedDate = null
      task.done = false
      tasksService.saveTask task

  $scope.hasNotes = (task) ->
    task.notes and task.notes.length isnt 0

  $scope.clearTasks = ->
    $scope.tasks = tasksService.destroyAll({createdBy: activeUserService.id()})

  $scope.remaining = ->
    tasksService.count() - tasksService.countDone()

  $scope.archive = ->
    oldTasks = $scope.tasks
    $scope.tasks = []
    angular.forEach oldTasks, (task) ->
      unless task.done
        $scope.tasks.push task
      else
        tasksService.destroyTask task

  $scope.filterTasksNotDone = (task) ->

    if task.done
      return null

    if $scope.tasksListFilter == 'done'
      return null

    if $scope.searchText && $scope.searchText.length != 0
      return null if task.text.indexOf($scope.searchText) == -1

    return task

  $scope.filterTasksDone = (task) ->

    if !task.done
      return null

    if $scope.tasksListFilter == 'notDone'
      return null

    if $scope.searchText && $scope.searchText.length != 0
      return null if task.text.indexOf($scope.searchText) == -1

    return task

  $scope.prettyPrintTask = (task) ->
    JSON.stringify(task, null, '\t')


  $scope.createTaskStep = (task, text) ->
    return unless text.length > 0

    step = taskStepFactory.create(text)
    task.steps.push(step)
    tasksService.saveTask task

  $scope.destroyTaskStep = (task, step) ->
    i = 0
    angular.forEach task.steps, (s) ->
      unless s == step
        i++
      else
        console.log 'found step'
        obj = task.steps.splice(i, 1)
        tasksService.saveTask task
        return obj

  $scope.setTaskStepDone = (task, step, done) ->
    step.done = done
    tasksService.saveTask task

  $scope.setTaskMustDo = (task) ->

    return if task.mustDo == true

    angular.forEach $scope.tasks, (task) ->
      if task.mustDo == true
        task.mustDo = false
        tasksService.saveTask task

    task.mustDo = true
    tasksService.saveTask task

]




tasksModule.controller 'TaskCtrl',
['$scope', '$routeParams', '$location', 'tasksService',
($scope, $routeParams, $location, tasksService) ->

  $scope.taskId = $routeParams.taskId

  $scope.init = ->
    tasksService.retrieveAll()
    $scope.task = tasksService.getTask($scope.taskId)

  $scope.save = ->
    tasksService.saveTask $scope.task
    $location.path '/tasks'

  $scope.cancel = ->
    $location.path '/tasks'

  $scope.hasNotes = ->
    $scope.task.notes and $scope.task.notes.length isnt 0
]
