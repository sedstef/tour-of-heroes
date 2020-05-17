const scanner = require("sonarqube-scanner");

scanner(
  {
    serverUrl: (process.env.SONAR_HOST_URL),
    token: (process.env.SONAR_AUTH_TOKEN),
    options: {
      "sonar.projectVersion": "1.1.0",
      "sonar.sources": "src",
      //"sonar.tests": "tests",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      //"sonar.testExecutionReportPaths": "test-report.xml"
    },
  },
  () => {
    // callback is required
  }
);
