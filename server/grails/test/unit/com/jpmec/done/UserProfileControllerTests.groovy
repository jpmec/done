package com.jpmec.done


import grails.converters.JSON
import grails.test.mixin.*
import org.junit.*




/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(UserProfileController)
@Mock([User, UserPreferences, UserProfile, SecureUser, SecureRole])
class UserProfileControllerTests {

    void testShowForNullId() {

       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() == 0
    }


    void testShowForInvalidId() {

       controller.params.id = 47

       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() == 0
    }


    void testShowForValidId() {

       // setup
       User.registerObjectMarshaller()
       UserPreferences.registerObjectMarshaller()
       UserProfile.registerObjectMarshaller()

       def user = new User(username: 'user',
                           password: 'password',
                           preferences: new UserPreferences(),
                           profile: new UserProfile(email: 'my@email.com'),
                           enabled: true)

       assert user.save()
       assert user.preferences.save()
       assert user.profile.save()

       controller.params.id = user.profile.id

       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() != 0
       assert responseJson.get('email') == 'my@email.com'
    }
}
