package com.jpmec.done


import grails.converters.JSON
import grails.plugins.springsecurity.Secured




class UserPreferencesController {

//    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def show = {
      if (!params.uuid) {
        render(status:400, text:'{}')
        return
      }

      def instance = UserProfile.findByUuid(params.uuid)
      if (!instance) {
        render(status:404, text:'{}')
        return
      }

      render instance.user.preferences as JSON
    }

//    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def update = {

      if (!params.uuid) {
        render(status:400, text:'{}')
        return
      }

      def instance = UserProfile.findByUuid(params.uuid)
      if (!instance) {
        render(status:404, text:'{}')
        return
      }

      instance.user.preferences.properties = params
      if (!instance.save()) {
        render(status:500, text:'{}')
        return
      }

      render instance.user.preferences as JSON
    }

//    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def save = {
      // invalid operation
      render(status: 400, text:'{}')
    }

//    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def delete = {
      // invalid operation
      render(status: 400, text:'{}')
    }
}
