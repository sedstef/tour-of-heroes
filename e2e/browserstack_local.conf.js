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

  'commonCapabilities': {
    'project': "Tour of Heroes",
    'build': "localdev",
    'name': "Tour of Heroes local",

    'browserstack.user': (process.env.BROWSERSTACK_USERNAME),
    'browserstack.key': (process.env.BROWSERSTACK_ACCESS_KEY),
    'browserstack.local': true,

    'browserstack.debug': 'true',
  },

  'multiCapabilities': [
    {
      'browserName': 'Chrome',
      'browserVersion': "80"
    },
    {
      'browserName': 'Chrome',
      'browserVersion': "81"
    },
    {
      'browserName': 'Safari',
      'browserVersion': "13"
    },
    {
      'browserName': 'Firefox',
      'browserVersion': "74"
    },
    {
      'browserName': 'Firefox',
      'browserVersion': "75"
    },
    {
      'browserName': 'Firefox',
      'browserVersion': "76"
    },
    {
      'browserName': 'Edge',
      'browserVersion': "81"
    },
    // {
    //   'browserName': 'IE'
    // },
  ],

  //directConnect: true,
  baseUrl: 'http://localhost:4502/',

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

    browser.resetUrl = 'about:blank';
  },

  // Code to start browserstack local before start of test
  beforeLaunch: function () {
    console.log("Connecting local");
    return new Promise(function (resolve, reject) {
      exports.bs_local = new browserstack.Local();
      const bsOptions = {
        'key': exports.config.commonCapabilities['browserstack.key'],
        hosts: [{
          name: 'localhost',
          port: 4502,
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

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
