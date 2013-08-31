package com.jpmec.done



import grails.test.mixin.*
import org.junit.*

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(UserPreferencesController)
class UserPreferencesControllerTests {

    void testShow() {
      controller.show()
    }
}
