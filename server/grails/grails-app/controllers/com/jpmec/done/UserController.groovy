package com.jpmec.done

import grails.converters.JSON
import grails.plugins.springsecurity.Secured



class UserController {

    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def show = {

      if (params.id)
      {
        def userInstance = User.get(params.id)
        render userInstance as JSON
      }
      else
      {
        render "{}"
      }
    }
}
