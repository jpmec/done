package com.jpmec.done


import spock.lang.Specification


class TaskSpec extends Specification {

	void "new Task should have default values"() {

    when:
      def task = new Task()

    then:
      "" == task.text
      "" == task.notes
      "" == task.createdBy
      "" == task.assignedTo
      false == task.isDone
      false == task.mustDo
      0 == task.priority
	}

}
