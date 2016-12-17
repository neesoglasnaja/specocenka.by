var gulp = require('gulp'),
    jade = require('gulp-jade'),
    watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var image = require('gulp-image');
var ext_replace = require('gulp-ext-replace');

var config = {
    css: './src/assets/styles/partials/**/*.css',
    mainCss: './src/assets/styles/main.css',
    jade: './src/**/index.jade',
    js: './src/assets/js/*.js',
    images: './src/assets/img/**',
    html: "./*.html",
    dist: "./public"
};
gulp.task('jade', function() {
    return gulp.src(config.jade)
        .pipe(jade({
            pretty: true
        }))
        .pipe(ext_replace('.php'))
        .pipe(gulp.dest(config.dist))
        .pipe(browserSync.stream());
});

gulp.task('css', function() {
    return gulp.src(config.mainCss)
        .pipe(
            postcss([
                require("postcss-easy-import"),
                require('precss')({}),
                require('postcss-calc')({warnWhenCannotResolve: true}),
                autoprefixer({ browsers: ['last 2 versions'] })
            ])
        )
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(gulp.dest(config.dist + '/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
  gulp.src(config.images)
    .pipe(image())
    .pipe(gulp.dest(config.dist + '/assets/img'));
});

gulp.task('js', function() {
    return gulp.src(config.js)
        .pipe(gulp.dest(config.dist + '/assets/js'))
        .pipe(browserSync.stream());
});

gulp.task('default', function() {
    browserSync.init({
        server: {
            baseDir: config.dist
        }
    });
    gulp.watch(config.jade, function(event) {
        gulp.run('jade');
    });
    gulp.watch([config.css, config.mainCss], function(event) {
        gulp.run('css');
    });
    gulp.watch(config.images, function(event) {
        gulp.run('images');
    });
    gulp.watch(config.js, function(event) {
        gulp.run('js');
    });
    gulp.watch(config.html).on('change', browserSync.reload);
});
