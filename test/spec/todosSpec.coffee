

describe 'factory: todoFactory', ->
  todoFactory = undefined

  beforeEach module('todosModule')

  beforeEach inject(($injector) ->
    todoFactory = $injector.get('todoFactory')
  )

  describe 'create', ->
    it 'creates a new todo', ->
      todo = todoFactory.create()
      expect(todo).toBeDefined()




describe 'service: todosCrudService', ->
  todosCrudService = undefined

  beforeEach module('todosModule')

  beforeEach inject(($injector) ->
    todosCrudService = $injector.get('todosCrudService')
    todosCrudService.destroyAll()
  )

  describe 'count', ->
    it 'returns 0', ->
      expect(todosCrudService.count()).toBe 0

  describe 'create', ->
    it 'returns new todo', ->
      todo = todosCrudService.create({text: 'get it done'});
      expect(todo).toBeDefined()
      expect(todosCrudService.count()).toBe 1

  describe 'retrieve', ->
    it 'returns null for null', ->
      todo = todosCrudService.retrieve(null)
      expect(todo).toBe(null)

    it 'returns null if id doesnt exist', ->
      todo = todosCrudService.retrieve({id: 1})

    it 'returns a valid item', ->
      todo1 = todosCrudService.create({text: 'get it done'})
      todo2 = todosCrudService.retrieve({id: todo1.id})

      expect(todo2).toBeDefined()
      expect(todo2.text).toBe('get it done')

  describe 'update', ->
    it 'returns a valid user', ->
      todo1 = todosCrudService.create({text: 'get it done'})
      todo1.text = 'do it'

      todo2 = todosCrudService.update(todo1)
      expect(todo2.text).toBe('do it')

  describe 'destroy', ->
    it 'destroys', ->
      todo1 = todosCrudService.create({text: 'get it done'})
      expect(todosCrudService.count()).toBe 1

      todo2 = todosCrudService.destroy(todo1)
      expect(todosCrudService.count()).toBe 0
      expect(todo2.text).toBe('get it done')




describe 'service: todosService', ->
  todosService = undefined

  beforeEach module('todosModule')

  beforeEach inject(($injector) ->
    todosService = $injector.get('todosService')
  )

  describe 'getTodos', ->
    it 'returns defined', ->
      expect(todosService.getTodos()).toBeDefined()

  describe 'count', ->
    it 'returns 0', ->
      expect(todosService.count()).toBe 0

  describe 'retrieveAll', ->
    it 'returns defined', ->
      todos = todosService.retrieveAll()
      expect(todos).toBeDefined()
