package com.jpmec.done

import grails.converters.JSON
import grails.plugins.springsecurity.Secured




class TaskController {

    def beforeInterceptor = {
        log.trace("Executing action $actionName with params $params")
    }

    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def show = {

      log.trace "TaskController.show"

      if (params.id)
      {
        def task = Task.get(params.id)
        if (task)
        {
          render task as JSON
        }
        else
        {
          render "{}"
        }
      }
      else
      {
        render "{}"
      }
    }

    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def update = {
      log.trace "TaskController.update"
      render "update"
    }

    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def save = {
      log.trace "TaskController.save"
      render "save"
    }

    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def delete = {
      log.trace "TaskController.delete"
      render "delete"
    }

    def afterInterceptor = { model ->
        log.trace("Executed $actionName which resulted in model: $model")
    }
}
