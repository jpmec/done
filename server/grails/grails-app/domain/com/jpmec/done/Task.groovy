package com.jpmec.done

class Task {

    String text = "";
    String notes = "";
    String createdBy = "";
    String assignedTo = "";
    Boolean isDone = false;

    static constraints = {
        text blank: false
        createdBy blank: false
    }
}
