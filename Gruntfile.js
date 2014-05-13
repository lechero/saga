/*global module*/
module.exports = function (grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        compass: { // Task
            dist: { // Target
                options: { // Target options
                    sassDir: 'sass',
                    cssDir: 'css',
                    environment: 'production'
                }
            },
            dev: { // Another target
                options: {
                    sassDir: 'sass',
                    cssDir: 'css'
                }
            }
        },
        jst: {
            compile: {
                /*
                options: {
                    templateSettings: {
                        interpolate: /\{\{(.+?)\}\}/g
                    }
                },*/
                files: {
                    "example/public_html/app/templates.js": ["example/public_html/app/html/**/*.html"]
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jst');

    // Default task(s).
    //grunt.registerTask('default', ['uglify']);
    grunt.registerTask('default', ['compass']);

};