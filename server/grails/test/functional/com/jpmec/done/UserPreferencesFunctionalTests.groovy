package com.jpmec.done

import com.grailsrocks.functionaltest.*

class UserPreferencesFunctionalTests extends BrowserTestCase {

    void testUserPreferencesShowWithNullUuid() {
      get('/api/user/preferences') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 400
      assertContentContains '{}'
    }


    void testUserPreferencesShowWithInvalidUuid() {
      get('/api/user/preferences/this-is-an-invalid-uuid') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 404
      assertContentContains '{}'
    }


    void testUserPreferencesShowWithValidUuid() {

      // setup
      post('/api/user') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {
          "username": "testUserPreferencesShowWithValidUuid",
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
      get("/api/user/preferences/$uuid1") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 200

      def content2 = response.contentAsString
      def result2 = grails.converters.JSON.parse(content2)
      assert result2.get('useGravatar') == false

    }


    void testUserPreferencesUpdateWithNullUuid() {

      put("/api/user/preferences") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {"useGravatar": true}
        """
	      }
      }

      assertStatus 400
      assertContentContains '{}'
    }


    void testUserPreferencesUpdateWithInvalidUuid() {

      put("/api/user/preferences/this-is-an-invalid-uuid") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {"useGravatar": true}
        """
	      }
      }

      assertStatus 404
      assertContentContains '{}'
    }



    void testUserPreferencesUpdateWithValidUuid() {

      // setup
      post('/api/user') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {
          "username": "testUserPreferencesUpdateWithValidUuid",
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
      put("/api/user/preferences/$uuid1") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'

	      body {
		    """
        {
          "useGravatar": true,
        }
        """
	      }
      }

      assertStatus 200

      def content2 = response.contentAsString
      def result2 = grails.converters.JSON.parse(content2)
      assert result2.get('useGravatar') == true

    }
}
