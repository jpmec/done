class UrlMappings {

	static mappings = {
      "/login/auth" {
         controller = 'openId'
         action = 'auth'
      }
      "/login/openIdCreateAccount" {
         controller = 'openId'
         action = 'createAccount'
      }



      "/api/task/$uuid?"(resource:"Task")

      "/api/user/preferences/$uuid?"(resource:"UserPreferences", excludes:['save', 'delete'])
      "/api/user/profile/$uuid?"(resource:"UserProfile", excludes:['save', 'delete'])
      "/api/user/$uuid?"(resource:"User")

		  "/api/$controller/$action?/$id?"{
        constraints {
				  // apply constraints here
			  }
      }

		"/login/$action?"(controller: "login")
		"/logout/$action?"(controller: "logout")
		"/"(view:"/index")
		"500"(view:'/error')

	}
}
