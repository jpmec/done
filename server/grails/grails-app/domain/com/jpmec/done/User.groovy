package com.jpmec.done

import grails.converters.JSON




class User extends SecureUser {

    static hasOne = [preferences: UserPreferences, profile: UserProfile]
    static hasMany = [tasks: Task]

    static constraints = {
    }

    static jsonAttributes() {
      ["preferences", "profile"]
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

    void setPreferences(UserPreferences instance) {
      preferences = instance
      if (instance) {
        instance.user = this
      }
    }

    void setProfile(UserProfile instance) {
      profile = instance
      if (instance) {
        instance.user = this
      }
    }
}
