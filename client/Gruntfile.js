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
          dot: true,
          cwd: '<%= yeoman.grails %>',
          src: [
            '<%= yeoman.grails %>/css/*.main.css',
            '<%= yeoman.grails %>/font/*',
            '<%= yeoman.grails %>/js/*.scripts.js',
          ]
        }]
      },
      server: '<%= yeoman.tmp %>/**/*'
    },
    coffee: {
      dist: {
        files: [{
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
        }]
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
        '<%= yeoman.app %>/{<%= yeoman.appModules %>}/*.coffee'
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
    concat: {
      dist: {
        files: {
          '<%= yeoman.dist %>/js/scripts.js': [
            '.tmp/js/{,*/}*.js',
            '<%= yeoman.app %>/js/{,*/}*.js'
          ]
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
      components: {
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
      css: {
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
          },
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
      distFontAwesome: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/components/font-awesome/font',
          dest: '<%= yeoman.dist %>/font',
          src: [
            '*'
          ]
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
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.dist %>',
          dest: '<%= yeoman.grails %>',
          src: [
          ]
        }]
      },
      font: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/components/font-awesome/font',
          dest: '<%= yeoman.tmp %>/font',
          src: ['*']
        }]
      },
      js: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/app',
          dest: '<%= yeoman.tmp %>/js',
          src: [ '*.js'
          ]
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/css/main.css': [
            '.tmp/css/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
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
      main: {
        src: [
          '<%= yeoman.app %>/{app,help,main,navbar,quotes,tasks,user}/*.html'
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
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.tmp %>/js/*.js',
        '!<%= yeoman.tmp %>/js/*min.js',
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
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/js',
          src: '*.js',
          dest: '<%= yeoman.dist %>/js'
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
            '<%= yeoman.dist %>/css/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/font/*'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/js/scripts.js': [
            '<%= yeoman.dist %>/js/scripts.js'
          ]
        }
      },
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
        dirs: ['<%= yeoman.dist %>']
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    watch: {
      coffee: {
        files: [
          '<%= yeoman.app %>/{<%= yeoman.appModules %>}/{,*/}*.coffee',
        ],
        tasks: ['coffee:dist']
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
    'clean:server',
    'clean:dist',
    'clean:heroku'
  ]);

  grunt.registerTask('server', [
    'clean:server',
    'coffeelint',
    'coffee:dist',
    'copy:components',
    'copy:js',
    'html2js',
    'copy:css',
    'copy:font',
//    'compass:server',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
//    'clean:server',
//    'coffeelint',
//    'coffee',
//    'html2js',
//    'jshint',
//    'compass',
//    'connect:test',
    'karma:unit'
  ]);

  grunt.registerTask('e2e', [
    'karma:e2e'
  ]);

  grunt.registerTask('build', [
    'clean:server',
    'clean:dist',
    'coffeelint',
    'coffee',
    'html2js',
    'copy:js',
    'copy:components',
    'jshint',
    'copy:css',
    'karma:unit',
    'compass:dist',
    'useminPrepare',
    'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'copy:dist',
    'copy:distFontAwesome',
    'cdnify',
    'ngmin',
    'uglify',
    'rev',
    'usemin'
  ]);


  grunt.registerTask('buildDebug', [
    'clean:dist',
    'uglify:angularLocalStorage',
    'coffeelint',
    'coffee',
    'html2js',
    'copy:js',
    'copy:components',
    'jshint',
    'copy:css',
    'copy:font',
//    'test',
//    'compass:dist',
    'copy:dist',
    'copy:debug'
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
    'build',
    'copy:deployGrails'
  ]);

  grunt.registerTask('deployGrailsDebug', [
    'buildDebug',
    'copy:deployGrails'
  ]);

  grunt.registerTask('deploy', [
    'deployHeroku'
  ]);

  grunt.registerTask('default', ['build']);
};
