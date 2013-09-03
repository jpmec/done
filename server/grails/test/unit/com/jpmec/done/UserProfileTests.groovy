package com.jpmec.done



import grails.test.mixin.*
import org.junit.*

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(UserProfile)
class UserProfileTests {

    void testDefaultConstructor() {
       def instance = new UserProfile()

       assert instance.name == "anonymous"
       assert instance.email == ""
       assert instance.website_url == ""
    }


    void testConstructor() {

       def instance = new UserProfile(name: "john",
                                      email: "my@email.com",
                                      website_url: "domain.com")

       assert instance.name == "john"
       assert instance.email == "my@email.com"
       assert instance.website_url == "domain.com"
    }


    void testSetUserToNull() {
      def instance = new UserProfile()

      instance.user = null

      assert instance.user == null
    }
}
