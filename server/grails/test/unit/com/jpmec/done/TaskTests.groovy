package com.jpmec.done



import grails.test.mixin.*
import org.junit.*

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Task)
class TaskTests {

    void testDefaultConstructor() {
       Task.registerObjectMarshaller()

       def instance = new Task();

       assert instance.text == ""
    }

    void testConstructor() {
       Task.registerObjectMarshaller()

       def instance = new Task(text: "do something");

       assert instance.text == "do something"
    }
}
