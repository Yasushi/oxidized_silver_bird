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

function barebuffer() {
  var through = require('through2');
  return through.obj(function(chunk, env, cb) {
    if (chunk.isStream()) {
      this.emit('error', new gutil.PluginError("barebuffer", 'Cannot operate on stream'));
    }
    else if (chunk.isBuffer()) {
      this.push(chunk.contents);
    }
    cb();
  })
}

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

function getJqueryUISrc() {
  var coreFiles = "{" + [
    "jquery.ui.core.js",
    "jquery.ui.widget.js",
    "jquery.ui.mouse.js",
    "jquery.ui.draggable.js",
    "jquery.ui.droppable.js",
    "jquery.ui.resizable.js",
    "jquery.ui.selectable.js",
    "jquery.ui.sortable.js",
    "jquery.ui.effect.js"
  ].join(",") + "}";

  var dir="./node_modules/jquery-ui/ui/";
  return gulp.src([dir+coreFiles, dir+"*.js" ]).pipe(barebuffer());
}

gulp.task('build-3rdparty', function() {
  var b = browserify({debug: true});
  b.require('jquery');
  b.require('jquery-migrate');
  b.require(getJqueryUISrc(), {file: 'jquery-ui.js', expose: 'jquery-ui'});
  b.require('twitter-text');
  return b.bundle()
    .pipe(source('3rdparty.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./target/src/lib'));
});


gulp.task('copy', function() {
  return gulp.src(['manifest.json', 'LICENSE*', 'README.md',
                   '*.html', '_locales/**', 'css/**', 'img/**', 'lib/**'],
                   {'cwdbase':true})
    .pipe(gulp.dest('./target/src'));
});

gulp.task('explode', ['build-3rdparty', 'gen', 'copy']);

gulp.task('zip', ['explode'], function() {
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
