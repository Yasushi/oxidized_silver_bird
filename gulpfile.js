var gulp = require('gulp');
var crx = require('gulp-crx');
var fs = require('fs');
var manifest = require('./manifest.json');
var del = require('del');
var eslint = require('gulp-eslint');

gulp.task('lint', function() {
  return gulp.src(['lib/**/*.js','!lib/3rdparty/**/*.js'])
    .pipe(eslint({
      globals: {
        "chrome": false,
        "jQuery": false,
        "$": false
      },
      envs: ["browser"]
    }))
    .pipe(eslint.formatEach('compact'));
});

gulp.task('copy', function() {
  return gulp.src(['manifest.json', 'LICENSE*', 'README.md',
                   '*.html', '_locales/**', 'css/**', 'img/**', 'lib/**'],
                   {'cwdbase':true})
    .pipe(gulp.dest('./target/src'));
});

gulp.task('crx', function() {
  return gulp.src('target/src')
    .pipe(crx({
        privateKey: fs.readFileSync('oxidized_silver_bird.pem', 'utf8'),
      filename: manifest.name + "_" + manifest.version + '.crx'
    }))
    .pipe(gulp.dest('./target'));
});

gulp.task('clean', function (cb) {
  del(['target', 'tmp'], cb);
});
