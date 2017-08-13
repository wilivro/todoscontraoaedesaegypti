'use strict';


module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/cursos',
          src: '**/*.js',
          dest: './'
        }]
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: [{
          expand: true,
          cwd: 'src/cursos/',
          src: ['**/*.css'],
          dest: './'
        }],
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/cursos/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: './'
        }]
      }
    },
    watch: {
      dev_site: {
        files: ['*'],
        tasks: ['default']
      }
    },
    htmlmin: {
      options: {
        cdata: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/cursos',
          src: '**/*.html',
          dest: './'
        }]
      }
    }
  });

  ['grunt-contrib-htmlmin',
    'grunt-contrib-uglify',
    'grunt-contrib-cssmin',
    'grunt-contrib-imagemin',
    'grunt-contrib-watch'].map(lib => grunt.loadNpmTasks(lib));

  grunt.registerTask('default', ['uglify', 'cssmin', 'imagemin', 'htmlmin']);
};
