### jshint -W015 ###
### jshint -W018 ###
### jshint -W093 ###
### jshint -W098 ###

'use strict'

userModule = angular.module 'userModule',
['ngCookies', 'obscureLocalStorageModule']





userModule.factory 'userFactory', ->
  create: (username, password) ->
#    publicId = CryptoJS.SHA1(name).toString()
#    privateId = CryptoJS.SHA256(name + password).toString()
    user =
      name: username
#      publicId: publicId
#      privateId: privateId
      preferences:
        emailIsPrivate: false
        useGravatar: true
        rememberMe: false
      profile:
        uuid: ''
        name: ''
        email: ''
        websiteUrl: ''

    user



userModule.service 'userApiService',
[ '$http'
($http) ->

  @url = '/api/user/'

  @get = (uuid, onSuccess, onError) ->

    $http.get(@url + uuid)
    .success((data, status, headers, config) ->
      onSuccess(data) if onSuccess
    )
    .error((data, status, headers, config) ->
      onError(data) if onError
    )


  @put = (user, onSuccess, onError) ->

    $http.put(@url, user)
    .success((data, status, headers, config) ->
      onSuccess(data) if onSuccess
    )
    .error((data, status, headers, config) ->
      onError(data) if onError
    )
]




userModule.service 'userCrudService',
['userFactory', 'obscureLocalStorageService', 'userApiService',
(userFactory, obscureLocalStorageService, userApiService) ->
  @prefix = 'user.'

  @keyFor = (user) ->
    return null unless user
    return null unless user.profile.uuid
    @prefix + user.profile.uuid

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

  @update = (user) ->
    return null unless user

    userApiService.put(user)

    item = obscureLocalStorageService.get(@keyFor(user))
    return null unless item
    item = _.extend(item, user)
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




userModule.service 'userSignupService',
['userFactory', 'userCrudService', '$http'
(userFactory, userCrudService, $http) ->
  @signup = (obj) ->

    $http.post('http://localhost:8080/done/api/user', obj)
    .success((data, status, headers, config) ->
      console.log('userSignupService.signup success')
      console.log(data)
      console.log(status)
      console.log(headers)
      console.log(config)
    )
    .error((data, status, headers, config) ->
      console.log('userSignupService.signup error')
      console.log(data)
      console.log(status)
      console.log(headers)
      console.log(config)
    )

]






userModule.service 'userSigninService',
['springSecurityService', 'userApiService', 'userFactory', 'activeUserService',
(springSecurityService, userApiService, userFactory, activeUserService) ->

  @signin = (username, password, rememberMe, onSuccess, onError) ->

    springSecurityService.check(username, password, rememberMe
    (data, status, headers, config) ->

      userApiService.get(data.uuid,
      (data) ->
        user = _.extend(userFactory.create(username, password), data)
        activeUserService.setUser(user)

        onSuccess(user) if onSuccess
      ,
      (data) ->
        onError() if onError
      )
    ,
    (data, status, headers, config) ->
      onError() if onError
    )
]



userModule.service 'userSignoutService',
['springSecurityService', 'activeUserService',
(springSecurityService, activeUserService) ->

  @signout = (onSuccess, onError) ->

    springSecurityService.logout( \
    (data, status, headers, config) ->
      activeUserService.signout()
      onSuccess() if onSuccess
    ,
    (data, status, headers, config) ->
      onError() if onError
    )
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
    if @user and @user.profile and @user.profile.name
      @user.profile.name
    else
      ''

  # TODO REMOVE AND USE UUID
  @id = ->
    @uuid()

  @uuid = ->
    if @user
      @user.profile.uuid
    else
      ''

  # TODO REMOVE AND USE UUID
  @publicId = ->
    if @user and @user.profile
      @user.profile.uuid
    else
      ''

  @email = ->
    if @user
      @user.profile.email
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

#  @signin = (name, password) ->
#    user = userFactory.create(name, password)
#    @user = userCrudService.retrieve(user)
#    @user = userCrudService.create(user)  unless @user
#    @user

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


userModule.directive 'userSignin', ->
  restrict: 'A'
  templateUrl: 'user/user_signin.html'


userModule.directive 'userSignup', ->
  restrict: 'A'
  templateUrl: 'user/user_signup.html'


userModule.directive 'userForgotPassword', ->
  restrict: 'A'
  templateUrl: 'user/user_forgot_password.html'


userModule.directive 'userProfile', ->
  restrict: 'A'
  templateUrl: 'user/user_profile.html'


userModule.directive 'userView', ->
  restrict: 'A'
  templateUrl: 'user/user_view.html'

userModule.directive 'userEdit', ->
  restrict: 'A'
  templateUrl: 'user/user_edit.html'


userModule.directive 'userName', ['userService', (userService) ->
  restrict: 'A'
  templateUrl: 'user/user_name.html'
  link: (scope, elm, attrs) ->
    scope.$watch attrs.id, (value) ->
      user = userService.retrieve({id: value})
      elm.append user.name
]




userModule.controller 'UserSigninCtrl',
['$scope', '$location', '$cookies', 'activeUserService', 'userSigninService'
($scope, $location, $cookies, activeUserService, userSigninService) ->

  $scope.userSigninName = ''
  $scope.userSigninPassword = ''
  $scope.userRememberMe = false
  $scope.error = ''

  $scope.init = ->
    activeUserService.signout() if $location.path() is '/signin'
    userId = $cookies.userId
    if userId
      user = activeUserService.signinById(userId)
      if user
        $scope.user = user
        $location.path('/tasks/list')

  $scope.reset = ->
    $scope.userSigninName = ''
    $scope.userSigninPassword = ''
    $scope.error = ''

  $scope.isError = ->
    $scope.error.length > 0

  $scope.isUsername = ->
    $scope.userSigninName.length > 0

  $scope.isPassword = ->
    $scope.userSigninPassword.length > 0

  $scope.isUsernameAndPassword = ->
    $scope.isUsername() and $scope.isPassword()

  $scope.validNameAndPassword = ->
    return false if $scope.userSigninName.length is 0
    return false if $scope.userSigninPassword.length is 0
    true

  $scope.signin = (locationPath) ->
    return if $scope.userSigninName.length is 0
    return if $scope.userSigninPassword.length is 0

    $scope.error = ''

    username = $scope.userSigninName
    password = $scope.userSigninPassword
    rememberMe = $scope.userRememberMe

    userSigninService.signin(username, password, rememberMe
    (user) ->

      if user
        $scope.user = user
        if $scope.userRememberMe
          $cookies.userId = user.profile.uuid
        else
          $cookies.userId = ''

        activeUserService.setAutoSignin($scope.userSigninAutomatic)

        $location.path locationPath  if locationPath
    ,
    () ->
      $scope.error = 'Sorry, a user with that name and password was not found.'
    )
]




userModule.controller 'ActiveUserSignoutCtrl',
['$scope', '$location', '$cookies', 'userSignoutService',
($scope, $location, $cookies, userSignoutService) ->

  $scope.init = ->
    userSignoutService.signout() if $location.path() is '/signin'

  $scope.signout = (locationPath) ->
    userSignoutService.signout()
    $scope.user = null
    $cookies.userId = ''
    $location.path locationPath
]




userModule.controller 'UserSignupCtrl',
['$scope', '$location', '$cookies', 'activeUserService', 'userSignupService'
($scope, $location, $cookies, activeUserService, userSignupService) ->

  $scope.userSignupName = ''
  $scope.userSignupEmail = ''
  $scope.userSignupPassword = ''
  $scope.userSignupPassword2 = ''
  $scope.userSignupPasswordStrengthPercent =
    value: 0
    type: 'danger'

  $scope.$watch('userSignupPassword', ->
    $scope.userSignupPasswordStrengthPercent =
    $scope.calculatePasswordStrengthPercent($scope.userSignupPassword)
  )

  $scope.init = ->
    activeUserService.signout() if $location.path() is '/signup'

  $scope.valid = ->
    return false if $scope.userSignupName.length is 0
    return false if $scope.userSignupPassword.length is 0
    return false if $scope.userSignupPassword != $scope.userSignupPassword2
    return $scope.isStrongPassword()

  $scope.signup = (locationPath) ->
    return if !$scope.valid()

    console.log('you signed up!')

    obj =
      username: $scope.userSignupName
      email: $scope.userSignupEmail
      password: $scope.userSignupPassword

    userSignupService.signup(obj)
    $location.path locationPath


  $scope.reset = () ->
    $scope.userSignupName = ''
    $scope.userSignupEmail = ''
    $scope.userSignupPassword = ''


  $scope.isStrongPassword = () ->
    $scope.userSignupPasswordStrengthPercent.value > 75


  $scope.calculatePasswordStrengthPercent = (password) ->

    resultValue = 0

    if password
      resultValue += 10 if password.length > 0
      resultValue += 10 if password.length > 2
      resultValue += 10 if password.length > 4
      resultValue += 10 if password.length > 6
      resultValue += 10 if password.length > 8
      resultValue += 10 if password.length > 10
      resultValue += 10 if password.length > 12

      resultValue += 10 if /[A-Z]+/.test(password)
      resultValue += 10 if /[a-z]+/.test(password)
      resultValue += 10 if /[0-9]+/.test(password)

    resultValue = 100 if resultValue > 100

    resultType = switch
      when resultValue < 25 then 'danger'
      when resultValue < 50 then 'warning'
      when resultValue < 75 then 'info'
      else 'success'

    result =
      value: resultValue
      type: resultType

    result


]




userModule.controller 'UserForgotPasswordCtrl',
['$scope', '$location', 'activeUserService',
($scope, $location, activeUserService) ->

  $scope.userEmail = ''

  $scope.init = ->
    activeUserService.signout() if $location.path() is '/forgot_password'

  $scope.isValidEmail = ->
    return false if $scope.userEmail.length is 0
    true

  $scope.changePassword = () ->
    return if !$scope.isValidEmail
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
    activeUserService.uuid()

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

  $scope.userIsNotNull = ->
    !activeUserService.userIsNull()

  $scope.showUser = ->
    $location.path '/user/' + activeUserService.uuid()

  $scope.editUser = ->
    $location.path '/user/edit/' + activeUserService.uuid()

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

  $scope.showUser = (uuid) ->
    $location.path '/user/' + uuid

  $scope.user = (uuid) ->
    user = userService.getUser(uuid)
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
    $location.path '/user/' + $scope.user.profile.uuid

  $scope.cancel = ->
    $scope.init()
    $location.path '/user/' + $scope.user.profile.uuid
]
