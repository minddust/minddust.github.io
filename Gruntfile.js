module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            resources: {
                files: {
                    '.temp/minddust.js': [
                        '_resources/vendors/jquery/2.0.3/jquery.js',
                        '_resources/vendors/bootstrap/3.0.3/js/modal.js',
//                        '_resources/vendors/ekko-lightbox/3.0.3a/js/ekko-lightbox.js',
                        '_resources/javascript/ekko-lightbox-font-awesome.js',
                        '_resources/javascript/minddust.js',
                        '_resources/javascript/google_analytics.js'
                    ]
                }
            }
        },

        uglify: {
            temp: {
                options: {
                    banner: '/*!\n' +
                            ' * <%= pkg.name %> v<%= pkg.version %> | Copyright (c) 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %> | minddust.com\n' +
                            ' * jQuery v2.0.3 | Copyright (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license\n' +
                            ' * Bootstrap v3.0.3 | Copyright (c) 2013 Twitter, Inc | Apache License v2.0 | getbootstrap.com\n' +
                            ' * Lightbox for Bootstrap 3 by @ashleydw v3.0.3a | GNU v2 License | github.com/ashleydw/lightbox\n' +
                            ' * google-analytics\n' +
                            ' */\n'
                },
                files: {
                    '.build/minddust.min.js': '.temp/minddust.js'
                }
            }
        },

        jshint: {
            build: {
                options: {
                    bitwise: false,
                    camelcase: true,
                    curly: true,
                    eqeqeq: true,
                    es3: false,
                    forin: true,
                    freeze: true,
                    immed: true,
                    indent: true,
                    latedef: true,
                    newcap: true,
                    noarg: true,
                    noempty: true,
                    nonew: true,
                    plusplus: true,
                    quotmark: 'single',
                    undef: false,
                    unused: true,
                    strict: true,
                    trailing: true
                },
                files: {
                    src: ['_resources/javascript/**/*.js']
                }
            }
        },

        recess: {
            minddust: {
                options: {
                    compile: false,
                    compress: true
                },
                files: {
                    '.build/minddust.min.css': [
                        '_resources/styles/minddust.less'
                    ]
                }
            }
        },

        clean: {
            build: {
                src: ['.build/', '.temp/']
            },
            assets: {
                src: ['res/*']
            }
        },

        copy: {
            static: {
                files: [{
                    expand: true,
                    cwd: '_resources/static/',
                    src: '**',
                    dest: '.build/'
                }]
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '.build/',
                    src: '**',
                    dest: 'res/'
                }]
            }
        },

        file_append: {
            default_options: {
                files: {
                    '.build/minddust.min.css': {
                        prepend: '/*!\n' +
                                 ' * <%= pkg.name %> v<%= pkg.version %> | Copyright (c) 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %> | minddust.com\n' +
                                 ' * Bootstrap v3.0.3 | Copyright (c) 2013 Twitter, Inc | Apache License v2.0 | getbootstrap.com\n' +
                                 ' * normalize.css v2.1.3 | Copyright (c) Nicolas Gallagher and Jonathan Neal | MIT License | git.io/normalize\n' +
                                 ' * Lightbox for Bootstrap 3 by @ashleydw v3.0.3a | GNU v2 License | github.com/ashleydw/lightbox\n' +
                                 ' * Ghostwriter (commit c2f34af) | Copyright (c) 2013 Rory Gibson | MIT License | github.com/roryg/ghostwriter\n' +
                                 ' */\n'
                    }
                }
            }
        },

        watch: {
            resources: {
                files: ['_resources/javascript/**/*', '_resources/styles/**/*'],
                tasks: ['default']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-file-append');

    grunt.registerTask('clean-all', ['clean:build', 'clean:assets']);

//    grunt.registerTask('build-js', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('build-js', ['concat', 'uglify']);
    grunt.registerTask('build-css', ['recess']);
    grunt.registerTask('build', ['build-js', 'build-css']);

    grunt.registerTask('default', ['clean-all', 'copy:static', 'build', 'file_append', 'copy:build', 'clean:build']);
};
