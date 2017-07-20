module.exports = function(grunt) {
    // Project config
    grunt.initConfig({
        watch: {
            pug: {
                files: ['app/view/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/**/*.js', 'mongoose/**/*.js'],
                // tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
            // uglify: {
            //     files: ['public/**/*.js'],
            //     tasks: ['jshint'],
            //     options: {
            //         livereload: true
            //     }
            // },
            // styles: {
            //     files: ['public/**/*.less'],
            //     tasks: ['less'],
            //     options: {
            //         nospawn: true
            //     }
            // }
        },
        // jshint: {
        //     options: {
        //         jshintrc: '.jshintrc',
        //         ignores: ['public/assets/libs/**/*.js']
        //     },
        //     all: ['public/assets/js/*.js', 'test/**/*.js', 'app/**/*.js', 'app.js']
        // },
        // less: {
        //     development: {
        //         options: {

        //             compress: true,
        //             yuicompress: true,
        //             optimization: 2
        //         },

        //         files: {
        //             'public/build/index.css': 'public/assets/css/index.less'
        //         }
        //     }
        // },
        // uglify: {
        //     development: {
        //         files: {
        //             'public/build/admin.min.js': 'public/assets/js/main.js',
        //             // detail.js

        //         }
        //     }
        // },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    args: [],
                    nodeArgs: ['--debug'],
                    ignore: ['README.md', 'node_modules/**', '.DS_Store'],
                    ext: 'js',
                    watch: ['./'],
                    delay: 1000,
                    env: {
                        PORT: '3000'
                    },
                    cwd: __dirname
                }
            }
        },
        // mochaTest: {
        //     options: {
        //         reporter: 'spec'
        //     },
        //     src: ['test/**/*.js']
        // },
        concurrent: {
            // miss uglify
            // tasks: ['nodemon', 'watch', 'less', 'jshint'],
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    // grunt.loadNpmTasks('grunt-mocha-test');
    // grunt.loadNpmTasks('grunt-contrib-less');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default tasks
    grunt.option('force', true);
    grunt.registerTask('default', ['concurrent']);
    // grunt.registerTask('test', ['mochaTest']);
};
