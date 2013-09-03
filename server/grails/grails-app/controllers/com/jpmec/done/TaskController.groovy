package com.jpmec.done

import grails.converters.JSON
import grails.plugins.springsecurity.Secured




class TaskController {

    def beforeInterceptor = {
        log.trace("Executing action $actionName with params $params")
    }

//    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def show = {

      if (params.id) {
        def task = Task.get(params.id)
        if (task) {
          render task as JSON
        }
        else {
          render "{}"
        }
      }
      else {
        render "{}"
      }
    }

//    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def update = {
      log.trace "TaskController.update"
      render "update"
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

      if (new_instance.save()) {
        render new_instance as JSON
      }
      else {
        // return an empty object if there was an error
        render "{}"
      }
    }

//    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def delete = {
      log.trace "TaskController.delete"
      render "delete"
    }

    def afterInterceptor = { model ->
        log.trace("Executed $actionName which resulted in model: $model")
    }
}
