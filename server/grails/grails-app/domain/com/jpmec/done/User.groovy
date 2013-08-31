package com.jpmec.done

import grails.converters.JSON

class User extends SecureUser {

    String email = "";

    static hasOne = [preferences: UserPreferences]
    static hasMany = [tasks: Task]

    static constraints = {
//      preferences unique: true
    }

    static jsonAttributes() {
      ["email", "preferences"]
    }

    static registerObjectMarshaller() {
        JSON.registerObjectMarshaller(User) {

          def attrs = jsonAttributes()

          def returnArray = [:]
          attrs.each() { attr ->
            returnArray[attr] = it."$attr"
          }

          return returnArray
        }
    }
}
