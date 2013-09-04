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


    void testShowForNullParamsUuidWithNoObjects() {

       // setup
       Task.registerObjectMarshaller()

       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() == 0
    }


    void testShowForNullParamsUuidWithSomeTasks() {

       // setup
       Task.registerObjectMarshaller()

       def task1 = new Task(text: "do it one",
                           created_by: "you")

       assert task1.save(flush: true);

       def task2 = new Task(text: "do it two",
                           created_by: "me")

       assert task2.save(flush: true);

       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() == 0
    }


    void testShowForInvalidParamsUuidWithSomeTasks() {

       // setup
       Task.registerObjectMarshaller()

       def task1 = new Task(text: "do it one",
                           created_by: "you")

       assert task1.save(flush: true);

       def task2 = new Task(text: "do it two",
                           created_by: "me")

       assert task2.save(flush: true);

       controller.params.uuid = 47

       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() == 0
    }


    void testShowForValidParamsUuidWithSomeTasks() {

       // setup
       Task.registerObjectMarshaller()

       def task1 = new Task(text: "do it one",
                           created_by: "you")

       assert task1.save(flush: true);

       def task2 = new Task(text: "do it two",
                           created_by: "me")

       assert task2.save(flush: true);

       controller.params.uuid = task1.uuid

       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() != 0
    }


    void testUpdateForValidParamsUuidWithSomeTasks() {

       // setup
       Task.registerObjectMarshaller()

       def task1 = new Task(text: "do it one",
                           created_by: "you")

       assert task1.save(flush: true);

       def task2 = new Task(text: "do it two",
                           created_by: "me")

       assert task2.save(flush: true);

       controller.params.uuid = task2.uuid

       // exercise
       controller.update()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() != 0
       assert responseJson.get('uuid') == task2.uuid
       assert responseJson.get('text') == "do it two"
    }


    void testSaveForValidParamsUuidWithSomeTasks() {

       // setup
       Task.registerObjectMarshaller()

       def task1 = new Task(text: "do it one",
                           created_by: "you")

       assert task1.save(flush: true);

       def task2 = new Task(text: "do it two",
                           created_by: "me")

       assert task2.save(flush: true);

       controller.params.uuid = task2.uuid

       // exercise
       controller.save()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() != 0
       assert responseJson.get('uuid') != task2.uuid
       assert responseJson.get('text') == "do it two"
    }


    void testDeleteForValidParamsUuidWithSomeTasks() {

       // setup
       Task.registerObjectMarshaller()

       def task1 = new Task(text: "do it one",
                           created_by: "you")

       assert task1.save(flush: true);

       def task2 = new Task(text: "do it two",
                           created_by: "me")

       assert task2.save(flush: true);

       controller.params.uuid = task2.uuid

       // exercise
       controller.delete()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() != 0
       assert responseJson.get('uuid') == task2.uuid
       assert responseJson.get('text') == "do it two"
    }
}
