package com.jpmec.done



import grails.test.mixin.*
import org.junit.*

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(User)
class UserTests {

    void testConstructor() {
      def preferencesUser = new UserPreferences()
      def user = new User(username: 'user',
                          password: 'password',
                          preferences: preferencesUser,
                          enabled: true)

      assert user.username == 'user'
      assert user.password == 'password'
      assertNotNull user.preferences

      preferencesUser.user = user

      preferencesUser.save()
      user.save()

    }
}
