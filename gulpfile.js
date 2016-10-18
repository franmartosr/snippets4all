'use strict';
let gulp = require('gulp');
let babel = require('gulp-babel');
let cleanCSS = require('gulp-clean-css');
let concat = require('gulp-concat');
let exec = require('child_process').exec;
let eslint = require('gulp-eslint');
let jshint = require('gulp-jshint');
let purifycss = require('gulp-purifycss');
let runSequence = require('run-sequence');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let uglify = require('gulp-uglify');

const basePaths = {
  styles: 'src/css/'
};
const paths = {
  html: 'src/html/*.html',
  js: 'src/js/**/*.js',
  jsLibs: 'src/libs/*.js',
  scss: basePaths.styles + 'scss/**/*.scss',
  server: 'server.js'
};

gulp.task('styles', () => {
  return gulp.src([basePaths.styles + 'bootstrap*.css', paths.scss])
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed',
        sourceComments: false
      }).on('error', sass.logError)
    )
    .pipe(concat('all.min.css'))
    .pipe(purifycss([paths.js, paths.html, 'index.html']))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('lintJS', () => {
  return gulp.src(paths.js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(eslint({ configFile: '.eslintrc' }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('libs', () => {
  return gulp.src(paths.jsLibs)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js/libs'));
});

gulp.task('scripts', () => {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(babel({
      minified: true,
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', () => {
  const watchProps = {
    debounceDelay: 2000,
    interval: 1000
  };

  gulp.watch(paths.js, watchProps, () => runSequence('lintJS', 'scripts'));
  gulp.watch(paths.scss, watchProps, 'styles');
});

gulp.task('server', () => {
  let server = exec('nodemon ' + paths.server + ' --watch ' + paths.server);
  server.stdout.on('data', process.stdout.write.bind(process.stdout));
  server.stderr.on('data', process.stderr.write.bind(process.stderr));
  return server;
});

gulp.task('default', () => runSequence(['scripts', 'libs', 'styles'], ['watch', 'server']));