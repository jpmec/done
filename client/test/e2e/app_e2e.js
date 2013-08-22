describe('app', function() {
  it('should signin', function() {
    browser().navigateTo('/');
    expect(browser().location().url()).toBe("/signin");
  });
})
