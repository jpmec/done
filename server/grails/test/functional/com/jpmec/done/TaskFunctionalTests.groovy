package com.jpmec.done


import grails.converters.JSON
import com.grailsrocks.functionaltest.*




class TaskFunctionalTests extends BrowserTestCase {

    void testTaskShowWithNullUuid() {
      get('/api/task') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 400
      assertContentContains '{}'
    }


    void testTaskShowWithInvalidUuid() {
      get('/api/task/this-is-an-invalid-uuid') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 404
      assertContentContains '{}'
    }


    void testTaskShowWithValidUuid() {
      // setup task
      post('/api/task') {
        headers['Content-type'] = 'application/json'
	      body {
		    """
        {"text": "do it"}
        """
	      }
      }
      def content1 = response.contentAsString
      def result1 = JSON.parse(content1)
      def uuid1 = result1.get('uuid')


      get("/api/task/$uuid1") {
        headers['Accept'] = 'application/json'
      }

      assertStatus 200

      def content2 = response.contentAsString
      def result2 = JSON.parse(content2)

      assert result2.get('text') == "do it"
      assert result2.get('uuid') == uuid1
    }


    void testTaskSaveDefault() {

      // exercise test first time
      post('/api/task') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 200

      def content1 = response.contentAsString
      def result1 = JSON.parse(content1)

      assertNotNull result1.get('uuid')


      // exercise again, this should create a different object
      post('/api/task') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 200

      def content2 = response.contentAsString
      def result2 = JSON.parse(content2)

      assertNotNull result2.get('uuid')

      assert result1.get('uuid') != result2.get('uuid')

    }


    void testTaskSaveWithJsonBody() {

      post('/api/task') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
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


      post('/api/task') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
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

      post('/api/task') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
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


      post('/api/task') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
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



    void testTaskUpdateWithNullUuid() {

      put("/api/task") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {"notes": "to it"}
        """
	      }
      }

      assertStatus 400
      assertContentContains '{}'
    }


    void testTaskUpdateWithInvalidUuid() {

      put("/api/task/this-is-an-invalid-uuid") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {"notes": "to it"}
        """
	      }
      }

      assertStatus 404
      assertContentContains '{}'
    }


    void testTaskUpdateWithJsonBody() {

      post('/api/task') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
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


      put("/api/task/$uuid1") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {"notes": "to it"}
        """
	      }
      }

      assertStatus 200

      def content2 = response.contentAsString
      def result2 = JSON.parse(content2)

      assertNotNull result2.get('uuid')
      assert result2.get('uuid') == uuid1
      assert result2.get('text') == 'do it'
      assert result2.get('notes') == 'to it'

      put("/api/task/$uuid1") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
	      body {
		    """
        {"isDone": true}
        """
	      }
      }

      assertStatus 200

      def content3 = response.contentAsString
      def result3 = JSON.parse(content3)

      assertNotNull result3.get('uuid')
      assert result3.get('uuid') == uuid1
      assert result3.get('text') == 'do it'
      assert result3.get('notes') == 'to it'
      assert result3.get('isDone') == true
    }


    void testTaskDeleteWithNullUuid() {

      delete("/api/task") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 400
      assertContentContains '{}'
    }


    void testTaskDeleteWithInvalidUuid() {

      delete("/api/task/this-is-an-invalid-uuid") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 404
      assertContentContains '{}'
    }


    void testTaskDeleteWithValidUuid() {

      post('/api/task') {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
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


      delete("/api/task/$uuid1") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 200

      def content2 = response.contentAsString
      def result2 = JSON.parse(content2)

      assertNotNull result2.get('uuid')
      assert result2.get('uuid') == uuid1
      assert result2.get('text') == 'do it'


      get("/api/task/$uuid1") {
        headers['Content-type'] = 'application/json'
        headers['Accept'] = 'application/json'
      }

      assertStatus 404
      assertContentContains '{}'
    }

}
