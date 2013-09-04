package com.jpmec.done

import com.grailsrocks.functionaltest.*

class UserProfileFunctionalTests extends BrowserTestCase {

    void testUserProfileShowWithNullUuid() {
      get('/api/user/profile') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 400
      assertContentContains '{}'
    }


    void testUserProfileShowWithInvalidUuid() {
      get('/api/user/profile/this-is-an-invalid-uuid') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 404
      assertContentContains '{}'
    }


    void testUserProfileShowWithValidUuid() {

      // setup
      post('/api/user') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {
          "username": "testUserProfileShowWithValidUuid",
          "password": "password",
        }
        """
	      }
      }

      assertStatus 200

      def content1 = response.contentAsString

      def result1 = grails.converters.JSON.parse(content1)
      def uuid1 = result1.get('profile').get('uuid')

      // exercise
      get("/api/user/profile/$uuid1") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 200

      def content2 = response.contentAsString
      def result2 = grails.converters.JSON.parse(content2)
      assert result2.get('profile').get('uuid') == uuid1

    }


    void testUserProfileUpdateWithNullUuid() {

      put("/api/user/profile") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {"name": "bob"}
        """
	      }
      }

      assertStatus 400
      assertContentContains '{}'
    }


    void testUserProfileUpdateWithInvalidUuid() {

      put("/api/user/profile/this-is-an-invalid-uuid") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {"name": "bob"}
        """
	      }
      }

      assertStatus 404
      assertContentContains '{}'
    }



//    void testUserProfileUpdateWithValidUuid() {
//
//      // setup
//      post('/api/user') {
//        headers['Content-type'] = 'application/json'
//        headers['Accept'] = 'application/json'
//	      body {
//		    """
//        {
//          "username": "testUserProfileUpdateWithValidUuid",
//          "password": "password",
//        }
//        """
//	      }
//      }
//
//      assertStatus 200
//
//      def content1 = response.contentAsString
//      def result1 = grails.converters.JSON.parse(content1)
//      def uuid1 = result1.get('profile').get('uuid')
//      log.trace "uuid1 = " + uuid1
//
//      // exercise
//      put("/api/user/profile/$uuid1") {
//        headers['Content-type'] = 'application/json'
//        headers['Accept'] = 'application/json'
//
//	      body {
//		    """
//        {
//          "name": "bob",
//        }
//        """
//	      }
//      }
//
//      assertStatus 200
//
//      def content2 = response.contentAsString
//      def result2 = grails.converters.JSON.parse(content2)
//      assert result2.get('name') == 'bob'
//
//    }

}
