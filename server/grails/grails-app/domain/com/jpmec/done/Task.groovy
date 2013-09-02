package com.jpmec.done

import grails.converters.JSON




class Task {

    String text = "";
    String notes = "";
    String createdBy = "";
    String assignedTo = "";
    Boolean isDone = false;

    static constraints = {
//        text blank: false
//        createdBy blank: false
    }

    static jsonAttributes() {
      ["text", "notes", "createdBy", "assignedTo", "isDone"]
    }

    static registerObjectMarshaller() {
        JSON.registerObjectMarshaller(Task) {

          def attrs = jsonAttributes()

          def returnArray = [:]
          attrs.each() { attr ->
            returnArray[attr] = it."$attr"
          }

          return returnArray
        }
    }
}
