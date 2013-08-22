describe('app', function() {

  it('should signin', function() {
    browser().navigateTo('/');
    expect(browser().location().url()).toBe("/signin");

    input('userSigninName').enter('jon');
    input('userSigninPassword').enter('doe');
    element(':button').click();

    expect(browser().location().url()).toBe("/tasks/list");
  });


  it('should have help', function() {
    browser().navigateTo('/');
    expect(browser().location().url()).toBe("/signin");

    expect(element('#help-navbar-a').count()).toBeGreaterThan(0);
  });
})
