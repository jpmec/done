package com.jpmec.done

import grails.converters.JSON
import grails.plugins.springsecurity.Secured



class UserController {


//    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def show = {
      if (!params.uuid) {
        render(status:400, text:'{}')
        return
      }

      def profile = UserProfile.findByUuid(params.uuid)
      if (!profile) {
        render(status:404, text:'{}')
        return
      }

      render profile.user as JSON
    }

//    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def update = {
      if (!params.uuid) {
        render(status:400, text:'{}')
        return
      }

      def instance = User.findByUuid(params.uuid)
      if (!instance) {
        render(status:404, text:'{}')
        return
      }

      instance.properties = params
      if (!instance.save()) {
        render(status:500, text:'{}')
        return
      }

      render instance as JSON
    }

//    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def save = {
      def new_instance = User.createNewUser(params)

      if (!new_instance.validate()) {
        render(status: 400, text:'{}')
        return
      }

      if (!new_instance.save()) {
        render(status: 500, text:'{}')
        return
      }

      render new_instance as JSON
    }

//    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def delete = {

      if (!params.username || !params.password) {
        render(status:400, text:'{}')
        return
      }

      def instance = User.findByUsername(params.username)
      if (!instance) {
        render(status:404, text:'{}')
        return
      }

      if (instance.password != params.password) {
        render(status:400, text:'{}')
        return
      }

      def copy = new User(instance.properties)
      instance.delete()
      render copy as JSON
    }
}
