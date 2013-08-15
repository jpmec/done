### jshint -W093 ###

'use strict'

userModule = angular.module 'userModule',
['ngCookies', 'obscureLocalStorageModule']


userModule.factory 'userFactory', ->
  create: (name, password) ->
    publicId = CryptoJS.SHA1(name).toString()
    privateId = CryptoJS.SHA256(name + password).toString()
    user =
      id: privateId
      name: name
      publicId: publicId
      privateId: privateId
      email: ''
      preferences:
        emailIsPrivate: false
        useGravatar: true
        autoSignin: false

    user




userModule.service 'userCrudService',
['userFactory', 'obscureLocalStorageService',
(userFactory, obscureLocalStorageService) ->
  @prefix = 'user.'

  @keyFor = (obj) ->
    return null unless obj
    return null unless obj.id
    @prefix + obj.id

  @create = (obj) ->
    item = _.extend(userFactory.create(obj.name, obj.password), obj)
    item = _.omit(item, 'password')
    obscureLocalStorageService.add @keyFor(item), item
    item

  @retrieve = (obj) ->
    k = @keyFor(obj)
    return null  unless k
    item = obscureLocalStorageService.get(k)
    item

  @update = (obj) ->
    return null unless obj
    item = obscureLocalStorageService.get(@keyFor(obj))
    return null unless item
    item = _.extend(item, obj)
    obscureLocalStorageService.add @keyFor(item), item
    item

  @destroy = (obj) ->
    return null unless obj
    item = obscureLocalStorageService.get(@keyFor(obj))
    obscureLocalStorageService.remove @keyFor(obj)
    item

  @count = ->
    obscureLocalStorageService.keys().length

  @empty = ->
    obscureLocalStorageService.clearAll()
]




userModule.service 'userService',
['userFactory', 'userCrudService',
(userFactory, userCrudService) ->
  @retrieve = (obj) ->
    userCrudService.retrieve(obj)
]




userModule.service 'activeUserService',
['userFactory', 'userCrudService',
(userFactory, userCrudService) ->
  @user = null
  @getUser = ->
    @user

  @setUser = (user) ->
    @user = user

  @userIsNull = ->
    @user is null

  @name = ->
    if @user and @user.name
      @user.name
    else
      ''

  @id = ->
    if @user
      @user.id
    else
      ''

  @publicId = ->
    if @user
      @user.publicId
    else
      ''

  @email = ->
    if @user
      @user.email
    else
      ''

  @preferences = ->
    if @user
      @user.preferences
    else
      ''

  @emailIsPrivate = ->
    if @user
      @user.preferences.emailIsPrivate
    else
      true

  @useGravatar = ->
    if @user
      @user.preferences.useGravatar
    else
      true

  @signin = (name, password) ->
    user = userFactory.create(name, password)
    @user = userCrudService.retrieve(user)
    @user = userCrudService.create(user)  unless @user
    @user

  @signinById = (id) ->
    @user = userCrudService.retrieve({id: id})
    @user

  @signout = ->
    @user = null
    @user

  @saveUser = ->
    userCrudService.update @user

  @setAutoSignin = (automatic) ->
    return if not @user
    @user.preferences.autoSignin = automatic
]




userModule.directive 'activeUserName', ->
  restrict: 'A'
  templateUrl: 'user/active_user_name.html'

userModule.directive 'activeUserGravatar', ->
  restrict: 'A'
  templateUrl: 'user/active_user_gravatar.html'

userModule.directive 'activeUserNavbar', ->
  restrict: 'A'
  templateUrl: 'user/active_user_navbar.html'

userModule.directive 'activeUserNavbarOptions', ->
  restrict: 'A'
  templateUrl: 'user/active_user_navbar_options.html'

userModule.directive 'activeUserNavbarSignout', ->
  restrict: 'A'
  templateUrl: 'user/active_user_navbar_signout.html'




userModule.directive 'userProfile', ->
  restrict: 'A'
  templateUrl: 'user/user_profile.html'

userModule.directive 'userName', ['userService', (userService) ->
  restrict: 'A'
  templateUrl: 'user/user_name.html'
  link: (scope, elm, attrs) ->
    scope.$watch attrs.id, (value) ->
      user = userService.retrieve({id: value})
      elm.append user.name
]


userModule.controller 'UserSigninCtrl',
['$scope', '$location', '$cookies', 'activeUserService',
($scope, $location, $cookies, activeUserService) ->

  $scope.userSigninName = ''
  $scope.userSigninPassword = ''

  $scope.init = ->
    activeUserService.signout() if $location.path() is '/signin'
    userId = $cookies.userId
    if userId
      user = activeUserService.signinById(userId)
      if user
        $scope.user = user
        $location.path('/todos')


  $scope.validNameAndPassword = ->
    return false if $scope.userSigninName.length is 0
    return false if $scope.userSigninPassword.length is 0
    true

  $scope.signin = (locationPath) ->
    return if $scope.userSigninName.length is 0
    return if $scope.userSigninPassword.length is 0
    user = activeUserService.signin($scope.userSigninName,
    $scope.userSigninPassword)

    if user
      $scope.user = user
      if $scope.userSigninAutomatic
        $cookies.userId = user.id
      else
        $cookies.userId = ''

      activeUserService.setAutoSignin($scope.userSigninAutomatic)

      $location.path locationPath  if locationPath

  $scope.signout = (locationPath) ->
    activeUserService.signout()
    $scope.user = null
    $location.path locationPath
]




userModule.controller 'ActiveUserSignoutCtrl',
['$scope', '$location', '$cookies', 'activeUserService',
($scope, $location, $cookies, activeUserService) ->

  $scope.init = ->
    activeUserService.signout() if $location.path() is '/signin'

  $scope.signout = (locationPath) ->
    activeUserService.signout()
    $scope.user = null
    $location.path locationPath
    $cookies.userId = ''
]






userModule.controller 'ActiveUserCtrl',
['$scope', '$location', 'activeUserService',
($scope, $location, activeUserService) ->

  $scope.init = ->
    activeUserService.signout() if $location.path() is '/signin'
#    id = $scope.publicId()
#    new QRCode(document.getElementById('qrcode'), id)  if id

  $scope.name = ->
    activeUserService.name()

  $scope.id = ->
    activeUserService.id()

  $scope.publicId = ->
    activeUserService.publicId()

  $scope.email = ->
    activeUserService.email()

  $scope.emailIsPrivate = ->
    activeUserService.emailIsPrivate()

  $scope.emailIsEmpty = ->
    activeUserService.email().length is 0

  $scope.useGravatar = ->
    activeUserService.useGravatar()

  $scope.userIsNull = ->
    activeUserService.userIsNull()

  $scope.showUser = ->
    $location.path '/user'

  $scope.editUser = ->
    $location.path '/user/edit'

  $scope.user = ->
    user = activeUserService.getUser()
    user

  $scope.prettyPrintUser = ->
    user = activeUserService.getUser()
    JSON.stringify(user, null, '\t')
]




userModule.controller 'UserCtrl',
['$scope', '$location', 'userService',
($scope, $location, userService) ->

  $scope.init = ->
    return

  $scope.showUser = (id) ->
    $location.path '/user/' + id

  $scope.user = (id) ->
    user = userService.getUser(id)
    user
]




userModule.controller 'UserEditCtrl',
['$scope', '$location', 'activeUserService',
($scope, $location, activeUserService) ->

  $scope.init = ->
    $scope.user = activeUserService.getUser()

  $scope.save = ->
    activeUserService.setUser $scope.user
    activeUserService.saveUser()
    $location.path '/user'

  $scope.cancel = ->
    $scope.init()
]
