// Jasmine spec for userModule

'use strict';


describe('service: userService', function(){

  beforeEach(function() {
    module('userModule');
  });

});




describe('controller: UserCtrl', function () {

  // load the controller's module
  beforeEach(function() {
    module('userModule');
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location, userService) {
    this.scope = $rootScope.$new();
    $controller('UserCtrl', {
      $scope: this.scope,
      $location: $location,
      userService: userService
    });
  }));

  describe("userIsNull", function() {
    it("returns true for null user", function() {
      expect(this.scope.userIsNull()).toBe(true);
    });
  });

  describe("signin", function() {
    it("should allow signin", function() {
      this.scope.userName = 'a';
      this.scope.userPassword = 'b';
      this.scope.signin("/");
      expect(this.scope.userIsNull()).toBe(false);
    });

    it("should allow no location change", function() {
      this.scope.userName = 'a';
      this.scope.userPassword = 'b';
      this.scope.signin();
      expect(this.scope.userIsNull()).toBe(false);
    });
  });

  describe("signout", function() {
    it("should allow signout", function() {
      this.scope.userName = 'a';
      this.scope.userPassword = 'b';
      this.scope.signin("/");
      this.scope.signout("/");
      expect(this.scope.userIsNull()).toBe(true);
    });
  });

  describe("name", function() {
    it("should allow signout", function() {
      this.scope.userName = 'a';
      this.scope.userPassword = 'b';
      this.scope.signin("/");
      expect(this.scope.name()).toBe('a');
    });
  });

});











