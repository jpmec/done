package com.jpmec.done



import grails.test.mixin.*
import org.junit.*

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Task)
class TaskTests {

    void testUuid() {
      def instance1 = new Task()

      assert instance1.save(flush:true)

      instance1.text = "hello"

      assert instance1.save(flush:true)

      instance1.text = "goodbye"

      assert instance1.save(flush:true)

      def instance2 = Task.findByUuid(instance1.uuid)

      assert instance2

      instance2.text = "you too"
      instance2.save(flush:true)
    }

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
