package com.jpmec.done

import com.grailsrocks.functionaltest.*

class UserFunctionalTests extends BrowserTestCase {


    void testUserShowWithNullUuid() {
      get('/api/user') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 400
      assertContentContains '{}'
    }


    void testUserShowWithInvalidUuid() {
      get('/api/user/this-is-an-invalid-uuid') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 404
      assertContentContains '{}'
    }


    void testUserShowWithValidUuid() {

      // setup
      post('/api/user') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {
          "username": "testUserShowWithValidUuid",
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
      get("/api/user/$uuid1") {
        headers['Accept'] = 'application/json'
      }

      assertStatus 200

      def content2 = response.contentAsString
      def result2 = grails.converters.JSON.parse(content2)
      assert result2.get('profile').get('uuid') == uuid1

    }

//    void testUserShowWithValidUuid() {
//      // setup task
//      post('/api/task') {
//        headers['Content-type'] = 'application/json'
//	      body {
//		    """
//        {"text": "do it"}
//        """
//	      }
//      }
//      def content1 = response.contentAsString
//      def result1 = JSON.parse(content1)
//      def uuid1 = result1.get('uuid')
//
//
//      get("/api/task/$uuid1") {
//        headers['Accept'] = 'application/json'
//      }
//
//      assertStatus 200
//
//      def content2 = response.contentAsString
//      def result2 = JSON.parse(content2)
//
//      assert result2.get('text') == "do it"
//      assert result2.get('uuid') == uuid1
//    }


    void testUserSaveWithNullParams() {

      post('/api/user') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 400
      assertContentContains '{}'
    }


    void testUserSaveWithJsonBody() {

      post('/api/user') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {
          "username": "juan",
          "password": "password",
        }
        """
	      }
      }

      assertStatus 200


      post('/api/user') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {
          "username": "doris",
          "password": "password",
        }
        """
	      }
      }

      assertStatus 200
    }



    void testUserSaveDuplicateUsers() {

      post('/api/user') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {
          "username": "trey",
          "password": "password",
        }
        """
	      }
      }

      assertStatus 200


      post('/api/user') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {
          "username": "trey",
          "password": "password",
        }
        """
	      }
      }

      assertStatus 400
    }

