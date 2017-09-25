// change for your installing packages and your websites
'use strict';

module.exports= function(grunt){
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        // info ump-config will be introduced
        useminPrepare: 'grunt-usemin'
    });
    // json-like object, init config for all tasks
    grunt.initConfig({
        sass: {
            dist:{
                files:{
                    'css/styles.css':'css/styles.scss'
                }
            }
        },

        watch: {
            files: ['css/*.scss'],
            tasks: ['sass']
        },
        // one available config method
        browserSync: {
            dev: {
                // which files should be watched by browserSync
                bsFiles: {
                    src : [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        },

        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    // current working directory
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts: {
                files: [
                {
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },

        clean: {
            build: {
                src: [ 'dist/']
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: './',                   // Src matches are relative to this path
                    src: ['img/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/'                  // Destination path prefix
                }]
            }
        },

        // use the Grunt usemin module together with concat, cssmin, uglify and filerev to prepare the distribution folder

        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['contactus.html','aboutus.html','index.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js:['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function (context, block) {
                            var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0, rebase: false
                                };
                            }       
                        }]
                    }
                }
            }
        },

        // Concat
        concat: {
            options: {
                separator: ';'
            },

            // dist configuration is provided by useminPrepare
            // not sure if works
            dist: {}
        },

        // Uglify
        uglify: {
            // dist configuration is provided by useminPrepare
            // dist: {}
            foo: {        
                files: [{
                            expand: true,
                            cwd: './',
                            src: 'js/*.js',
                            dest: 'dist/'
                        }]        
            }
        },

        cssmin: {
            // dist configuration is provided by useminPrepare
            // dist: {}
            foo: {        
                files: [{
                            expand: true,
                            cwd: './',
                            src: 'css/*.css',
                            dest: 'dist/'
                        }]        
            }
        },

        // File revision - When usemin prepares the main.css and main.js
        // (new version of website) adds an additional extension (file revision number) to that main name 
        filerev: {
            // rules for filerev number
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },

            release: {
            // filerev:release hashes(md5) all assets (images, js and css ) in dist directory
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },

        // Usemin
        // Replaces all assets with their revved version in html and css files.
        // options.assetDirs contains the directories for finding the assets
        // according to their relative paths
        usemin: {
            html: ['dist/contactus.html','dist/aboutus.html','dist/index.html'],
            options: {
                assetsDirs: ['dist', 'dist/css','dist/js']
            }
        }

    });

    grunt.registerTask('css',['sass']);
    // 'watch' later or it will stop some functions
    grunt.registerTask('default',['browserSync', 'watch']);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ]);

};



