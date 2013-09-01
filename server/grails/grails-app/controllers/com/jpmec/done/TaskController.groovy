package com.jpmec.done

import grails.converters.JSON




class TaskController {

    def show() {

      if (params.id)
      {
        def task = Task.get(params.id)
        render task as JSON
      }
      else
      {
        render "{}"
      }
    }
}
