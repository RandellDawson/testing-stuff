const core = require("@actions/core");
const github = require("@actions/github");

try {
  core.info(github.context.payload);
  const { pull_request: { number: prNum } } = github.context.payload;
  core.info(`PR # ${prNum} was merged`);
} catch (error) {
  core.setFailed(error.message);
}
