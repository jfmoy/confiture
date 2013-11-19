'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist',
        tmp: '.tmp'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            coffee: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
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
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ],
                tasks: ['livereload']
            },
            jst: {
                files: [
                    '<%= yeoman.app %>/scripts/templates/*.ejs'
                ],
                tasks: ['jst']
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            proxies: [
              {
                context: '/1/',
                host: 'api.thisismyjam.com',
                port: 80,
                https: false,
                changeOrigin: true
              }
            ],
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            proxySnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'app')
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            proxySnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, 'app'),
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            proxySnippet,
                            mountFolder(connect, 'dist')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            docs: ['docs/*'],
            builds: ['builds/*'],
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        coffee: {
            dist: {
                files: [{
                    // rather than compiling multiple files here you should
                    // require them into your main .coffee file
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    src: '*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: '.tmp/spec',
                    src: '*.coffee',
                    dest: 'test/spec'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: 'app/bower_components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    name: '../bower_components/almond/almond',
                    almond: true,
                    out: 'dist/scripts/main.js',
                    baseUrl: 'app/scripts',
                    optimize: 'none',
                    paths: {
                        'templates': '../../.tmp/scripts/templates'
                    },
                    include: ['main'],
                    insertRequire: ['main'],
                    mainConfigFile: 'app/scripts/main.js',
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true,
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
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
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
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
                        'images/{,*/}*.{webp,gif}'
                    ]
                }]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/main.js'
            }
        },
        jst: {
            options: {
                amd: true
            },
            compile: {
                files: {
                    '.tmp/scripts/templates.js': ['<%= yeoman.app %>/templates/*.html']
                }
            }
        },
        yuidoc: {
            compile: {
                name: 'Confiture',
                description: 'Simplistic "This Is My Jam" HTML5 Client',
                version: '0.0.1',
                url: 'https://github.com/jfmoy/confiture',
                options: {
                    paths: 'app/scripts',
                    outdir: 'docs/'
                }
            }
        },
        replace: {
            test: {
                options: {
                    variables: {
                        'stop here in test builds' : 'return false;'
                    },
                    prefix: '//@@'
                },
                files: {
                    '<%= yeoman.tmp %>/scripts/main.js': ['<%= yeoman.app %>/scripts/main.js']
                }
            },
            dist: {
                options: {
                      patterns: [
                        {
                          match: '<script data-main="scripts/main" src="bower_components/requirejs/require.js"></script>',
                          replacement: '<script src="scripts/main.js"></script>'
                        }
                      ],
                      prefix: '<!-- @@Replace that by almond main script -->'
                },
                files: [
                  {expand: true, flatten: true, src: ['<%= yeoman.dist %>/index.html'], dest: '<%= yeoman.dist %>'}
                ]
            }
        },
        jscover: {
            options: {
                inputDirectory: '<%= yeoman.tmp %>/clean_scripts',
                outputDirectory: '<%= yeoman.tmp%>/scripts'
            }
        },
        removelogging: {
            test: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app%>/scripts',
                        src: ['**/*.js'],
                        dest: '<%= yeoman.tmp %>/clean_scripts'
                    }
                ]
            }
        },
        mocha_phantomjs: {
            test: {
                options: {
                    reporter: 'tap',
                    output: 'builds/unit-result.tap',
                    log: false,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            },
            spec: {
                options: {
                    log: false,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            },
            coverage: {
                options: {
                    reporter: 'json-cov',
                    output: 'builds/coverage-result.json',
                    log: false,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            },
            all: {
                options: {
                    log: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        compress: {
            dist: {
              options: {
                archive: 'builds/confiture-<%= grunt.template.date(new Date().getTime(), "yyyy-mm-dd") %>.zip',
                mode: 'zip'
              },
              files: [
                {expand: true, cwd: '<%= yeoman.dist %>', src: ['**'], dest: ''}
              ]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8']
            },
             dist: {
                  expand: true,
                  flatten: true,
                  src: '<%= yeoman.dist %>/styles/main.css', // -> src/css/file1.css, src/css/file2.css
                  dest: '<%= yeoman.dist %>/styles' // -> dest/css/file1.css, dest/css/file2.css
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'configureProxies',
            'coffee:dist',
            'createDefaultTemplate',
            'jst',
            'compass:server',
            'livereload-start',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('docs', [
        'clean:docs',
        'yuidoc'
    ]);

    grunt.registerTask('browser-test', [
        'clean:server',
        'configureProxies',
        'coffee',
        'createDefaultTemplate',
        'jst',
        'compass',
        'replace:test',
        'connect:test',
        'watch'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'configureProxies',
        'coffee',
        'createDefaultTemplate',
        'jst',
        'compass',
        'replace:test',
        'connect:test',
        'mocha_phantomjs:test'
    ]);

    grunt.registerTask('spec', [
        'clean:server',
        'configureProxies',
        'coffee',
        'createDefaultTemplate',
        'jst',
        'compass',
        'replace:test',
        'connect:test',
        'mocha_phantomjs:spec'
    ]);

    grunt.registerTask('coverage', [
        'clean:server',
        'configureProxies',
        'coffee',
        'compass',
        'replace:test',
        'removelogging:test',
        'createDefaultTemplate',
        'jscover',
        'jst',
        'connect:test',
        'mocha_phantomjs:coverage'
    ]);

    grunt.registerTask('build-auto', [
        'clean:dist',
        'coffee',
        'createDefaultTemplate',
        'jst',
        'compass:dist',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'usemin',
        'replace:dist',
        'autoprefixer:dist'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'coffee',
        'createDefaultTemplate',
        'jst',
        'compass:dist',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'usemin',
        'replace:dist',
        'compress:dist'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
