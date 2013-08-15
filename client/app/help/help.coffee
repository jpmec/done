### jshint -W093 ###

'use strict'


helpModule = angular.module 'helpModule',
['userModule', 'todosModule', 'ui.bootstrap']




helpModule.service 'helpService',
['$dialog', '$location',
($dialog, $location) ->

  @show = (topic) ->
    unless topic
      path = $location.path()
      topic = path.substr(1, path.length)
      topic = topic.replace('/', '_')

    item = url: 'help/topics/help_' + topic + '.html'

    opts =
      backdrop: true
      keyboard: true
      backdropClick: true
      templateUrl: 'help/help_dialog.html'
      controller: 'helpDialogCtrl'
      resolve:
        item: ->
          angular.copy item

    @dialog = $dialog.dialog(opts)
    @dialog.open()
]


helpModule.directive 'helpNavbar', ->
  restrict: 'A'
  templateUrl: 'help/help_navbar.html'




helpModule.controller 'helpCtrl',
['$scope', 'helpService',
($scope, helpService) ->

  $scope.init = ->
    #do nothing

  $scope.showHelp = (topic) ->
    helpService.show topic
]




# Helper controller to close the help dialog
helpModule.controller 'helpDialogCtrl',
['$scope', 'dialog', 'item', 'helpService',
($scope, dialog, item, helpService) ->

  $scope.item = item
  $scope.close = (result) ->
    dialog.close result

  $scope.showHelp = (topic) ->
    dialog.close null
    helpService.show topic
]
