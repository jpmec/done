package com.jpmec.done

import grails.converters.JSON
import grails.plugins.springsecurity.Secured




class TaskController {

    def beforeInterceptor = {
        log.trace("Executing action $actionName with params $params")
    }

//    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def show = {
      if (!params.uuid) {
        render(status:400, text:'{}')
        return
      }

      def instance = Task.findByUuid(params.uuid)

      if (!instance) {
        render(status:404, text:'{}')
        return
      }

      render instance as JSON
    }

//    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def update = {
      if (!params.uuid) {
        render(status:400, text:'{}')
        return
      }

      def instance = Task.findByUuid(params.uuid)
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
      def new_instance = new Task(params)

      // if a uuid was passed in,
      // then make a copy and add given params
      if (new_instance.uuid) {
        def existing_instance = Task.findByUuid(new_instance.uuid)
        if (existing_instance) {
          new_instance = new Task(existing_instance.properties + params)
        }
        new_instance.uuid = null
      }

      if (!new_instance.save()) {
        render(status: 500, text:'{}')
        return
      }

      render new_instance as JSON
    }

//    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def delete = {

      if (!params.uuid) {
        render(status:400, text:'{}')
        return
      }

      def instance = Task.findByUuid(params.uuid)
      if (!instance) {
        render(status:404, text:'{}')
        return
      }

      def copy = new Task(instance.properties)
      instance.delete()
      render copy as JSON
    }

    def afterInterceptor = { model ->
        log.trace("Executed $actionName which resulted in model: $model")
    }
}
