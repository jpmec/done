'use strict';




angular.module('userModule', [])
  .service('userService', function() {
    this.user = null;

    this.userIsNull = function() {
      return (this.user === null);
    };

    this.name = function() {
      if (this.user && this.user.name) {
        return this.user.name;
      }
      else {
        return '';
      }
    };

    this.publicId = function() {
      if (this.user && this.user.publicId) {
        return this.user.publicId;
      }
      else {
        return '';
      }
    };

    this.signin = function(name, password) {

      var public_id = CryptoJS.SHA1(name).toString();
      var private_id = CryptoJS.SHA256(name + password).toString();

      this.user = {
          name: name,
          public_id: public_id,
          id: private_id
      };

      return this.user;
    };

    this.signout = function() {
      this.user = null;
      return this.user;
    };

  })
  .directive('userSignout', function () {
    return {
      restrict: 'A',
      templateUrl: 'user/user_signout.html'
    };
  })
  .directive('userNavbar', function () {
    return {
      restrict: 'A',
      templateUrl: 'user/user_navbar.html'
    };
  })
  .directive('userProfile', function () {
    return {
      restrict: 'A',
      templateUrl: 'user/user_profile.html'
    };
  })
  .controller('UserCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService){

    $scope.userName = '';
    $scope.userPassword = '';
    $scope.user = null;

    $scope.init = function() {
      $scope.user = null;
    };

    $scope.signin = function(location_path) {

      if ($scope.userName.length == 0) {
        return;
      }

      if ($scope.userPassword.length == 0) {
        return;
      }

      $scope.user = userService.signin($scope.userName, $scope.userPassword);
      if ($scope.user) {
        $scope.userName = '';
        $scope.userPassword = '';
      }

      $location.path(location_path);
    };

    $scope.signout = function(location_path) {
      $scope.user = userService.signout();
      $scope.userName = '';
      $scope.userPassword = '';

      $location.path(location_path);
    };

    $scope.name = function() {
      return userService.name();
    };

    $scope.publicId = function() {
      return userService.publicId();
    };

    $scope.userIsNull = function() {
      return userService.userIsNull();
    };

    $scope.showUser = function() {
      $location.path("/user");
    };

  }]);
