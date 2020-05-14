// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
var browserstack = require('browserstack-local');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],

  'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',

  'capabilities': {
    'browserstack.user': (process.env.BROWSERSTACK_USERNAME),
    'browserstack.key': (process.env.BROWSERSTACK_ACCESS_KEY),
    'browserstack.local': true,
    'browserName': 'chrome',
    
    'project': "Tour of Heroes",
    'build': "localdev",
    'name': "Tour of Heroes local"
  },

  //directConnect: true,
  baseUrl: 'http://localhost:4200/',

  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },

  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },

  // Code to start browserstack local before start of test
  beforeLaunch: function () {
    console.log("Connecting local");
    return new Promise(function (resolve, reject) {
      exports.bs_local = new browserstack.Local();
      const bsOptions = {
        'key': exports.config.capabilities['browserstack.key'],
        //'key': (process.env.BROWSERSTACK_ACCESS_KEY),
        hosts: [{
          name: 'localhost',
          port: 4200,
          //  sslFlag: 0
        }],
        'verbose': 'true'
      };
      exports.bs_local.start(bsOptions, function (error) {
        if (error) return reject(error);
        console.log('Connected. Now testing...');

        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  afterLaunch: function () {
    return new Promise(function (resolve, reject) {
      exports.bs_local.stop(resolve);
    });
  }
};