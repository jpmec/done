// Karma configuration

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: ["jasmine"],


    // list of files / patterns to load in the browser
    files: [
      'app/components/angular/angular.js',
      'app/components/angular-cookies/angular-cookies.js',
      'app/components/angular-local-storage/*.js',
      'app/components/angular-mocks/angular-mocks.js',
      'app/components/underscore/underscore.js',
      'app/angular-local-storage-obscure/angular-local-storage-obscure.js',
      '.tmp/js/*.js',
      '.tmp/spec/*.js',
      'test/spec/**/*.js',
      'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha1.js',
      'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256.js',
      'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/hmac-sha256.js',
      'http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/aes.js'
    ],


    // list of files to exclude
    exclude: [],

    // test results reporter to use
    reporters: ['progress'],

    // web server port
    port: 8080,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Firefox'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 20000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    reportSlowerThan: 500,

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-junit-reporter'
    ]

  });
};
