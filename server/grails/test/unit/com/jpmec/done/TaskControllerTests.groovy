package com.jpmec.done


import grails.converters.JSON
import grails.test.mixin.*
import org.junit.*

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(TaskController)
@Mock(Task)
class TaskControllerTests {

    void testShowForNullParamsIdWithNoObjects() {

       // setup
       Task.registerObjectMarshaller()

       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() == 0
    }

    void testShowForNullParamsIdWithSomeTasks() {

       // setup
       Task.registerObjectMarshaller()

       def task = new Task(text: "do it",
                           created_by: "me")

       task.save(flush: true);

       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() == 0
    }
}
