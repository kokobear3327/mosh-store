module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("@angular-devkit/build-angular/plugins/karma")
    ],
    client: {
<<<<<<< HEAD
      clearContext: false // leave Jasmine Spec Runner output visible in browser
=======
      clearContext: false
>>>>>>> 755f4f3... initialized angular, deleted unnecessary files and all comments
    },
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "./coverage/mosh-store"),
      reports: ["html", "lcovonly", "text-summary"],
      fixWebpackSourcePaths: true
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true
  });
};
