package com.jpmec.done

import grails.converters.JSON

class UserPreferences {

    User user;
    Boolean emailIsPrivate = true;
    Boolean useGravatar = false;

    static constraints = {
    }

    static jsonAttributes() {
      ["emailIsPrivate", "useGravatar"]
    }

    static registerObjectMarshaller() {
        JSON.registerObjectMarshaller(UserPreferences) {

          def attrs = jsonAttributes()

          def returnArray = [:]
          attrs.each() { attr ->
            returnArray[attr] = it."$attr"
          }

          return returnArray
        }
    }
}
