userModule = angular.module "userModule", ["obscureLocalStorageModule"]


userModule.factory "userFactory", ->
  create: (name, password) ->
    public_id = CryptoJS.SHA1(name).toString()
    private_id = CryptoJS.SHA256(name + password).toString()
    user =
      id: private_id
      name: name
      publicId: public_id
      privateId: private_id
      email: ""
      preferences:
        emailIsPrivate: false
        useGravatar: true

    user


userModule.service "userCrudService", (userFactory, obscureLocalStorageService) ->
  @prefix = "user."

  @keyFor = (obj) ->
    return null unless obj
    return null unless obj.id
    @prefix + obj.id

  @create = (obj) ->
    item = _.extend(userFactory.create(obj.name, obj.password), obj)
    item = _.omit(item, "password")
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


userModule.service "userService", (userFactory, userCrudService) ->
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
      ""

  @publicId = ->
    if @user
      @user.publicId
    else
      ""

  @email = ->
    if @user
      @user.email
    else
      ""

  @preferences = ->
    if @user
      @user.preferences
    else
      ""

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

  @signout = ->
    @user = null
    @user

  @saveUser = ->
    userCrudService.update @user


userModule.directive "userSignout", ->
  restrict: "A"
  templateUrl: "user/user_signout.html"

userModule.directive "userNavbar", ->
  restrict: "A"
  templateUrl: "user/user_navbar.html"

userModule.directive "userProfile", ->
  restrict: "A"
  templateUrl: "user/user_profile.html"


userModule.controller "UserCtrl", ["$scope", "$location", "userService", ($scope, $location, userService) ->
  $scope.userName = ""
  $scope.userPassword = ""
  $scope.init = ->
    userService.signout() if $location.path() is "/signin"
    id = $scope.publicId()
    new QRCode(document.getElementById("qrcode"), id)  if id

  $scope.validNameAndPassword = ->
    return false  if $scope.userName.length is 0
    return false  if $scope.userPassword.length is 0
    true

  $scope.signin = (location_path) ->
    return  if $scope.userName.length is 0
    return  if $scope.userPassword.length is 0
    user = userService.signin($scope.userName, $scope.userPassword)
    if user
      $scope.user = user
      $location.path location_path  if location_path
      $scope.userName = ""
      $scope.userPassword = ""

  $scope.signout = (location_path) ->
    userService.signout()
    $scope.user = null
    $scope.userName = ""
    $scope.userPassword = ""
    $location.path location_path

  $scope.name = ->
    userService.name()

  $scope.publicId = ->
    id = userService.publicId()
    id

  $scope.email = ->
    userService.email()

  $scope.emailIsPrivate = ->
    userService.emailIsPrivate()

  $scope.emailIsEmpty = ->
    userService.email().length is 0

  $scope.useGravatar = ->
    userService.useGravatar()

  $scope.userIsNull = ->
    userService.userIsNull()

  $scope.showUser = ->
    $location.path "/user"

  $scope.editUser = ->
    $location.path "/user/preferences"

  $scope.user = ->
    user = userService.getUser()
    user
]


userModule.controller "UserEditCtrl", ["$scope", "$location", "userService", ($scope, $location, userService) ->
  $scope.init = ->
    $scope.user = userService.getUser()

  $scope.save = ->
    userService.setUser $scope.user
    userService.saveUser()
    $location.path "/user"

  $scope.cancel = ->
    $scope.init()
]
