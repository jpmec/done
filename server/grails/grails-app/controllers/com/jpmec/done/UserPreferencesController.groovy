package com.jpmec.done

import grails.plugins.springsecurity.Secured




class UserPreferencesController {

    @Secured(['ROLE_USER', 'IS_AUTHENTICATED_REMEMBERED'])
    def show = {
    }

}
