package com.jpmec.done

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(TaskController)
class TaskControllerSpec extends Specification {

	def setup() {
    Task.registerObjectMarshaller()
	}

	def cleanup() {
	}

	void "test show for null params uuid with no objects"() {

    // exercise
    controller.show()

    // verify
    def responseJson = JSON.parse(response.text)
    assert responseJson.length() == 0
	}
}
