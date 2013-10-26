module.exports = function(grunt) {
  var name, latest, bannerContent, devRelease, minRelease,
      sourceMap, sourceMapUrl, lDevRelease, lMinRelease,
      lSourceMapMin;
 
  latest = '<%= pkg.name %>';
  name = '<%= pkg.name %>-v<%= pkg.version%>';
  bannerContent = '/*! <%= pkg.name %> v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
    ' *  License: <%= pkg.license %> */\n';
  devRelease = 'distrib/'+name+'.js';
  minReleaseJs = 'distrib/source.min.js';
  minReleaseCss = 'distrib/style.min.css';
  minReleaseImg = 'distrib/img/';
  sourceMapMin = 'distrib/'+name+'.min.js.map';
  sourceMapUrl = name+'.min.js.map';
 
  lDevRelease = 'distrib/'+latest+'.js';
  lMinRelease = 'distrib/'+latest+'.min.js';
  lSourceMapMin = 'distrib/'+latest+'.min.js.map';
   
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit:{
      target: {
        src: ['test/**/*.html']
      }
    },
    // configure copy task
    copy: {
      development: {
        src: devRelease,
        dest: lDevRelease
      },
      minified: {
        src: minRelease,
        dest: lMinRelease
      },
      smMinified: {
        src: sourceMapMin,
        dest: lSourceMapMin
      }
    },
    // configure concat task
    concat: {
      options: {
        banner: bannerContent
      },
      js: {
        src: ['src/*.js', 'src/**/*.js'],
        dest: minReleaseJs
      },
      css: {
        src: ['src/*.css','src/**/*.css'],  
        dest:  minReleaseCss
      }
    },
    // configure uglify task
    uglify:{
      options: {
        banner: bannerContent,
        sourceMapRoot: '../',
        sourceMap: sourceMapMin,
        sourceMappingURL: sourceMapUrl
      },
      target: {
        src: ['<%= concat.js.dest %>'],
        dest: minReleaseJs
      }
    },
    //configure cssmin task  
    cssmin: {
      minify: {
        src: ['<%= concat.css.dest %>'],
        dest: minReleaseCss,
        ext: '.min.css'
      }
    },
    //configure imagemin
    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: 'src/img', // cwd is 'current working directory'
            src: ['*.png'],
            dest: minReleaseImg, // Could also match cwd.
            ext: '.png'
          }
        ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            expand: true,
            cwd: 'src/img', // cwd is 'current working directory'
            src: ['*.jpg'],
            dest: minReleaseImg, // Could also match cwd.
            ext: '.jpg'
          }
        ]
      }
    },
    // configure jshint task
    jshint: {
      options: {
        trailing: true,
        eqeqeq: true
      },
      target: {
        src: ['src/*.js', 'test/*.js']
      }
    },
    //configure jasmine task
    jasmine: {
      pivotal: {
        src: 'src/*.js',
        options: {
          specs: 'src/spec/*Spec.js',
        }
      }
    },
});
 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
 
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'imagemin']);
};