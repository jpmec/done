package com.jpmec.done


import grails.converters.JSON




class UserProfileController {

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
        render UserProfile.list() as JSON
      }
    }
}
