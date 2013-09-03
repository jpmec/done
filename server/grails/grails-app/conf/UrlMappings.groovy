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

      "/api/task/$uuid?"(resource:"task")
      "/api/user_profile/$id?"(resource:"UserProfile")

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
