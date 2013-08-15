

describe 'factory: taskFactory', ->
  taskFactory = undefined

  beforeEach module('tasksModule')

  beforeEach inject(($injector) ->
    taskFactory = $injector.get('taskFactory')
  )

  describe 'create', ->
    it 'creates a new task', ->
      task = taskFactory.create()
      expect(task).toBeDefined()




describe 'service: tasksCrudService', ->
  tasksCrudService = undefined

  beforeEach module('tasksModule')

  beforeEach inject(($injector) ->
    tasksCrudService = $injector.get('tasksCrudService')
    tasksCrudService.destroyAll()
  )

  describe 'count', ->
    it 'returns 0', ->
      expect(tasksCrudService.count()).toBe 0

  describe 'create', ->
    it 'returns new task', ->
      task = tasksCrudService.create({text: 'get it done'});
      expect(task).toBeDefined()
      expect(tasksCrudService.count()).toBe 1

  describe 'retrieve', ->
    it 'returns null for null', ->
      task = tasksCrudService.retrieve(null)
      expect(task).toBe(null)

    it 'returns null if id doesnt exist', ->
      task = tasksCrudService.retrieve({id: 1})

    it 'returns a valid item', ->
      task1 = tasksCrudService.create({text: 'get it done'})
      task2 = tasksCrudService.retrieve({id: task1.id})

      expect(task2).toBeDefined()
      expect(task2.text).toBe('get it done')

  describe 'update', ->
    it 'returns a valid user', ->
      task1 = tasksCrudService.create({text: 'get it done'})
      task1.text = 'do it'

      task2 = tasksCrudService.update(task1)
      expect(task2.text).toBe('do it')

  describe 'destroy', ->
    it 'destroys', ->
      task1 = tasksCrudService.create({text: 'get it done'})
      expect(tasksCrudService.count()).toBe 1

      task2 = tasksCrudService.destroy(task1)
      expect(tasksCrudService.count()).toBe 0
      expect(task2.text).toBe('get it done')




describe 'service: tasksService', ->
  tasksService = undefined

  beforeEach module('tasksModule')

  beforeEach inject(($injector) ->
    tasksService = $injector.get('tasksService')
  )

  describe 'getTasks', ->
    it 'returns defined', ->
      expect(tasksService.getTasks()).toBeDefined()

  describe 'count', ->
    it 'returns 0', ->
      expect(tasksService.count()).toBe 0

  describe 'retrieveAll', ->
    it 'returns defined', ->
      tasks = tasksService.retrieveAll()
      expect(tasks).toBeDefined()
