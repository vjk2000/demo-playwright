// tests/bdd/cucumber.cjs
module.exports = {
  default: {
    require: ["tests/bdd/steps/**/*.cjs"],
    publishQuiet: true,
    format: ["progress", "json:reports/cucumber-report.json"],
    paths: ["tests/bdd/features/**/*.feature"],
    worldParameters: {
      // optional fallback
      baseUrl: "http://127.0.0.1:5173"
    }
  }
};
