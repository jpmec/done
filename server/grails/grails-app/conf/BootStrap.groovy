import com.jpmec.done.SecureRole
import com.jpmec.done.SecureUser
import com.jpmec.done.SecureUserSecureRole
import com.jpmec.done.User

class BootStrap {

    def springSecurityService

    def init = { servletContext ->
        // encode the password only if you're using an older version of the // spring-security-core plugin and you don't have encoding logic in
        // your "User" domain class:
        // String password = springSecurityService.encodePassword('password')
        String password = 'password'

        def roleAdmin = new SecureRole(authority: 'ROLE_ADMIN').save()
        def roleUser = new SecureRole(authority: 'ROLE_USER').save()

        def user = new User(username: 'user', password: password, enabled: true).save()
        def admin = new User(username: 'admin', password: password, enabled: true).save()

        SecureUserSecureRole.create user, roleUser
        SecureUserSecureRole.create admin, roleUser
        SecureUserSecureRole.create admin, roleAdmin, true
    }


    def destroy = {

    }
}
