// Karma configuration
// Generated on Sun May 24 2015 22:02:07 GMT+0900 (JST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chrome'],


    // list of files / patterns to load in the browser
    files: [
      'lib/math_utils.js',
      'lib/tweet_transforms.js',
      'node_modules/power-assert/build/power-assert.js',
      'test/**/*_spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.js': ['espower'],
      'lib/**/*.js': ['coverage']
    },

    // espowerPreprocessor: {
    //   options: {
    //     // emit espowerified code.
    //     // default: false (in-memory)
    //     emitActualCode: true
    //   },
    //   transformPath: function(path) {
    //     // default
    //     return path.replace(/\.js$/, '.espowered.js');
    //   }
    // },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
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
