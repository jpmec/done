(function() {
  describe('factory: todoFactory', function() {
    var todoFactory;
    todoFactory = void 0;
    beforeEach(module('todosModule'));
    beforeEach(inject(function($injector) {
      return todoFactory = $injector.get('todoFactory');
    }));
    return describe('create', function() {
      return it('creates a new todo', function() {
        var todo;
        todo = todoFactory.create();
        return expect(todo).toBeDefined();
      });
    });
  });

  describe('service: todosCrudService', function() {
    var todosCrudService;
    todosCrudService = void 0;
    beforeEach(module('todosModule'));
    beforeEach(inject(function($injector) {
      todosCrudService = $injector.get('todosCrudService');
      return todosCrudService.destroyAll();
    }));
    describe('count', function() {
      return it('returns 0', function() {
        return expect(todosCrudService.count()).toBe(0);
      });
    });
    describe('create', function() {
      return it('returns new todo', function() {
        var todo;
        todo = todosCrudService.create({
          text: 'get it done'
        });
        expect(todo).toBeDefined();
        return expect(todosCrudService.count()).toBe(1);
      });
    });
    describe('retrieve', function() {
      it('returns null for null', function() {
        var todo;
        todo = todosCrudService.retrieve(null);
        return expect(todo).toBe(null);
      });
      it('returns null if id doesnt exist', function() {
        var todo;
        return todo = todosCrudService.retrieve({
          id: 1
        });
      });
      return it('returns a valid item', function() {
        var todo1, todo2;
        todo1 = todosCrudService.create({
          text: 'get it done'
        });
        todo2 = todosCrudService.retrieve({
          id: todo1.id
        });
        expect(todo2).toBeDefined();
        return expect(todo2.text).toBe('get it done');
      });
    });
    describe('update', function() {
      return it('returns a valid user', function() {
        var todo1, todo2;
        todo1 = todosCrudService.create({
          text: 'get it done'
        });
        todo1.text = 'do it';
        todo2 = todosCrudService.update(todo1);
        return expect(todo2.text).toBe('do it');
      });
    });
    return describe('destroy', function() {
      return it('destroys', function() {
        var todo1, todo2;
        todo1 = todosCrudService.create({
          text: 'get it done'
        });
        expect(todosCrudService.count()).toBe(1);
        todo2 = todosCrudService.destroy(todo1);
        expect(todosCrudService.count()).toBe(0);
        return expect(todo2.text).toBe('get it done');
      });
    });
  });

  describe('service: todosService', function() {
    var todosService;
    todosService = void 0;
    beforeEach(module('todosModule'));
    beforeEach(inject(function($injector) {
      return todosService = $injector.get('todosService');
    }));
    describe('getTodos', function() {
      return it('returns defined', function() {
        return expect(todosService.getTodos()).toBeDefined();
      });
    });
    describe('count', function() {
      return it('returns 0', function() {
        return expect(todosService.count()).toBe(0);
      });
    });
    return describe('retrieveAll', function() {
      return it('returns defined', function() {
        var todos;
        todos = todosService.retrieveAll();
        return expect(todos).toBeDefined();
      });
    });
  });

}).call(this);
