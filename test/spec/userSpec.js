// Jasmine spec for userModule

'use strict';




describe('service: userService', function(){

  beforeEach(function() {
    module('userModule');
  });

});




describe('service: userCrudService', function(){

  var userCrudService;

  beforeEach(module('userModule'));
  beforeEach(inject(function($injector){
    userCrudService = $injector.get('userCrudService');
    userCrudService.empty();
  }));

  describe("create", function() {
    it("returns new user", function() {
      var user = userCrudService.create({name: "ali", password: "seseme"});

      expect(user.id).toBeDefined();
      expect(user.name).toBe("ali");

      expect(userCrudService.count()).toBe(1);
    });
  });

  describe("retrieve", function() {
    it("returns null for null", function() {
      var user = userCrudService.retrieve(null);
      expect(user).toBe(null);
    });

    it("returns null if id doesn't exist", function() {
      var user = userCrudService.retrieve({id: 1});
      expect(user).toBe(null);
    });

    it("returns valid user", function() {
      var user1 = userCrudService.create({name: "ali", password: "seseme"});

      var user2 = userCrudService.retrieve({id: user1.id});

      expect(user2.id).toBeDefined();
      expect(user2.name).toBe('ali');
    });
  });

  describe("update", function() {
    it("returns valid user", function() {
      var user1 = userCrudService.create({name: "ali", password: "seseme"});
      user1.name = 'baba';

      var user2 = userCrudService.update(user1);
      expect(user2.name).toBe('baba');
    });
  });

  describe("destroy", function() {
    it("returns valid user", function() {
      var user1 = userCrudService.create({name: "ali", password: "seseme"});
      expect(userCrudService.count()).toBe(1);

      userCrudService.destroy({id: user1.id});

      expect(userCrudService.count()).toBe(0);
    });
  });

  describe("count", function() {
    it("returns 0", function() {
      expect(userCrudService.count()).toBe(0);
    })
  });

  describe("empty", function() {
    it("emptys the crud service", function() {
      userCrudService.empty();
      expect(userCrudService.count()).toBe(0);
    })
  });
});



//describe('controller: UserCtrl', function () {
//
//  // load the controller's module
//  beforeEach(function() {
//    module('userModule');
//  });
//
//  // Initialize the controller and a mock scope
//  beforeEach(inject(function ($controller, $rootScope, $location, userService) {
//    this.scope = $rootScope.$new();
//    $controller('UserCtrl', {
//      $scope: this.scope,
//      $location: $location,
//      userService: userService
//    });
//  }));
//
//  describe("userIsNull", function() {
//    it("returns true for null user", function() {
//      expect(this.scope.userIsNull()).toBe(true);
//    });
//  });
//
//  describe("signin", function() {
//    it("should allow signin", function() {
//      this.scope.userName = 'a';
//      this.scope.userPassword = 'b';
//      this.scope.signin("/");
//      expect(this.scope.userIsNull()).toBe(false);
//    });
//
//    it("should allow no location change", function() {
//      this.scope.userName = 'a';
//      this.scope.userPassword = 'b';
//      this.scope.signin();
//      expect(this.scope.userIsNull()).toBe(false);
//    });
//  });
//
//  describe("signout", function() {
//    it("should allow signout", function() {
//      this.scope.userName = 'a';
//      this.scope.userPassword = 'b';
//      this.scope.signin("/");
//      this.scope.signout("/");
//      expect(this.scope.userIsNull()).toBe(true);
//    });
//  });
//
//  describe("name", function() {
//    it("should allow signout", function() {
//      this.scope.userName = 'a';
//      this.scope.userPassword = 'b';
//      this.scope.signin("/");
//      expect(this.scope.name()).toBe('a');
//    });
//  });
//
//});
