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

    void testShowForNullIdAndNoRecords() {

       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() == 0
    }


    void testShowForNullIdAndSomeRecords() {

       // setup
       def springSecurityService = new Object()
       springSecurityService.metaClass.encodePassword = {String password -> "ENCODED_PASSWORD"}

       User.registerObjectMarshaller()
       UserPreferences.registerObjectMarshaller()
       UserProfile.registerObjectMarshaller()

       def user1 = new User(username: 'user1',
                            password: 'password',
                            preferences: new UserPreferences(),
                            profile: new UserProfile(name: 'user1', email: 'user1@email.com'),
                            enabled: true)

       user1.springSecurityService = springSecurityService

       assert user1.save(flush: true)
       user1.preferences.user = user1
       assert user1.preferences.save(flush: true)
       user1.profile.user = user1
       assert user1.profile.save(flush: true)


       def user2 = new User(username: 'user2',
                            password: 'password',
                            preferences: new UserPreferences(),
                            profile: new UserProfile(name: 'user2', email: 'user2@email.com'),
                            enabled: true)

       user2.springSecurityService = springSecurityService

       assert user2.save(flush: true)
       assert user2.preferences.save(flush: true)
       assert user2.profile.save(flush: true)


       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() == 2
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
       def springSecurityService = new Object()
       springSecurityService.metaClass.encodePassword = {String password -> "ENCODED_PASSWORD"}

       User.registerObjectMarshaller()
       UserPreferences.registerObjectMarshaller()
       UserProfile.registerObjectMarshaller()

       def user = new User(username: 'user',
                           password: 'password',
                           preferences: new UserPreferences(),
                           profile: new UserProfile(email: 'my@email.com'),
                           enabled: true)
       user.springSecurityService = springSecurityService

       assert user.save(flush: true)
       assert user.preferences.save(flush: true)
       assert user.profile.save(flush: true)

       controller.params.id = user.profile.id

       // exercise
       controller.show()

       // verify
       def responseJson = JSON.parse(response.text)
       assert responseJson.length() != 0
       assert responseJson.get('email') == 'my@email.com'
    }
}
