package com.jpmec.done

class User extends SecureUser {

    static hasOne = [preferences: UserPreferences]
    static hasMany = [tasks: Task]

    static constraints = {
    }
}
