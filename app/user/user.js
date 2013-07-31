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
          privateId: private_id,
          email: '',
          preferences: {
            emailIsPrivate: false,
            useGravatar: true
          }
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

    this.setUser = function(user) {
      this.user = user;
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

    this.email = function() {
      if (this.user) {
        return this.user.email;
      }
      else {
        return '';
      }
    };

    this.preferences = function() {
      if (this.user) {
        return this.user.preferences;
      }
      else {
        return '';
      }
    };

    this.emailIsPrivate = function() {
      if (this.user) {
        return this.user.preferences.emailIsPrivate;
      }
      else {
        return true;
      }
    }

    this.useGravatar = function() {
      if (this.user) {
        return this.user.preferences.useGravatar;
      }
      else {
        return true;
      }
    }

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

        $scope.user = user;

        if (location_path) {
          $location.path(location_path);
        }

        $scope.userName = '';
        $scope.userPassword = '';
      }
    };

    $scope.signout = function(location_path) {
      userService.signout();

      $scope.user = null;
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

    $scope.email = function() {
      return userService.email();
    }

    $scope.emailIsPrivate = function() {
      return userService.emailIsPrivate();
    }

    $scope.emailIsEmpty = function() {
      return userService.email.length == 0;
    }

    $scope.useGravatar = function() {
      return userService.useGravatar();
    }

    $scope.userIsNull = function() {
      return userService.userIsNull();
    };

    $scope.showUser = function() {
      $location.path("/user");
    };

    $scope.editUser = function() {
      $location.path("/user/preferences");
    };

    $scope.user = function() {
      var user = userService.getUser();
      return user;
    };

  }])
  .controller('UserEditCtrl', ['$scope', '$location', 'userService', function($scope, $location, userService){

    $scope.init = function() {
      $scope.user = userService.getUser();
    };

    $scope.save = function() {
      userService.setUser($scope.user);
      $location.path("/user");
    };

    $scope.cancel = function() {
      $scope.init();
    };

  }]);
