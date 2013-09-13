### jshint -W093 ###
### jshint -W106 ###

'use strict'




springSecurityModule = angular.module 'springSecurityModule',
[]




springSecurityModule.service 'springSecurityService',
['$http',
($http) ->

  # Override $http service's default transformRequest
  @transformRequest = (data) ->

    ###
    The workhorse; converts an object to x-www-form-urlencoded serialization.
    @param {Object} obj
    @return {String}
    ###
    param = (obj) ->
      query = ''
      name = undefined
      value = undefined
      fullSubName = undefined
      subName = undefined
      subValue = undefined
      innerObj = undefined
      i = undefined
      for name of obj
        value = obj[name]
        if value instanceof Array
          i = 0
          while i < value.length
            subValue = value[i]
            fullSubName = name + '[' + i + ']'
            innerObj = {}
            innerObj[fullSubName] = subValue
            query += param(innerObj) + '&'
            ++i
        else if value instanceof Object
          for subName of value
            subValue = value[subName]
            fullSubName = name + '[' + subName + ']'
            innerObj = {}
            innerObj[fullSubName] = subValue
            query += param(innerObj) + '&'
        else query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&'  if value isnt `undefined` and value isnt null
      (if query.length then query.substr(0, query.length - 1) else query)

    (if angular.isObject(data) and String(data) isnt '[object File]' then param(data) else data)


  @config =
    transformRequest: @transformRequest
    headers:
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'


  @check = (username, password, rememberMe, onSuccess, onError) ->

    obj =
      j_username: username
      j_password: password

    if (rememberMe)
      obj._spring_security_remember_me = true

    $http.post('/j_spring_security_check', obj, @config)
    .success((data, status, headers, config) ->

      # Spring Security will return 200 on success or failure.
      # Must look at data object to see if check succeeded.
      if data.success
        onSuccess(data, status, headers, config)

      else if data.error
        onError(data, status, headers, config)
    )
    .error((data, status, headers, config) ->
      onError(data, status, headers, config)
    )
]
