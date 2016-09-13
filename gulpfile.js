var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    cp          = require('child_process'),
    jade        = require('gulp-jade'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/* Build the Jekyll Site */
gulp.task('jekyll-dev', function (done) {
  browserSync.notify('<span style="color: grey">Running:</span> $ jekyll build');
  return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--config=_config.yml,_config_dev.yml'], {stdio: 'inherit'})
    .on('close', done);
});

/* Build the Jekyll Site */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});



/* Rebuild Jekyll & do page reload */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});
gulp.task('jekyll-rebuild-dev', ['jekyll-dev'], function () {
    browserSync.reload();
});


/* Wait for jekyll-dev, then launch the Server */
gulp.task('browser-sync-dev', ['sass', 'jekyll-dev'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
});
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
});



/* Compile files from _sass into both _site/assets/css (for live injecting) and _sass (for future jekyll builds) */
gulp.task('sass', function () {
 return gulp.src('_sass/**/*.sass')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('_site/assets/css'))
  .pipe(browserSync.reload({stream:true}))
});


/* Travis is trying to Gulp stuf */

gulp.task('jade', function(){
  return gulp.src('_jadefiles/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('_includes'));
});


gulp.task('scripts', function() {
  return gulp.src([''])
    .pipe(sourcemaps.init())
    .pipe(concat('global.js'))
    .pipe(gulp.dest('_js'))
    .pipe(rename('global.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_site/assets/js'));
});


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_sass/**/*.sass', ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*'], ['jekyll-rebuild', 'sass', 'scripts']);
    gulp.watch('_js/*.js', ['scripts']);
    gulp.watch('_jadefiles/*.jade', ['jade']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch', 'sass', 'scripts']);
gulp.task('dev', ['browser-sync-dev', 'watch', 'sass', 'scripts']);
