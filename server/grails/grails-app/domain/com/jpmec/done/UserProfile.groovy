package com.jpmec.done

import grails.converters.JSON




class UserProfile {

    User user;
    String public_id = "";
    String name = "anonymous";
    String email = "";
    String website_url = "";

    static constraints = {
      public_id length: 64, blank: false, unique: true
    }

    static jsonAttributes() {
      ["public_id", "name", "email", "website_url"]
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

    void setUser(User instance)
    {
      user = instance
      if (instance) {
        public_id = user.username.encodeAsSHA256()
      }
    }
}
