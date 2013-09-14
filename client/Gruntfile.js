'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};


module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    appModules: 'app,help,main,navbar,quotes,tasks,user',
    components: 'app/components',
    dist: 'dist',
    test: 'test',
    tmp: '.tmp',
    heroku: '../heroku/dist',
    grails: '../server/grails/web-app'
  };

  try {
    yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.tmp %>/**/*',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      heroku: {
        files: [{
          dot: true,
          cwd: '<%= yeoman.heroku %>',
          src: [
            '<%= yeoman.heroku %>/*'
          ]
        }]
      },
      grails: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.grails %>',
          src: [
            '<%= yeoman.grails %>/css/*',
            '<%= yeoman.grails %>/font/*',
            '<%= yeoman.grails %>/js/*',
          ]
        }]
      },
      tmp: '<%= yeoman.tmp %>/**/*'
    },
    coffee: {
      appToTmp: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/angular-spring-security',
            src: '{,*/}*.coffee',
            dest: '<%= yeoman.tmp %>/js',
            ext: '.js'
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/app',
            src: '{,*/}*.coffee',
            dest: '<%= yeoman.tmp %>/js',
            ext: '.js'
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/help',
            src: '{,*/}*.coffee',
            dest: '<%= yeoman.tmp %>/js',
            ext: '.js'
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/main',
            src: '{,*/}*.coffee',
            dest: '<%= yeoman.tmp %>/js',
            ext: '.js'
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/quotes',
            src: '{,*/}*.coffee',
            dest: '<%= yeoman.tmp %>/js',
            ext: '.js'
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/tasks',
            src: '{,*/}*.coffee',
            dest: '<%= yeoman.tmp %>/js',
            ext: '.js'
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/user',
            src: '{,*/}*.coffee',
            dest: '<%= yeoman.tmp %>/js',
            ext: '.js'
          }
        ]
      },
      test: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.test %>/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    coffeelint: {
      app: [
        '<%= yeoman.app %>/{<%= yeoman.appModules %>}/*.coffee',
//        '<%= yeoman.app %>/angular-spring-security/*.coffee',
      ]
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '<%= yeoman.tmp %>/css',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/components',
        relativeAssets: true
      },
      dist: {
        options: {
          relativeAssets: true
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        //hostname: 'localhost'
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, yeomanConfig.tmp),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.tmp),
              mountFolder(connect, yeomanConfig.test)
            ];
          }
        }
      }
    },
    copy: {
      componentsToTmp: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.components %>/angular',
            dest: '<%= yeoman.tmp %>/js',
            src: ['angular.min.js']
          },
          {
            expand: true,
            cwd: '<%= yeoman.components %>/angular-bootstrap',
            dest: '<%= yeoman.tmp %>/js',
            src: ['ui-bootstrap-tpls.min.js']
          },
          {
            expand: true,
            cwd: '<%= yeoman.components %>/angular-cookies',
            dest: '<%= yeoman.tmp %>/js',
            src: ['angular-cookies.min.js']
          },
          {
            expand: true,
            cwd: '<%= yeoman.components %>/angular-l10n/build',
            dest: '<%= yeoman.tmp %>/js',
            src: ['l10n.min.js']
          },
          {
            expand: true,
            cwd: '<%= yeoman.components %>/angular-local-storage',
            dest: '<%= yeoman.tmp %>/js',
            src: ['angular-local-storage.min.js']
          },
          {
            expand: true,
            cwd: '<%= yeoman.components %>/angular-resource',
            dest: '<%= yeoman.tmp %>/js',
            src: ['angular-resource.min.js']
          },
          {
            expand: true,
            cwd: '<%= yeoman.components %>/angular-sanitize',
            dest: '<%= yeoman.tmp %>/js',
            src: ['angular-sanitize.min.js']
          },
          {
            expand: true,
            cwd: '<%= yeoman.components %>/angular-ui/build',
            dest: '<%= yeoman.tmp %>/js',
            src: ['angular-ui.min.js']
          },
          {
            expand: true,
            cwd: '<%= yeoman.components %>/angularjs-gravatardirective/src',
            dest: '<%= yeoman.tmp %>/js',
            src: ['md5-service.min.js', 'gravatar-directive.min.js']
          },
          {
            expand: true,
            cwd: '<%= yeoman.components %>/bootstrap/bootstrap/js',
            dest: '<%= yeoman.tmp %>/js',
            src: ['bootstrap.min.js']
          },
          {
            expand: true,
            cwd: '<%= yeoman.components %>/qrcode',
            dest: '<%= yeoman.tmp %>/js',
            src: ['qrcode.min.js']
          },
          {
            expand: true,
            cwd: '<%= yeoman.components %>/jquery',
            dest: '<%= yeoman.tmp %>/js',
            src: ['jquery.min.js']
          },
          {
            expand: true,
            cwd: '<%= yeoman.components %>/jquery-ui/ui/minified',
            dest: '<%= yeoman.tmp %>/js',
            src: ['jquery-ui.min.js']
          },
          {
            expand: true,
            cwd: '<%= yeoman.components %>/underscore',
            dest: '<%= yeoman.tmp %>/js',
            src: ['underscore-min.js']
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/angular-local-storage-obscure',
            dest: '<%= yeoman.tmp %>/js',
            src: ['angular-local-storage-obscure.js']
          }
        ]
      },
      appCssToTmp: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/help',
            dest: '<%= yeoman.tmp %>/css',
            src: ['help.css']
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/navbar',
            dest: '<%= yeoman.tmp %>/css',
            src: ['navbar.css']
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/tasks',
            dest: '<%= yeoman.tmp %>/css',
            src: ['tasks.css']
          },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/user',
            dest: '<%= yeoman.tmp %>/css',
            src: ['user.css']
          }
        ]
      },
      appEtcToTmp: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.tmp %>',
          src: [
            '*.{ico,txt}',
            '.htaccess'
          ]
        }]
      },
      appImagesToTmp: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.app %>/images',
            dest: '<%= yeoman.tmp %>/img',
            src: ['*']
          }
        ]
      },
      componentsCssToTmp: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.components %>/bootstrap/bootstrap/css',
            dest: '<%= yeoman.tmp %>/css',
            src: ['bootstrap.min.css']
          },
          {
            expand: true,
            cwd: '<%= yeoman.components %>/bootstrap/bootstrap/css',
            dest: '<%= yeoman.tmp %>/css',
            src: ['bootstrap-responsive.min.css']
          },
          {
            expand: true,
            cwd: '<%= yeoman.components %>/font-awesome/css',
            dest: '<%= yeoman.tmp %>/css',
            src: ['font-awesome.min.css']
          }
        ]
      },
      debug: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.tmp %>',
          dest: '<%= yeoman.dist %>',
          src: [
            'js/*',
            'css/*',
            'font/*'
          ]
        },
        {
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.html'
          ]
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'images/{,*/}*.{gif,webp}',
          ]
        }]
      },
      distIndex: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.tmp %>',
          dest: '<%= yeoman.dist %>',
          src: ['index.html']
        }]
      },
      deployHeroku: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.dist %>',
          dest: '<%= yeoman.heroku %>',
          src: [
            '**/*'
          ]
        }]
      },
      deployGrails: {
        files:[
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.dist %>',
            dest: '<%= yeoman.grails %>',
            src: [ 'css/*', 'font/*', 'img/*', 'js/*']
          },
          {
            '../server/grails/grails-app/views/index.gsp' :
              '<%= yeoman.dist %>/index.html'
          }
        ]
      },
      font: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/components/font-awesome/font',
          dest: '<%= yeoman.tmp %>/font',
          src: ['*']
        }]
      },
      html: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.tmp %>',
          src: ['*.html']
        }]
      },
      tmpToDist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.tmp %>/font',
            dest: '<%= yeoman.dist %>/font',
            src: ['*']
          },
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.tmp %>/img',
            dest: '<%= yeoman.dist %>/img',
            src: ['*']
          },
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.tmp %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,txt,html}',
              '.htaccess'
            ]
          },
        ]
      },
      tmpMinCssToDist: {
        files: [
          {
            '<%= yeoman.dist %>/css/styles.min.css':
              '<%= yeoman.tmp %>/css/styles.min.css'
          }
        ]
      },
      tmpMinJsToDist: {
        files: [
          {
            '<%= yeoman.dist %>/js/scripts.min.js':
              '<%= yeoman.tmp %>/js/scripts.min.js'
          }
        ]
      }
    },
    exec: {
      bowerUpdate: {
        cmd: function() {
          return 'bower update';
        }
      },
      npmInstall: {
        cmd: function() {
          return 'npm install';
        }
      },
      makeBootstrap: {
        cwd: '<%= yeoman.app %>/components/bootstrap',
        cmd: function() {
          return 'npm install; make; make bootstrap;';
        }
      }
    },
    html2js: {
      options: {
        base: 'app',
        fileHeaderString: '\'use strict\';',
        module: 'templatesModule',
        quoteChar: '\''
      },
      appToTmp: {
        src: [
          '<%= yeoman.app %>/{<%= yeoman.appModules %>}/*.html'
        ],
        dest: '<%= yeoman.tmp %>/js/templates.js'
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.tmp %>',
          src: ['*.html'],
          dest: '<%= yeoman.tmp %>'
        }]
      }
    },
    imagemin: {
      tmp: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.tmp %>/img',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.tmp %>/img'
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      tmp: [
        'Gruntfile.js',
        '<%= yeoman.tmp %>/js/*.js',
        '!<%= yeoman.tmp %>/js/*min.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      e2e: {
        configFile: 'karma-e2e.conf.js',
        singleRun: true
      }
    },
    ngmin: {
      tmp: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.tmp %>/js',
          src: ['*.js', '!*min.js'],
          dest: '<%= yeoman.tmp %>/js'
        }]
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/js/{,*/}*.js',
            '<%= yeoman.dist %>/css/{,*/}*.css'
          ]
        }
      }
    },
    uglify: {
      angularjsGravatarDirective: {
        files: {
          '<%= yeoman.app %>/components/angularjs-gravatardirective/src/gravatar-directive.min.js': [
            '<%= yeoman.app %>/components/angularjs-gravatardirective/src/gravatar-directive.js'
          ],
          '<%= yeoman.app %>/components/angularjs-gravatardirective/src/md5-service.min.js': [
            '<%= yeoman.app %>/components/angularjs-gravatardirective/src/md5-service.js'
          ]
        }
      },
      angularLocalStorage: {
        files: {
          '<%= yeoman.app %>/components/angular-local-storage/angular-local-storage.min.js': [
            '<%= yeoman.app %>/components/angular-local-storage/angular-local-storage.js'
          ]
        }
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/css/{,*/}*.css'],
      options: {
        basedir: '<%= yeoman.dist %>',
        dirs: ['<%= yeoman.dist %>']
      }
    },
    useminPrepare: {
      html: '<%= yeoman.tmp %>/index.html',
      options: {
        dest: '<%= yeoman.dest %>'
      }
    },
    watch: {
      coffee: {
        files: [
          '<%= yeoman.app %>/{<%= yeoman.appModules %>}/{,*/}*.coffee',
        ],
        tasks: ['coffee:app']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '{<%= yeoman.tmp %>,<%= yeoman.app %>}/css/{,*/}*.css',
          '{<%= yeoman.tmp %>, <%= yeoman.app %>}/js/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['html2js', 'livereload']
      }
    }
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('install', [
    'exec:npmInstall',
    'exec:bowerUpdate',
    'exec:makeBootstrap'
  ]);

  grunt.registerTask('cleanAll', [
    'clean:tmp',
    'clean:dist',
    'clean:heroku'
  ]);


  grunt.registerTask('buildStepClean', [
    'clean:tmp',
    'clean:dist'
  ]);


  grunt.registerTask('buildStepCoffee', [
    'coffeelint:app',
    'coffee:appToTmp',
  ]);


  grunt.registerTask('buildStepJs', [
    'html2js:appToTmp',
    'jshint:tmp',
    'copy:componentsToTmp',
    'ngmin:tmp'
  ]);


  grunt.registerTask('buildStepCss', [
    'copy:appCssToTmp',
    'copy:componentsCssToTmp'
  ]);


  grunt.registerTask('buildStepFont', [
    'copy:font'
  ]);


  grunt.registerTask('buildStepImages', [
    'copy:appImagesToTmp',
    'imagemin:tmp'
  ]);


  grunt.registerTask('buildStepHtml', [
    'copy:html'
  ]);


  grunt.registerTask('buildStepEtc', [
    'copy:appEtcToTmp'
  ]);


  grunt.registerTask('buildStepDist', [
    'copy:tmpToDist'
  ]);


  grunt.registerTask('buildStepUseMin', [
    'useminPrepare',
    'concat',
    'cssmin',
//    'uglify',
    'copy:tmpMinCssToDist',
    'copy:tmpMinJsToDist',
    'rev:dist',
    'usemin'
  ]);


  grunt.registerTask('buildStepDistDebug', [
    'copy:debug'
  ]);


  grunt.registerTask('build', [
    'buildStepClean',
    'buildStepCoffee',
    'buildStepJs',
    'buildStepCss',
    'buildStepFont',
    'buildStepImages',
    'buildStepHtml',
    'buildStepEtc',
    'buildStepDist',
    'buildStepUseMin'
  ]);


  grunt.registerTask('buildDebug', [
    'buildStepClean',
    'uglify:angularLocalStorage',
    'buildStepCoffee',
    'buildStepJs',
    'buildStepCss',
    'buildStepFont',
    'buildStepImages',
    'buildStepHtml',
    'buildStepEtc',
    'buildStepDist',
    'buildStepDistDebug'
  ]);



  grunt.registerTask('server', [
    'buildDebug',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);


  grunt.registerTask('testDebug', [
    'buildDebug',
    'karma:unit'
  ]);


  grunt.registerTask('e2e', [
    'karma:e2e'
  ]);


  grunt.registerTask('deployHeroku', [
    'clean:heroku',
    'build',
    'copy:deployHeroku'
  ]);


  grunt.registerTask('deployHerokuDebug', [
    'clean:heroku',
    'buildDebug',
    'copy:deployHeroku'
  ]);


  grunt.registerTask('deployGrails', [
    'clean:grails',
    'build',
    'copy:deployGrails'
  ]);


  grunt.registerTask('deployGrailsDebug', [
    'clean:grails',
    'buildDebug',
    'copy:deployGrails'
  ]);


  grunt.registerTask('deploy', [
    'deployGrailsDebug'
  ]);


  grunt.registerTask('default', ['build']);
};
