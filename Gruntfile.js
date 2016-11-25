module.exports = function (grunt) {
  var webpackConfig = require("./webpack.config.js");
  grunt.initConfig({
    clean: {
      js: ['./client/dist/**/*.js', './client/dist/**/*.map']
    },
    webpack: {
      options: webpackConfig,
      target: webpackConfig
    },
    concat: {
      js: {
        files: {
          // outputting all js files in src to bundle.js
          './client/dist/bundle.js': 'client/**/*.js'
        }
      }
    },
    eslint: {
      options: {
        configFile: './eslintrc.json'
      },
      target: ['./client/**/**.js', './test/**/*.js']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['clean', 'concat', 'webpack']);

  grunt.registerTask('lint', ['eslint']);

};