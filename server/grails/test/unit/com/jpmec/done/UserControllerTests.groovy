package com.jpmec.done

import grails.converters.JSON
import grails.test.mixin.*
import org.junit.*

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(UserController)
@Mock([User, UserPreferences, UserProfile, SecureUser, SecureRole])
class UserControllerTests {

    void testShow() {

       // setup
       def springSecurityService = new Object()
       springSecurityService.metaClass.encodePassword = {String password -> "ENCODED_PASSWORD"}

       User.registerObjectMarshaller()
       UserPreferences.registerObjectMarshaller()

       def user = new User(username: 'user',
                           password: 'password',
                           preferences: new UserPreferences(),
                           profile: new UserProfile(email: 'my@email.com'),
                           enabled: true)

       user.springSecurityService = springSecurityService
       assert user.save(flush: true)

       controller.params.id = user.id

       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
//       assert responseJson.get('email') == 'my@email.com'
    }


    void testShowForInvalidParamsId() {

       // setup
       User.registerObjectMarshaller()
       UserPreferences.registerObjectMarshaller()

       controller.params.id = 47

       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() == 0
    }


    void testShowForNullParamsId() {

       // setup
       User.registerObjectMarshaller()
       UserPreferences.registerObjectMarshaller()

       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() == 0
    }
}
