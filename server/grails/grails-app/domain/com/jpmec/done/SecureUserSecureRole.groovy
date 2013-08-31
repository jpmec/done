package com.jpmec.done

import org.apache.commons.lang.builder.HashCodeBuilder

class SecureUserSecureRole implements Serializable {

	SecureUser secureUser
	SecureRole secureRole

	boolean equals(other) {
		if (!(other instanceof SecureUserSecureRole)) {
			return false
		}

		other.secureUser?.id == secureUser?.id &&
			other.secureRole?.id == secureRole?.id
	}

	int hashCode() {
		def builder = new HashCodeBuilder()
		if (secureUser) builder.append(secureUser.id)
		if (secureRole) builder.append(secureRole.id)
		builder.toHashCode()
	}

	static SecureUserSecureRole get(long secureUserId, long secureRoleId) {
		find 'from SecureUserSecureRole where secureUser.id=:secureUserId and secureRole.id=:secureRoleId',
			[secureUserId: secureUserId, secureRoleId: secureRoleId]
	}

	static SecureUserSecureRole create(SecureUser secureUser, SecureRole secureRole, boolean flush = false) {
		new SecureUserSecureRole(secureUser: secureUser, secureRole: secureRole).save(flush: flush, insert: true)
	}

	static boolean remove(SecureUser secureUser, SecureRole secureRole, boolean flush = false) {
		SecureUserSecureRole instance = SecureUserSecureRole.findBySecureUserAndSecureRole(secureUser, secureRole)
		if (!instance) {
			return false
		}

		instance.delete(flush: flush)
		true
	}

	static void removeAll(SecureUser secureUser) {
		executeUpdate 'DELETE FROM SecureUserSecureRole WHERE secureUser=:secureUser', [secureUser: secureUser]
	}

	static void removeAll(SecureRole secureRole) {
		executeUpdate 'DELETE FROM SecureUserSecureRole WHERE secureRole=:secureRole', [secureRole: secureRole]
	}

	static mapping = {
		id composite: ['secureRole', 'secureUser']
		version false
	}
}
