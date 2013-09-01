package com.jpmec.done

import grails.converters.JSON




class UserProfile {

    User user;
    String name = "";
    String email = "";
    String website_url = "";

    static constraints = {
    }


    static jsonAttributes() {
      ["name", "email", "website_url"]
    }

    static registerObjectMarshaller() {
        JSON.registerObjectMarshaller(UserProfile) {

          def attrs = jsonAttributes()

          def returnArray = [:]
          attrs.each() { attr ->
            returnArray[attr] = it."$attr"
          }

          return returnArray
        }
    }
}
