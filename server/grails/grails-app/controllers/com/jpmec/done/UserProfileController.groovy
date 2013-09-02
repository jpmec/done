package com.jpmec.done


import grails.converters.JSON
import grails.plugins.springsecurity.Secured




class UserProfileController {

    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def show = {

      if (params.id)
      {
        def instance = UserProfile.get(params.id)
        if (instance) {
          render instance as JSON
        }
        else {
          render "{}"
        }
      }
      else
      {
        def list = UserProfile.list()
        render list as JSON
      }
    }
}
