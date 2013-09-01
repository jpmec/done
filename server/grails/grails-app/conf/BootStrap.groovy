import com.jpmec.done.*




class BootStrap {

    def springSecurityService

    def init = { servletContext ->

        Task.registerObjectMarshaller()
        User.registerObjectMarshaller()
        UserPreferences.registerObjectMarshaller()


        // encode the password only if you're using an older version of the // spring-security-core plugin and you don't have encoding logic in
        // your "User" domain class:
        // String password = springSecurityService.encodePassword('password')
        String password = 'password'

        def roleAdmin = new SecureRole(authority: 'ROLE_ADMIN').save()
        def roleUser = new SecureRole(authority: 'ROLE_USER').save()

        def user = new User(username: 'user',
                            password: password,
                            preferences: new UserPreferences(),
                            profile: new UserProfile(),
                            enabled: true)

        user.preferences.user = user
        user.profile.user = user
        user.save()
        user.preferences.save()
        user.profile.save()

        def admin = new User(username: 'admin',
                             password: password,
                             preferences: new UserPreferences(),
                             profile: new UserProfile(),
                             enabled: true)

        admin.preferences.user = admin
        admin.profile.user = admin
        admin.save()
        admin.preferences.save()
        admin.profile.save()

        SecureUserSecureRole.create user, roleUser
        SecureUserSecureRole.create admin, roleUser
        SecureUserSecureRole.create admin, roleAdmin, true
    }


    def destroy = {

    }
}
