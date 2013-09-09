package com.jpmec.done


import groovyx.net.http.HTTPBuilder
import static groovyx.net.http.ContentType.URLENC

import grails.plugin.spock.IntegrationSpec




class LoginServiceIntegrationSpec extends IntegrationSpec {

	void "should allow AJAX login"() {

    //given:
    //  def url = 'http://localhost:8080/done/'
    //
    //  def http = new HTTPBuilder(url)
    //  def postBody = [j_username:'user', j_password:'password']
    //  def response = null
    //
    //when:
    //  http.post(path: "j_spring_security_check", body: postBody, requestContentType: URLENC) { r ->
    //    response = r
    //
    //    log.trace response
    //  }
    //
    //then:
    //  304 == response.statusLine.statusCode

    given:
      request.method = "POST"
      request.makeAjaxRequest()

    when:

    then:

	}

}