//
//      post('/api/task') {
//        headers['Content-type'] = 'application/json'
//        headers['Accept'] = 'application/json'
//	      body {
//		    """
//        {"text": "do it"}
//        """
//	      }
//      }
//
//      assertStatus 200
//
//      def content2 = response.contentAsString
//      def result2 = JSON.parse(content2)
//
//      assertNotNull result2.get('uuid')
//      assert result2.get('text') == 'do it'
//
//
//      assert result1.get('uuid') != result2.get('uuid')
//    }
//
//
//    void testUserSaveWithDuplicateUuids() {
//
//      post('/api/task') {
//        headers['Content-type'] = 'application/json'
//        headers['Accept'] = 'application/json'
//	      body {
//		    """
//        {"text": "do it"}
//        """
//	      }
//      }
//
//      assertStatus 200
//
//      def content1 = response.contentAsString
//      def result1 = JSON.parse(content1)
//      def uuid1 = result1.get('uuid')
//
//      assertNotNull uuid1
//
//
//      post('/api/task') {
//        headers['Content-type'] = 'application/json'
//        headers['Accept'] = 'application/json'
//	      body {
//		    """
//        {"uuid": "$uuid1", "notes": "to it"}
//        """
//	      }
//      }
//
//      assertStatus 200
//
//      def content2 = response.contentAsString
//      def result2 = JSON.parse(content2)
//
//      assertNotNull result2.get('uuid')
//      assert result2.get('text') == 'do it'
//      assert result2.get('notes') == 'to it'
//
//      assert result1.get('uuid') != result2.get('uuid')
//    }
//
//
//
//    void testUserUpdateWithNullUuid() {
//
//      put("/api/task") {
//        headers['Content-type'] = 'application/json'
//        headers['Accept'] = 'application/json'
//	      body {
//		    """
//        {"notes": "to it"}
//        """
//	      }
//      }
//
//      assertStatus 400
//      assertContentContains '{}'
//    }
//
//
//    void testUserUpdateWithInvalidUuid() {
//
//      put("/api/task/this-is-an-invalid-uuid") {
//        headers['Content-type'] = 'application/json'
//        headers['Accept'] = 'application/json'
//	      body {
//		    """
//        {"notes": "to it"}
//        """
//	      }
//      }
//
//      assertStatus 404
//      assertContentContains '{}'
//    }
//
//



    void testUserUpdateWithValidUuid() {

      // setup
      post('/api/user') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {
          "username": "testUserUpdateWithValidUuid",
          "password": "password",
        }
        """
	      }
      }

      assertStatus 200

      def content1 = response.contentAsString
      def result1 = grails.converters.JSON.parse(content1)
      def uuid1 = result1.get('profile').get('uuid')
      log.trace "uuid1 = " + uuid1

      // exercise
      put("/api/user/$uuid1") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'

	      body {
		    """
        {
          "password": "password2",
        }
        """
	      }
      }

      assertStatus 200

      def content2 = response.contentAsString
      def result2 = grails.converters.JSON.parse(content2)
      assert result2.get('profile').get('uuid') == uuid1

    }


//    void testUserUpdateWithJsonBody() {
//
//      post('/api/task') {
//        headers['Content-type'] = 'application/json'
//        headers['Accept'] = 'application/json'
//	      body {
//		    """
//        {"text": "do it"}
//        """
//	      }
//      }
//
//      assertStatus 200
//
//      def content1 = response.contentAsString
//      def result1 = JSON.parse(content1)
//      def uuid1 = result1.get('uuid')
//
//
//      put("/api/task/$uuid1") {
//        headers['Content-type'] = 'application/json'
//        headers['Accept'] = 'application/json'
//	      body {
//		    """
//        {"notes": "to it"}
//        """
//	      }
//      }
//
//      assertStatus 200
//
//      def content2 = response.contentAsString
//      def result2 = JSON.parse(content2)
//
//      assertNotNull result2.get('uuid')
//      assert result2.get('uuid') == uuid1
//      assert result2.get('text') == 'do it'
//      assert result2.get('notes') == 'to it'
//
//      put("/api/task/$uuid1") {
//        headers['Content-type'] = 'application/json'
//        headers['Accept'] = 'application/json'
//	      body {
//		    """
//        {"isDone": true}
//        """
//	      }
//      }
//
//      assertStatus 200
//
//      def content3 = response.contentAsString
//      def result3 = JSON.parse(content3)
//
//      assertNotNull result3.get('uuid')
//      assert result3.get('uuid') == uuid1
//      assert result3.get('text') == 'do it'
//      assert result3.get('notes') == 'to it'
//      assert result3.get('isDone') == true
//    }


    void testUserDeleteWithNullUsernameAndPassword() {

      delete("/api/user") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 400
      assertContentContains '{}'
    }


    //void testUserDeleteWithInvalidUuid() {
    //
    //  delete("/api/user") {
    //    headers['Content-type'] = 'application/json'
    //    headers['Accept'] = 'application/json'
    //    body {
    //      """
    //      {"username": "edward", "password": "password"}
    //      """
    //    }
    //  }
    //
    //  assertStatus 404
    //  assertContentContains '{}'
    //}


//    void testUserDeleteWithValidUsernameAndPassword() {
//
//      post('/api/user') {
//        headers['Content-type'] = 'application/json'
//        headers['Accept'] = 'application/json'
//	      body {
//		    """
//        {
//          "username": "edward",
//          "password": "password",
//        }
//        """
//	      }
//      }
//
//      assertStatus 200
//
//      delete("/api/user") {
//        headers['Content-type'] = 'application/json'
//        headers['Accept'] = 'application/json'
//        body {
//          """
//          {
//            "username": "edward",
//            "password": "password"
//          }
//          """
//        }
//      }
//
//      assertStatus 200
//    }

}
