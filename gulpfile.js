var gulp = require('gulp');
var gutil = require('gulp-util');
var crx = require('gulp-crx');
var zip = require('gulp-zip');
var fs = require('fs');
var manifest = require('./manifest.json');
var del = require('del');
var eslint = require('gulp-eslint');
var bowerFiles = require('main-bower-files');

gulp.task('bower', function() {
  return gulp.src(bowerFiles())
      .pipe(gulp.dest('3rdparty'));
});

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

function string_src(filename, string) {
  var src = require('stream').Readable({ objectMode: true });
  src._read = function () {
    this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }));
    this.push(null);
  };
  return src;
}

gulp.task('gen', function() {
  var keys = require('./secret_keys.json');
  return string_src("lib/secret_keys.js","var SecretKeys = { twitter:{consumerSecret:'" +keys['consumerSecret']+"',consumerKey:'"+keys['consumerKey']+"'},hasValidKeys: function() {return true;}};")
    .pipe(gulp.dest("target/src"));
});

gulp.task('copy', ['gen'], function() {
  return gulp.src(['manifest.json', 'LICENSE*', 'README.md',
                   '*.html', '_locales/**', 'css/**', 'img/**', 'lib/**'],
                   {'cwdbase':true})
    .pipe(gulp.dest('./target/src'));
});

gulp.task('zip', ['copy'], function() {
  return gulp.src('target/src/**/*')
    .pipe(zip(manifest.name + "_" + manifest.version + '.zip'))
    .pipe(gulp.dest('./target'));
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

gulp.task('watch', function() {
  gulp.watch(['manifest.json', 'LICENSE*', 'README.md', '*.html', '_locales/**', 'css/**', 'img/**', 'lib/**','!lib/3rdparty/**/*.js'], ['copy']);
});
