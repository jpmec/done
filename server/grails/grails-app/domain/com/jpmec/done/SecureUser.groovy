package com.jpmec.done

class SecureUser {

	transient springSecurityService

	String username // note: username is a valid email address
	String password
	boolean enabled
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired

  static hasMany = [openIds: OpenID, oAuthIds: OAuthID]

	static constraints = {
		username blank: false, unique: true, email: true
		password blank: false
	}

	static mapping = {
		password column: '`password`'
	}

	Set<SecureRole> getAuthorities() {
		SecureUserSecureRole.findAllBySecureUser(this).collect { it.secureRole } as Set
	}

	def beforeInsert() {
		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		password = springSecurityService.encodePassword(password)
	}
}
