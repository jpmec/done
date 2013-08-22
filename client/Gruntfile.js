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
    dist: 'dist',
    test: 'test',
    tmp: '.tmp',
    heroku: '../heroku/dist'
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
      server: '<%= yeoman.tmp %>/**/*'
    },
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/help',
          src: '{,*/}*.coffee',
          dest: '<%= yeoman.tmp %>/scripts',
          ext: '.js'
        },
        {
          expand: true,
          cwd: '<%= yeoman.app %>/main',
          src: '{,*/}*.coffee',
          dest: '<%= yeoman.tmp %>/scripts',
          ext: '.js'
        },
        {
          expand: true,
          cwd: '<%= yeoman.app %>/quotes',
          src: '{,*/}*.coffee',
          dest: '<%= yeoman.tmp %>/scripts',
          ext: '.js'
        },
        {
          expand: true,
          cwd: '<%= yeoman.app %>/tasks',
          src: '{,*/}*.coffee',
          dest: '<%= yeoman.tmp %>/scripts',
          ext: '.js'
        },
        {
          expand: true,
          cwd: '<%= yeoman.app %>/user',
          src: '{,*/}*.coffee',
          dest: '<%= yeoman.tmp %>/scripts',
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
        '<%= yeoman.app %>/help/*.coffee',
        '<%= yeoman.app %>/main/*.coffee',
        '<%= yeoman.app %>/quotes/*.coffee',
        '<%= yeoman.app %>/tasks/*.coffee',
        '<%= yeoman.app %>/user/*.coffee'
      ]
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
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
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '.tmp/scripts/{,*/}*.js',
            '<%= yeoman.app %>/scripts/{,*/}*.js'
          ]
        }
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
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
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
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
          '<%= yeoman.app %>/help/*.html',
          '<%= yeoman.app %>/main/*.html',
          '<%= yeoman.app %>/navbar/*.html',
          '<%= yeoman.app %>/quotes/*.html',
          '<%= yeoman.app %>/tasks/*.html',
          '<%= yeoman.app %>/user/*.html'
        ],
        dest: '<%= yeoman.tmp %>/scripts/templates.js'
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
        '<%= yeoman.tmp %>/scripts/*.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      e2e: {
        frameworks: ['ng-scenario'],
        singleRun: true
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
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
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      },
      angularjsGravatarDirective: {
        files: {
          '<%= yeoman.app %>/components/angularjs-gravatardirective/src/gravatar-directive.min.js':['<%= yeoman.app %>/components/angularjs-gravatardirective/src/gravatar-directive.js'],
          '<%= yeoman.app %>/components/angularjs-gravatardirective/src/md5-service.min.js':['<%= yeoman.app %>/components/angularjs-gravatardirective/src/md5-service.js']
        }
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
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
          '<%= yeoman.app %>/help/{,*/}*.coffee',
          '<%= yeoman.app %>/main/{,*/}*.coffee',
          '<%= yeoman.app %>/quotes/{,*/}*.coffee',
          '<%= yeoman.app %>/scripts/{,*/}*.coffee',
          '<%= yeoman.app %>/tasks/{,*/}*.coffee',
          '<%= yeoman.app %>/user/{,*/}*.coffee',
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
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
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
    'html2js',
//    'compass:server',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'coffeelint',
    'coffee',
    'html2js',
    'jshint',
//    'compass',
//    'connect:test',
    'karma:unit'
  ]);

  grunt.registerTask('e2e', [
    'karma:e2e'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'coffeelint',
    'coffee',
    'html2js',
    'jshint',
    'test',
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


  grunt.registerTask('deployHeroku', [
    'copy:deployHeroku'
  ]);

  grunt.registerTask('deploy', [
    'clean:heroku',
    'build',
    'deployHeroku'
  ]);

  grunt.registerTask('default', ['build']);
};
