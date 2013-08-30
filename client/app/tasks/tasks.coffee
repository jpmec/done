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
    i = _.indexOf(@tasks, task)
    @tasks.splice i, 1  unless i is -1

]




tasksModule.service 'tasksTypeaheadService',
['obscureLocalStorageService',
(obscureLocalStorageService) ->

  @prefix = 'tasks.typeaheads'
  @maxLength = 10
  @typeaheads = null

  @keyFor = () ->
    @prefix

  @getTypeaheads = () ->
    @retrieve() if @typeaheads == null
    @typeaheads

  @add = (str) ->
    @retrieve() if @typeaheads == null

    @typeaheads = _.filter(@typeaheads, (value) ->
      value != str
    ).slice(0, @maxLength - 1)

    @typeaheads.push(str)
    obscureLocalStorageService.add @keyFor(), @typeaheads
    @typeaheads

  @remove = (str) ->
    @retrieve() if @typeaheads == null

    @typeaheads = _.filter(@typeaheads, (value) ->
      value != str
    )
    obscureLocalStorageService.add @keyFor(), @typeaheads
    @typeaheads

  @retrieve = () ->
    @typeaheads = obscureLocalStorageService.get(@keyFor())
    if @typeaheads == null
      @typeaheads = []
    @typeaheads

  @destroyAll = () ->
    @retrieve() if @typeaheads == null

    ary = @typeaheads.slice()
    @typeaheads = []
    obscureLocalStorageService.remove @keyFor()
    ary
]




tasksModule.directive 'tasksNavbar', ->
  restrict: 'EA'
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


tasksModule.directive 'tasksList', ->
  restrict: 'A'
  templateUrl: 'tasks/tasks_list.html'


tasksModule.directive 'tasksDashboard', ->
  restrict: 'A'
  templateUrl: 'tasks/tasks_dashboard.html'


tasksModule.directive 'printTasksList', ->
  restrict: 'A'
  templateUrl: 'tasks/tasks_list_print.html'


tasksModule.directive 'taskEdit', ->
  restrict: 'A'
  templateUrl: 'tasks/task_edit.html'



tasksModule.controller 'TasksCtrl',
['$scope', '$location', 'activeUserService', 'taskFactory', 'taskStepFactory',
'tasksService', 'tasksTypeaheadService'
($scope, $location, activeUserService, taskFactory, taskStepFactory,
tasksService, tasksTypeaheadService) ->

  $scope.tasks = []
  $scope.typeaheads = []

  $scope.positiveMessage = 'You did it!'
  $scope.tasksListFilter = 'all'

  $scope.init = ->
    if activeUserService.userIsNull()
      console.log('activeUserService.userIsNull')
      $location.path '/'
      return
    $scope.tasks = tasksService.retrieveAll({createdBy: activeUserService.id()})
    $scope.syncTypeaheads()

  $scope.tasksTextArray = ->
    ary = []
    angular.forEach $scope.tasks, (task) ->
      if (!task.done)
        ary.push(task.text)
    ary

  $scope.syncTypeaheads = ->
    typeaheads = tasksTypeaheadService.getTypeaheads()
    tasks = $scope.tasksTextArray()
    $scope.typeaheads = _.difference(typeaheads, tasks)

  $scope.isUser = ->
    activeUserService.name()

  $scope.count = ->
    tasksService.count()

  $scope.tasksCount = () ->
    $scope.tasks.length

  $scope.tasksCountDone = () ->
    count = 0
    angular.forEach $scope.tasks, (task) ->
      if (task.done)
        count++
    count

  $scope.tasksCountNotDone = () ->
    count = 0
    angular.forEach $scope.tasks, (task) ->
      if (!task.done)
        count++
    count

  $scope.tasksDonePercent = () ->
    (100 * $scope.tasksCountDone()) / $scope.tasksCount()

  $scope.addTask = ->
    return if !$scope.newTaskText
    return if $scope.newTaskText.length is 0

    task = tasksService.create({ text: $scope.newTaskText,
    createdBy: activeUserService.id() })

    if task
      tasksTypeaheadService.add($scope.newTaskText)
      $scope.syncTypeaheads()

    $scope.newTaskText = ''

    task

  $scope.deleteTask = (task) ->
    tasksService.destroyTask task
    $scope.syncTypeaheads()

  $scope.saveTask = (task) ->
    tasksService.saveTask task

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

    $scope.syncTypeaheads()

  $scope.hasNotes = (task) ->
    task.notes and task.notes.length isnt 0

  $scope.destroyAllTasksForActiveUser = ->
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

  $scope.orderByTasksNotDone = (task) ->
    if task.done
      return 0

    if task.mustDo
      return Infinity

    return task.priority


  $scope.orderByTasksDone = (task) ->
    if !task.done
      return 0

    return task.finishedDate


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


  $scope.hasTaskSteps = (task) ->
    task.steps.length > 0

  $scope.createTaskStep = (task, text) ->
    return if text.length == 0

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

  $scope.taskStepsDoneCount = (task) ->
    count = 0
    angular.forEach task.steps, (step) ->
      if (step.done)
        count++
    count

  $scope.taskStepsCount = (task) ->
    task.steps.length

  $scope.taskStepsDonePercent = (task) ->
    (100 * $scope.taskStepsDoneCount(task)) / $scope.taskStepsCount(task)

  $scope.setTaskMustDo = (task) ->

    return if task.mustDo == true

    angular.forEach $scope.tasks, (task) ->
      if task.mustDo == true
        task.mustDo = false
        tasksService.saveTask task

    task.mustDo = true
    tasksService.saveTask task


  $scope.hasTaskMustDo = () ->
    result = false
    angular.forEach $scope.tasks, (task) ->
      if task.mustDo == true
        result = true
    result


  $scope.getTaskMustDo = () ->
    task = null
    angular.forEach $scope.tasks, (t) ->
      if t.mustDo == true
        task = t
    task
]




