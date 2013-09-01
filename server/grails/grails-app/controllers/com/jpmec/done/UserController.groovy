package com.jpmec.done

import grails.converters.JSON




class UserController {

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
