module.exports = function(config) {
  config.set({

    frameworks: ['ng-scenario'],

    // list of files / patterns to load in the browser
    files: [
      'test/e2e/**/*.coffee'
    ],

    urlRoot: '/__karma/',

    // test results reporter to use
    reporters: ['dots'],

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
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 20000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    reportSlowerThan: 2000,

    preprocessors: {
      '**/*.coffee': 'coffee'
    },


    // It is important to set this to the port of the web server
    proxies: {
      '/': 'http://localhost:9000/'
    },

    plugins: [
      'karma-coffee-preprocessor',
      'karma-ng-scenario',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-junit-reporter'
    ]
  });
};
