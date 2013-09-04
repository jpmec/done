package com.jpmec.done


import grails.converters.JSON
import grails.plugins.springsecurity.Secured




class UserProfileController {

    //@Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    //def show = {
    //
    //  if (params.id)
    //  {
    //    def instance = UserProfile.get(params.id)
    //    if (instance) {
    //      render instance as JSON
    //    }
    //    else {
    //      render "{}"
    //    }
    //  }
    //  else
    //  {
    //    def list = UserProfile.list()
    //    render list as JSON
    //  }
    //}




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

      render instance.user as JSON
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

      instance.properties = params
      if (!instance.save()) {
        render(status:500, text:'{}')
        return
      }

      render instance as JSON
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
