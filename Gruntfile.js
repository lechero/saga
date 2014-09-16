/*global module*/
module.exports = function (grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {},
            dist: {
                src: [
                    'src/libs/underscore-min.js',
                    'src/saga.js',
                    'src/util.js',
                    'src/debug.js',
                    'src/event.js',
                    'src/net.js',
                    'src/dom.js',
                    'src/animation.js',
                    'src/browser.js',
                    'src/holder.js',
                    'src/asset.js',
                    'src/route.js',
                    'src/stackloader.js',
                    'src/load-manager.js',
                    'src/asset-manager.js',
                    'src/font-manager.js',
                    'src/keyboard.js',
                    'src/graph.js',
                    'src/abracadabra.js'
                ],
                dest: 'build/saga.<%= pkg.version %>.js'
            }
        },
        uglify: {
            options: {},
            build: {
                src: 'build/saga.<%= pkg.version %>.js',
                dest: 'build/saga.<%= pkg.version %>.min.js'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        src: ['build/saga.<%= pkg.version %>.min.js'],
                        dest: 'build/saga.min.js'
                    }
                ]
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    //grunt.registerTask('default', ['uglify']);
    grunt.registerTask('default', ['concat', 'uglify','copy']);

};