tasksModule.controller 'TasksLocationCtrl',
['$scope', '$location'
($scope, $location) ->

  $scope.gotoTasksList = ->
    $location.path '/tasks/list'

  $scope.gotoTasksDashboard = () ->
    $location.path '/tasks/dashboard'

  $scope.gotoTaskEdit = (task) ->
    $location.path '/task/' + task.id.toString()

  $scope.gotoPrintTasks = (filter)->
    $location.path '/tasks/print/' + filter

]




tasksModule.controller 'TasksStatsCtrl',
['$scope'
($scope) ->


  $scope.findOldestNotDoneCreatedDate = ->
    if $scope.tasksCount() == 0
      return null

    result = $scope.tasks[0].createdDate

    angular.forEach $scope.tasks, (task) ->
      if !task.done and task.createdDate < result
        result = task.createdDate

    result

  $scope.findOldestNotDoneTask = ->
    if $scope.tasksCount() == 0
      return null

    result = $scope.tasks[0]

    angular.forEach $scope.tasks, (task) ->
      if !task.done and task.createdDate < result
        result = task

    result


  $scope.findNewestNotDoneCreatedDate = ->
    if $scope.tasksCount() == 0
      return null

    result = $scope.tasks[0].createdDate

    angular.forEach $scope.tasks, (task) ->
      if !task.done and task.createdDate > result
        result = task.createdDate

    result
]



tasksModule.controller 'TasksPrintCtrl',
['$scope', '$routeParams', '$location', 'activeUserService', 'tasksService',
($scope, $routeParams, $location, activeUserService, tasksService) ->

  $scope.tasks = []
  $scope.tasksListFilter = 'all'
  $scope.printFilter = $routeParams.printFilter || 'all'

  $scope.init = ->
    if activeUserService.userIsNull()
      $location.path '/'
      return
    $scope.tasks = tasksService.retrieveAll({createdBy: activeUserService.id()})

  $scope.isUser = ->
    activeUserService.name()

  $scope.count = ->
    tasksService.count()

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

  $scope.remaining = ->
    tasksService.count() - tasksService.countDone()

  $scope.orderByTasksNotDone = (task) ->
    if task.done
      return 0

    if task.mustDo
      return Infinity

    return task.priority


  $scope.orderByTasksDone = (task) ->
    if !task.done
      return 0

    return task.finishedDate


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


  $scope.hasTaskSteps = (task) ->
    task.steps.length > 0

  $scope.setTaskStepDone = (task, step, done) ->
    step.done = done
    tasksService.saveTask task

  $scope.taskStepsDoneCount = (task) ->
    count = 0
    angular.forEach task.steps, (step) ->
      if (step.done)
        count++
    count

  $scope.taskStepsCount = (task) ->
    task.steps.length

  $scope.taskStepsDonePercent = (task) ->
    (100 * $scope.taskStepsDoneCount(task)) / $scope.taskStepsCount(task)

  $scope.printDoneTasks = () ->
    unless $scope.printFilter
      return true
    else
      $scope.printFilter == 'done' || $scope.printFilter == 'all'

  $scope.printNotDoneTasks = () ->
    unless $scope.printFilter
      return true
    else
      $scope.printFilter == 'not_done' || $scope.printFilter == 'all'

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
    $location.path '/tasks/list'

  $scope.cancel = ->
    $location.path '/tasks/list'

  $scope.hasNotes = ->
    $scope.task.notes and $scope.task.notes.length isnt 0
]
