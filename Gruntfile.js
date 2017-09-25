'use strict';

module.exports= function(grunt){
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt);
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
        }
        
    });
    
    grunt.registerTask('css',['sass']);
    // 'watch' later or it will stop some functions
    grunt.registerTask('default',['browserSync', 'watch']);
    
};