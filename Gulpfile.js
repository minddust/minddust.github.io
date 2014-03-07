var gulp = require('gulp');
var util = require('gulp-util');

var clean = require('gulp-clean');
var concat = require('gulp-concat');
var header = require('gulp-header');
var less = require('gulp-less');
var recess = require('gulp-recess');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var pkg = require('./package.json');
var currentYear = util.date(new Date(), 'yyyy');

var paths = {
    scripts: [
        './_resources/vendors/jquery/2.1.0/jquery.js',
        './_resources/vendors/bootstrap/3.1.1/js/modal.js',
        './_resources/vendors/bootstrap/3.1.1/js/tooltip.js',
        './_resources/vendors/bootstrap/3.1.1/js/transition.js',
        './_resources/scripts/gallery.js',
        './_resources/scripts/google_analytics.js'
    ],
    styles: [
        './_resources/styles/minddust.less'
    ],
    statics: [
        './_resources/statics/**/*'
    ],
    build: './res'
};

var bannerScripts = [
    '/*!',
    ' * <%= pkg.name %> v<%= pkg.version %> | Copyright (c) 2012-<%= currentYear %> <%= pkg.author %> | <%= pkg.homepage %>',
    ' * jQuery JavaScript Library v2.1.0 | Copyright (c) 2005, 2014 jQuery Foundation, Inc. and other contributors | MIT license | http://jquery.com',
    ' * Bootstrap v3.1.1 | Copyright (c) 2011-2014 Twitter, Inc. | MIT license | http://getbootstrap.com',
    ' */',
    ''
].join('\n');

var bannerStyles = [
    '/*!',
    ' * <%= pkg.name %> v<%= pkg.version %> | Copyright (c) 2012-<%= currentYear %> <%= pkg.author %> | <%= pkg.homepage %>',
    ' * normalize.css v3.0.0 | Copyright (c) Nicolas Gallagher and Jonathan Neal | MIT License | http://git.io/normalize',
    ' * Font Awesome v4.0.3 | by @davegandy | Font: SIL OFL 1.1, CSS: MIT License | http://fontawesome.io',
    ' * Bootstrap v3.1.1 | Copyright (c) 2011-2014 Twitter, Inc. | MIT license | http://getbootstrap.com',
    ' */',
    ''
].join('\n');


gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('minddust.min.js'))
//        .pipe(uglify())
        .pipe(header(bannerScripts, {pkg: pkg, currentYear: currentYear}))
        .pipe(gulp.dest(paths.build));
});

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(recess())
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(header(bannerStyles, {pkg: pkg, currentYear: currentYear}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.build));
});

gulp.task('statics', function() {
    return gulp.src(paths.statics)
        .pipe(gulp.dest(paths.build))
});

gulp.task('clean', function() {
    return gulp.src('./res', {read: false})
        .pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['clean', 'scripts', 'styles', 'statics']);
