package com.jpmec.done

import grails.converters.JSON




class TaskController {

    def beforeInterceptor = {
        log.trace("Executing action $actionName with params $params")
    }

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

    def update = {
      log.trace "TaskController.update"
    }

    def save = {
      log.trace "TaskController.save"
    }

    def delete = {
      log.trace "TaskController.delete"
    }

    def afterInterceptor = { model ->
        log.trace("Executed $actionName which resulted in model: $model")
    }
}
