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
            dev: {
                options: {
                  mangle: false,
                  compress: false,
                  beautify: true
                },
                files: {
                    'app/js/main.min.js': ['app/js/*.js', 'app/js/vendor/*.js']
                }
            },
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
               src: 'app/css/main.css',
               dest: 'production/css/',
               flatten: true,
               expand: true
            },
            img: {
               cwd: 'app/img/',
                src: '*',
                dest: 'production/img/',
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
                    hostname: 'localhost'
                }
            }
        },
        watch: {
            js: {
                files: 'app/js/**/*.js',
                tasks: ['uglify:dev']
            },
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
        clean: {
            dist: ['production/**/*']
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('dev', ['jshint', 'uglify:dev', 'compass:dev', 'connect', 'watch']);
    grunt.registerTask('prod', ['clean', 'jshint', 'compass:prod', 'uglify:prod', 'copy']);
};