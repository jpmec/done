import com.jpmec.done.*




class BootStrap {

    def springSecurityService

    def init = { servletContext ->

        Task.registerObjectMarshaller()
        User.registerObjectMarshaller()
        UserPreferences.registerObjectMarshaller()
        UserProfile.registerObjectMarshaller()


        // encode the password only if you're using an older version of the // spring-security-core plugin and you don't have encoding logic in
        // your "User" domain class:
        // String password = springSecurityService.encodePassword('password')
        String password = 'password'

        def roleAdmin = new SecureRole(authority: 'ROLE_ADMIN').save()
        def roleUser = new SecureRole(authority: 'ROLE_USER').save()

        def user = new User(username: 'user',
                            password: password,
                            preferences: new UserPreferences(),
                            profile: new UserProfile(name: 'a user'),
                            enabled: true)

        if (user.save()) {
          log.trace "created User with username: '$user.username' and password: '$password'"
        }
        else {
          log.error user.errors
        }

        def admin = new User(username: 'admin',
                             password: password,
                             preferences: new UserPreferences(),
                             profile: new UserProfile(name: 'an admin'),
                             enabled: true)


        if (admin.save()) {
          log.trace "created User with username: '$admin.username' and password: '$password'"
        }
        else {
          log.error admin.errors
        }

        SecureUserSecureRole.create user, roleUser
        SecureUserSecureRole.create admin, roleUser
        SecureUserSecureRole.create admin, roleAdmin, true
    }


    def destroy = {

    }
}
