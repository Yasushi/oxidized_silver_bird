var gulp = require('gulp');
var gutil = require('gulp-util');
var crx = require('gulp-crx');
var zip = require('gulp-zip');
var exec = require('gulp-exec');
var fs = require('fs');
var manifest = require('./manifest.json');
var del = require('del');
var eslint = require('gulp-eslint');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

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

gulp.task('build-3rdparty', function() {
  var b = browserify({debug: true});
  b.require('jquery');
  b.require('jquery.ui.core');
  b.require('jquery.ui.widget');
  b.require('jquery.ui.mouse');
  b.require('jquery.ui.position');
  b.require('jquery.ui.draggable');
  b.require('jquery.ui.resizable');
  b.require('jquery.ui.sortable');
  b.require('jquery.ui.autocomplete');
  b.require('jquery.ui.tabs');
  b.require('jquery.effects.core');
  b.require('jquery.effects.blind');
  b.require('jquery.effects.bounce');
  b.require('jquery.effects.clip');
  b.require('jquery.effects.drop');
  b.require('jquery.effects.explode');
  b.require('jquery.effects.fold');
  b.require('jquery.effects.highlight');
  b.require('jquery.effects.pulsate');
  b.require('jquery.effects.scale');
  b.require('jquery.effects.shake');
  b.require('jquery.effects.slide');
  b.require('jquery.effects.transfer');
  return b.bundle()
    .pipe(source('3rdparty.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./target/src/lib'));
});


gulp.task('copy', ['gen'], function() {
  return gulp.src(['manifest.json', 'LICENSE*', 'README.md',
                   '*.html', '_locales/**', 'css/**', 'img/**', 'lib/**'],
                   {'cwdbase':true})
    .pipe(gulp.dest('./target/src'));
});

gulp.task('zip', ['build-3rdparty', 'copy'], function() {
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

gulp.task('ctags', function(cb){
  exec('ctags -e -R --exclude=node_modules  --exclude=target',
       function (err, stdout, stderr) {
         console.log(stdout);
         console.log(stderr);
         cb(err);
       });
});
