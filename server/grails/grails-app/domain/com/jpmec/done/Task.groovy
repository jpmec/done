package com.jpmec.done

import grails.converters.JSON
import java.sql.Timestamp;
import java.util.Date;
import org.codehaus.groovy.grails.plugins.codecs.SHA256Codec


class Task {

    String uuid
    String text = ""
    String notes = ""
    String createdBy = ""
    String assignedTo = ""
    Boolean isDone = false

    static constraints = {
//        text blank: false
//        createdBy blank: false
        uuid unique: true
    }

    static jsonAttributes() {
        ["uuid", "text", "notes", "createdBy", "assignedTo", "isDone"]
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

    def beforeValidate() {
        if (uuid == null) {
            uuid = UUID.randomUUID().toString()
        }
    }

    def beforeInsert() {
        if (this.uuid == null) {
            this.uuid = UUID.randomUUID().toString()
        }
    }
}
