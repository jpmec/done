package com.jpmec.done

import grails.converters.JSON




class UserController {

    def index() { render "Hello World from UserController" }


    def show() {
      def userInstance = User.get(params.id)

      render userInstance as JSON
    }
}
