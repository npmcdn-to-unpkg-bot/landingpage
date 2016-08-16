/**
 * Created by Vic on 7/13/16.
 */
module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            build: ['GruntFile.js', 'app/**/*.js']
        },

        uglify: {
            // dev: {
            //     options: {
            //       mangle: false,
            //       compress: false,
            //       beautify: true
            //     },
            //     files: {
            //         'app/js/main.min.js': ['app/js/*.js', 'app/js/vendor/*.js']
            //     }
            // },
            prod: {
                options: {
                    mangle: false,
                    compress: true
                },
                files: {
                    'production/js/main.min.js': ['app/js/*.js']
                }
            }
        },

        compass: {
            dev:{
                options: {
                    sassDir: 'app/scss',
                    css: 'app/css',
                    outputStyle: 'expanded'
                }
            },
            prod: {
                options: {
                    sassDir: 'app/scss',
                    css: 'production/css',
                    outputStyle: 'compressed'
                }
            }
        },

        copy: {
            html: {
               src: 'app/*.html',
               dest: 'production/',
               flatten: true,
               expand: true
            },
            js:{
               src: 'app/js/main.min.js',
               dest: 'production/js/',
               flatten: true,
               expand: true
            },
            css: {
               src: 'app/css/normalize.min.css',
               dest: 'production/css/',
               flatten: true,
               expand: true
            },
            img: {
               cwd: 'app/img/',
                src: '*',
                dest: 'production/img/',
                expand: true
            },
            fonts: {
                src: 'app/fonts/*',
               dest: 'production/fonts',
               flatten: true,
               expand: true
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'app',
                    livereload: true,
                    open: true,
                    hostname: '0.0.0.0'
                }
            }
        },
        watch: {
            scss: {
                files: 'app/scss/**/*',
                tasks: ['compass:dev']
            },
            livereload: {
                options: {
                    livereload: 35729
                },
                files: ['app/css/*', 'app/js/*', 'app/**/*.html']
            }
        },
        war: {
            target: {
                options: {
                    war_dist_folder: 'target',
                    war_name: 'ROOT'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'production',
                        src: ['**'],
                        dest: ''
                    }
                ]
            }
        },
        shell: {
            runTests: {
                command: function(platform, browser, version) {
                  return 'PLATFORM='+platform+' BROWSER='+browser+' VERSION='+version+' ./node_modules/.bin/parallel-mocha test/*-spec.js'
                }
            }
        },

        parallel: {
            assets: {
                options: {
                    grunt: true
                },
                tasks: ['run_XP_firefox_42',  'run_Windows10_edge', 'run_Windows7_ie_11']
            }
        },
        clean: {
            dist: ['production/**/*']
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-war');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    // load tasks
    grunt.loadNpmTasks('grunt-parallel');
    grunt.loadNpmTasks('grunt-shell');

    // register tasks
    grunt.registerTask('default', ['parallel']);

    grunt.registerTask('run_XP_firefox_42', ['shell:runTests:XP:firefox:42']);
    // grunt.registerTask('run_Linux_chrome_45', ['shell:runTests:Linux:chrome:45']);
    grunt.registerTask('run_Windows10_edge', ['shell:runTests:"Windows 10":MicrosoftEdge:20.10240']);
    grunt.registerTask('run_Windows7_ie_11', ['shell:runTests:"Windows 7":"internet explorer":11']);

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('dev', ['jshint', 'compass:dev', 'connect', 'watch']);
    grunt.registerTask('prod', ['clean', 'jshint', 'compass:prod', 'uglify:prod', 'copy', 'war']);

};
