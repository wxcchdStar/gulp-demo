var gulp = require('gulp'),
  spritesmith = require('gulp.spritesmith'),
  htmlmin = require('gulp-htmlmin');
var del = require('del');
var plugins = require('gulp-load-plugins')();

gulp.task('clean', function() {
  return del(['build', 'rev']).then(function(paths) {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('image', function() {
  return gulp
    .src('src/img/*')
    .pipe(
      plugins.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      })
    )
    .pipe(gulp.dest('./build/images'));
});

gulp.task('html', function() {
  return gulp
    .src('./src/**/*.html')
    .pipe(plugins.useref())
    .pipe(plugins.if('./src/**/*.js', plugins.uglify()))
    .pipe(plugins.if('./src/**/*.css', plugins.cleanCss()))
    .pipe(
      htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
      })
    )
    .pipe(gulp.dest('./rev/html'));
});

gulp.task('js', function() {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(plugins.stripDebug())
    .pipe(plugins.jshint())
    .pipe(plugins.uglify())
    .pipe(plugins.rev())
    .pipe(gulp.dest('./build/js'))
    .pipe(plugins.rev.manifest())
    .pipe(gulp.dest('./rev/js'));
});

gulp.task('css', function() {
  return gulp
    .src('./src/css/**/*.css')
    .pipe(plugins.cleanCss())
    .pipe(plugins.rev())
    .pipe(gulp.dest('./build/css'))
    .pipe(plugins.rev.manifest())
    .pipe(gulp.dest('./rev/css'));
});

gulp.task('rev', ['js', 'css', 'html'], function() {
  return gulp
    .src(['./rev/**/*.json', './rev/html/**/*.html'])
    .pipe(plugins.revCollector())
    .pipe(gulp.dest('./build/'));
});

gulp.task('deploy', ['image', 'rev']);

// 本地开发服务器
const PORT = 8888;
gulp.task('server', function() {
  var params = {
    port: PORT,
    livereload: true,
    directoryListing: true,
    open: 'http://localhost:' + PORT + '/index.html'
  };
  gulp.src('./src').pipe(plugins.webserver(params));
});
