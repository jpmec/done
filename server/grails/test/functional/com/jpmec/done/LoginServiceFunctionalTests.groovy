package com.jpmec.done

import grails.converters.JSON
import com.grailsrocks.functionaltest.*

class LoginServiceFunctionalTests extends BrowserTestCase {

    void testAjaxLogin() {

        def url = '/j_spring_security_check'

        post(url) {
          headers['Accept'] = 'application/json'
          headers['Content-type'] = 'application/x-www-form-urlencoded'
          headers['Connection'] = 'keep-alive'
          body {
          """
          j_username=user&j_password=password
          """
          }
        }

        assertStatus 302
    }

}
