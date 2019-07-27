module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'browserify'],
    preprocessors: {
      'custom-jquery.specs.js': [ 'browserify' ]
    },
    files: [
      'jquery.js',
      'custom-jquery.specs.js'
    ],
    reporters: ['mocha'],
    colors: true,
    autoWatch: false,
    browsers: [],
    singleRun: true
  });
};
