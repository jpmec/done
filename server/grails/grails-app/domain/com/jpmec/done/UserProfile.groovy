package com.jpmec.done

import grails.converters.JSON




class UserProfile {

    User user
    String uuid
    String name = "anonymous"
    String email = ""
    String website_url = ""

    static constraints = {
      uuid unique: true
    }

    static jsonAttributes() {
      ["uuid", "name", "email", "website_url"]
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

    def beforeValidate() {
        if (this.uuid == null) {
            this.uuid = UUID.randomUUID().toString()
        }
    }

    def beforeInsert() {
        if (this.uuid == null) {
            this.uuid = UUID.randomUUID().toString()
        }
    }
}
