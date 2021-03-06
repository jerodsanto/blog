/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    favicons: {
      options: {
        appleTouchBackgroundColor: "#fff",
        appleTouchPadding: 30,
        coast: true
      },
      icons: {
        src: 'favicons/source.png',
        dest: '../'
      }
    },
    modernizr: {
      dist: {
        "devFile" : "remote",
        "outputFile" : "../js/modernizr-custom.js",
        "extra" : {
          "shiv" : true,
          "printshiv" : false,
          "load" : true,
          "mq" : false,
          "cssclasses" : true
        },
        "extensibility" : {
          "addtest" : false,
          "prefixed" : false,
          "teststyles" : false,
          "testprops" : false,
          "testallprops" : false,
          "hasevents" : false,
          "prefixes" : false,
          "domprefixes" : false
        },
        "uglify" : true,
        "tests" : ['canvas'],
        "parseFiles" : true,
        // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
        // You can override this by defining a "files" array below.
        // "files" : {
            // "src": []
        // },
        "matchCommunityTests" : false,
        "customTests" : []
      }
    },
    svgmin: {
      files: {
        expand: true,
        cwd: 'svgs',
        src: ['*.svg'],
        dest: 'svgs/minified/',
      }
    },
    grunticon: {
      icons: {
        files: [{
            expand: true,
            cwd: 'svgs/minified/',
            src: ['*.svg', '*.png'],
            dest: "icons/"
        }],
        options: {
          datasvgcss: "icons.data.svg.css",
          datapngcss: "icons.data.png.css",
          urlpngcss: "icons.fallback.css"
        }
      }
    },
    coffee: {
      compile: {
        files: {
          'js/site.js': 'js/site.coffee',
          'js/home.js': 'js/home.coffee'
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      blog: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'js/hashchange_patch.js',
          'bower_components/respond/dist/respond.src.js',
          'bower_components/bigfoot/dist/bigfoot.js',
          'bower_components/physicsjs/dist/physicsjs-full-0.6.0.js',
          'bower_components/jquery-hashchange/jquery.ba-hashchange.js',
          'bower_components/swiftype-search-jquery/jquery.swiftype.search.js',
          'js/site.js'
        ],
        dest: '../js/compiled.js'
      }
    },
    watch: {
      js: {
        options: {
          interrupt: true
        },
        files: ['js/*.coffee'],
        tasks: ['js']
      }
    },
    copy: {
      misc: {
        files: [
          {expand: true, src: ['images/*.svg'], dest: '../'},
          {expand: true, src: ['fonts/**/*'], dest: '../'},
          {expand: true, src: ['icons/**/*'], dest: '../'},
          {expand: true, cwd: 'favicons/', src: ['*'], dest: '../'}
        ]
      }
    },
    uglify: {
      build: {
        files: {
          '../js/compiled.min.js' : '../js/compiled.js',
          '../js/home.min.js' : 'js/home.js'
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['*.{png,jpg,gif}'],
          dest: '../images/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-favicons');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks("grunt-modernizr");

  grunt.registerTask('js', ['coffee', 'concat', 'uglify']);
  grunt.registerTask('icons', ['svgmin','grunticon','copy:misc']);
  grunt.registerTask('all', ['favicons', 'modernizr', 'icons', 'js', 'sass', 'imagemin']);
  grunt.registerTask('default', ['copy', 'js']);
};
