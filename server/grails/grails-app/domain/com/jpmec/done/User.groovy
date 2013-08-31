package com.jpmec.done

class User extends SecureUser {

    static hasMany = [tasks: Task]

    static constraints = {
    }
}
