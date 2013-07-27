'use strict';




angular.module('helpModule', ['userModule', 'todosModule', 'ui.bootstrap'])
  .directive('helpNavbar', function () {
    return {
      restrict: 'A',
      templateUrl: 'help/help_navbar.html'
    };
  })
  .controller('helpCtrl', ['$scope', '$dialog', function($scope, $dialog){
    $scope.init = function() {
    }

    $scope.showHelp = function() {

      $scope.opts = {
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        templateUrl: 'help/help_about.html',
        controller: 'helpDialogCtrl'
      };

      var d = $dialog.dialog($scope.opts);
      d.open().then(function(result){
          // do nothing
        });
    };
  }])


// Helper controller to close the help dialog
function helpDialogCtrl($scope, dialog){
  $scope.close = function(result) {
    dialog.close(result);
  };
}
