package com.jpmec.done



import grails.test.mixin.*
import org.junit.*

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(UserPreferences)
class UserPreferencesTests {

    void testConstructor() {

       def instance = new UserPreferences()

       assert instance.emailIsPrivate == true
       assert instance.useGravatar == false
    }
}
