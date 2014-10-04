/* global module */

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            all: {
                files: {
                    'dist/checkboxutils.jquery.min.js': ['src/checkboxutils.jquery.js']
                },
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd H:MM:s") %> */\n',
                }
            }
        },
        
        jshint: {
            all: {
                src: [
                    'Gruntfile.js',
                    'src/**/*.js'
                ],
                options: {
                    jshintrc: true
                }
            }
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'uglify']);
};