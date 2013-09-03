package com.jpmec.done


import grails.converters.JSON
import com.grailsrocks.functionaltest.*




class TaskFunctionalTests extends BrowserTestCase {

    void testTaskShow() {
      get '/api/task'

      assertStatus 200
      assertContentContains '{}'
    }


    void testTaskSaveDefault() {

      // exercise test first time
      post('/api/task/save') {
        headers['Content-type'] = 'application/json'
      }

      assertStatus 200

      def content1 = response.contentAsString
      def result1 = JSON.parse(content1)

      assertNotNull result1.get('uuid')


      // exercise again, this should create a different object
      post('/api/task/save') {
        headers['Content-type'] = 'application/json'
      }

      assertStatus 200

      def content2 = response.contentAsString
      def result2 = JSON.parse(content2)

      assertNotNull result2.get('uuid')

      assert result1.get('uuid') != result2.get('uuid')

    }


    void testTaskSaveWithJsonBody() {

      post('/api/task/save') {
        headers['Content-type'] = 'application/json'
	      body {
		    """
        {"text": "do it"}
        """
	      }
      }

      assertStatus 200

      def content1 = response.contentAsString
      def result1 = JSON.parse(content1)

      assertNotNull result1.get('uuid')
      assert result1.get('text') == 'do it'


      post('/api/task/save') {
        headers['Content-type'] = 'application/json'
	      body {
		    """
        {"text": "do it"}
        """
	      }
      }

      assertStatus 200

      def content2 = response.contentAsString
      def result2 = JSON.parse(content2)

      assertNotNull result2.get('uuid')
      assert result2.get('text') == 'do it'


      assert result1.get('uuid') != result2.get('uuid')
    }


    void testTaskSaveWithDuplicateUuids() {

      post('/api/task/save') {
        headers['Content-type'] = 'application/json'
	      body {
		    """
        {"text": "do it"}
        """
	      }
      }

      assertStatus 200

      def content1 = response.contentAsString
      def result1 = JSON.parse(content1)
      def uuid1 = result1.get('uuid')

      assertNotNull uuid1


      post('/api/task/save') {
        headers['Content-type'] = 'application/json'
	      body {
		    """
        {"uuid": "$uuid1", "notes": "to it"}
        """
	      }
      }

      assertStatus 200

      def content2 = response.contentAsString
      def result2 = JSON.parse(content2)

      assertNotNull result2.get('uuid')
      assert result2.get('text') == 'do it'
      assert result2.get('notes') == 'to it'

      assert result1.get('uuid') != result2.get('uuid')
    }

}
