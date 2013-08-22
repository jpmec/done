describe "app", ->

  signin = ->
    input("userSigninName").enter "jon"
    input("userSigninPassword").enter "doe"
    element(":button").click()

  beforeEach ->
    browser().navigateTo "/"
    expect(browser().location().url()).toBe "/signin"

  it "should signin", ->
    signin()
    expect(browser().location().url()).toBe "/tasks/list"

  it "should signout", ->
    signin()
    expect(browser().location().url()).toBe "/tasks/list"
    expect(element("#active-user-navbar-signout").count()).toBe 1
    element("#active-user-navbar-signout").click()
    expect(browser().location().url()).toBe "/signin"

  it "should have help", ->
    expect(element("#help-navbar-a").count()).toBe 1
    element("#help-navbar-a").click()
    expect(element("#help-ok").count()).toBe 1
    element("#help-ok").click()
