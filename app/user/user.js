'use strict';




angular.module('userModule', [])
  .factory('userFactory', function() {
    return {
      create: function(name, password) {

        var public_id = CryptoJS.SHA1(name).toString();
        var private_id = CryptoJS.SHA256(name + password).toString();

        var user = {
          name: name,
          publicId: public_id,
          privateId: private_id
        };

        return user;
      }
    }
  })
  .service('userService', function(userFactory) {
    this.user = null;

    this.getUser = function() {
      return this.user;
    };

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
      if (this.user) {
        return this.user.publicId;
      }
      else {
        return '';
      }
    };

    this.signin = function(name, password) {

      this.user = userFactory.create(name, password);
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

    $scope.init = function() {
      if ($location.path() == '/signin') {
        userService.signout();
      }

      var id = $scope.publicId();

      if (id) {
        new QRCode(document.getElementById("qrcode"), id);
      }
    };

    $scope.validNameAndPassword = function() {
      if ($scope.userName.length == 0) {
        return false;
      }

      if ($scope.userPassword.length == 0) {
        return false;
      }

      return true;
    };

    $scope.signin = function(location_path) {

      if ($scope.userName.length == 0) {
        return;
      }

      if ($scope.userPassword.length == 0) {
        return;
      }

      var user = userService.signin($scope.userName, $scope.userPassword);
      if (user) {

        if (location_path) {
          $location.path(location_path);
        }

        $scope.userName = '';
        $scope.userPassword = '';
      }
    };

    $scope.signout = function(location_path) {
      userService.signout();

      $scope.userName = '';
      $scope.userPassword = '';

      $location.path(location_path);
    };

    $scope.name = function() {
      return userService.name();
    };

    $scope.publicId = function() {
      var id = userService.publicId();
      return id;

    };

    $scope.userIsNull = function() {
      return userService.userIsNull();
    };

    $scope.showUser = function() {
      $location.path("/user");
    };

    $scope.user = function() {
      var user = userService.getUser();
      return user;
    };

  }]);
