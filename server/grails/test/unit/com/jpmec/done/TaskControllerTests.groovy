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


    void testShowForInvalidParamsIdWithSomeTasks() {

       // setup
       Task.registerObjectMarshaller()

       def task1 = new Task(text: "do it one",
                           created_by: "you")

       assert task1.save(flush: true);

       def task2 = new Task(text: "do it two",
                           created_by: "me")

       assert task2.save(flush: true);

       controller.params.id = 47

       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() == 0
    }

    void testShowForValidParamsIdWithSomeTasks() {

       // setup
       Task.registerObjectMarshaller()

       def task1 = new Task(text: "do it one",
                           created_by: "you")

       assert task1.save(flush: true);

       def task2 = new Task(text: "do it two",
                           created_by: "me")

       assert task2.save(flush: true);

       controller.params.id = 1

       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() != 0
    }




    void testUpdateForValidParamsIdWithSomeTasks() {

       // setup
       Task.registerObjectMarshaller()

       def task1 = new Task(text: "do it one",
                           created_by: "you")

       assert task1.save(flush: true);

       def task2 = new Task(text: "do it two",
                           created_by: "me")

       assert task2.save(flush: true);

       controller.params.id = 1

       // exercise
       controller.update()

       // verify
       //def responseJson = JSON.parse(response.text)
       //assert responseJson.length() != 0
       assert response.text == "update"
    }


    void testSaveForValidParamsIdWithSomeTasks() {

       // setup
       Task.registerObjectMarshaller()

       def task1 = new Task(text: "do it one",
                           created_by: "you")

       assert task1.save(flush: true);

       def task2 = new Task(text: "do it two",
                           created_by: "me")

       assert task2.save(flush: true);

       controller.params.id = 1

       // exercise
       controller.save()

       // verify
       //def responseJson = JSON.parse(response.text)
       //assert responseJson.length() != 0
       assert response.text == "save"
    }


    void testDeleteForValidParamsIdWithSomeTasks() {

       // setup
       Task.registerObjectMarshaller()

       def task1 = new Task(text: "do it one",
                           created_by: "you")

       assert task1.save(flush: true);

       def task2 = new Task(text: "do it two",
                           created_by: "me")

       assert task2.save(flush: true);

       controller.params.id = 1

       // exercise
       controller.delete()

       // verify
       //def responseJson = JSON.parse(response.text)
       //assert responseJson.length() != 0
       assert response.text == "delete"
    }
}
