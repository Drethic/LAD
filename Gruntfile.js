module.exports = function(grunt) {
  var path = require('path');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          copy: true,
          targetDir: './src/app/libs',
          layout: function(type, component, source) {
              var renamedType = type;
              if (type == 'js') renamedType = 'js';
              else if (type == 'js/map') renamedType = 'js';
              else if (type == 'js/lang') renamedType = 'js/lang';
              else if (type == 'css') renamedType = 'css';
              else if (type == 'css/img') renamedType = 'css';
              return path.join(renamedType);
            },
          install: true,
          verbose: true,
          prune: false,
          cleanTargetDir: true,
          cleanBowerDir: true,
          bowerOptions: {
            production: false
          }
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-bower-task');

  // Default task(s).
  grunt.registerTask('default', ['bower:install']);

};