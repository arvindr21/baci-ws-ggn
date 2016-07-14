module.exports = function(grunt) {

    grunt.initConfig({
        uglify: {
            dev: {
                files: {
                    'dist/app.min.js': ['src/app1.js', 'src/app2.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
}
