package com.jpmec.done



import grails.test.mixin.*
import org.junit.*

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(UserProfile)
class UserProfileTests {

    void testConstructor() {
       def instance = new UserProfile()

       assert instance.name == ""
       assert instance.email == ""
    }
}
