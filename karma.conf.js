// Karma configuration
// Generated on Sun May 24 2015 22:02:07 GMT+0900 (JST)

var istanbul = require('browserify-istanbul');
var proxyquire = require('proxyquireify');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'mocha', 'sinon-chrome'],


    // list of files / patterns to load in the browser
    files: [
      'target/src/lib/3rdparty.js',
      'lib/popup/requires.js',
      'lib/any_click.js',
      'lib/action_menu.js',
      'test/**/*_spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'lib/**/!(any_click).js': ['browserify'],
      'test/**/*_spec.js': ['browserify']
    },

    browserify: {
      debug: true,
      plugin: [proxyquire.plugin],
      transform: [
        istanbul({ignore: ['**/node_modules/**', '**/test/**'],
                  defaultIgnore: true}),
        'espowerify'
      ],
      configure: function(bundle) {
        bundle.on('prebundle', function() {
          bundle.external('jquery-ui');
        });
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      reporters: [
        { type: 'html', dir: 'coverage/' },
        //{ type: 'cobertura' /*other options*/ },
      ]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
