'use strict';




angular.module('helpModule', ['userModule', 'todosModule', 'ui.bootstrap'])
  .service('helpService', ['$dialog', '$location', function($dialog, $location) {

    this.show = function(topic) {

      if (!topic) {
        var path = $location.path();
        topic = path.substr(1, path.length);
        topic = topic.replace('/', '_');
      }

      var item = {
        url: 'help/topics/help_' + topic + '.html'
      };

      var opts = {
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        templateUrl: 'help/help_dialog.html',
        controller: 'helpDialogCtrl',
        resolve: {item: function() { return angular.copy(item) } }
      };

      this.dialog = $dialog.dialog(opts);
      this.dialog.open().then(function(result){
          // do nothing
        });
    };
  }])

  .directive('helpNavbar', function () {
    return {
      restrict: 'A',
      templateUrl: 'help/help_navbar.html'
    };
  })

  .controller('helpCtrl', ['$scope', 'helpService', function($scope, helpService){
    $scope.init = function() {
    }

    $scope.showHelp = function(topic) {
      helpService.show(topic);
    };
  }])


// Helper controller to close the help dialog
function helpDialogCtrl($scope, dialog, item, helpService){
  $scope.item = item;

  $scope.close = function(result) {
    dialog.close(result);
  };

  $scope.showHelp = function(topic) {
    dialog.close(null);
    helpService.show(topic);
  };
}
