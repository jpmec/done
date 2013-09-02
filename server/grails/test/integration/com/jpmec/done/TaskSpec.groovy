package com.jpmec.done

import grails.plugin.spock.IntegrationSpec

class TaskSpec extends IntegrationSpec {

	def setup() {
	}

	def cleanup() {
	}

	void "test show"() {

    def controller = new TaskController()

    controller.show()
    assertEquals "{}", controller.response.contentAsString

	}

	void "test update"() {

    def controller = new TaskController()

    controller.update()
    assertEquals "update", controller.response.contentAsString
	}

	void "test save"() {

    def controller = new TaskController()

    controller.save()
    assertEquals "save", controller.response.contentAsString
	}

	void "test delete"() {

    def controller = new TaskController()

    controller.delete()
    assertEquals "delete", controller.response.contentAsString
	}
}
