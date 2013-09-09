package com.jpmec.done

import grails.converters.JSON
import java.sql.Timestamp;
import java.util.Date;
import org.codehaus.groovy.grails.plugins.codecs.SHA256Codec


class Task {

    private static final Date NULL_DATE = new Date(0)

    String uuid
    String text = ""
    String notes = ""
    String createdBy = ""
    String assignedTo = ""
    Boolean isDone = false
    Boolean mustDo = false
    Integer priority = 0
    Date createdDate = NULL_DATE
    Date dueDate = null
    Date startedDate = null
    Date finishedDate = null



    static constraints = {
//        text blank: false
//        createdBy blank: false
        uuid unique: true
        dueDate nullable: true
        startedDate nullable: true
        finishedDate nullable: true
    }


    static jsonAttributes() {
        ["uuid",
         "text",
         "notes",
         "createdBy",
         "assignedTo",
         "isDone",
         "mustDo",
         "priority",
         "createdDate",
         "dueDate",
         "startedDate",
         "finishedDate"]
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

        if (createdDate == NULL_DATE) {
            createdDate = new Date()
        }
    }
}
