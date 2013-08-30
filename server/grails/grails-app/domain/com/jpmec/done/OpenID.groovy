package com.jpmec.done



class OpenID {

	String url

	static belongsTo = [user: SecureUser]

	static constraints = {
		url unique: true
	}
}
