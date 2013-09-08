package com.jpmec.done


import grails.plugin.spock.IntegrationSpec




class TaskSpec extends IntegrationSpec {

	def setup() {
	}

	def cleanup() {
	}


	void "test show"() {

    given:
      def controller = new TaskController()

    when:
      controller.show()

    then:
      "{}" == controller.response.contentAsString
	}


	void "test update"() {

    given:
      def controller = new TaskController()

    when:
      controller.update()

    then:
      "{}" == controller.response.contentAsString
	}


	void "test save"() {

    given:
      def controller = new TaskController()

    when:
      controller.save()

    then:
      0 <= controller.response.contentAsString.length()
	}


	void "test delete"() {

    given:
      def controller = new TaskController()

    when:
      controller.delete()

    then:
      "{}" == controller.response.contentAsString
	}
}
