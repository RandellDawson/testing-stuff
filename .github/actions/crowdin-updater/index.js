const core = require("@actions/core");
const github = require("@actions/github");

try {
  core.info(JSON.stringify(github.context.payload, null, 2));
  const { pull_request: { number: prNum } } = github.context.payload;
  core.info(`#${prNum} was merged`);
} catch (error) {
  core.setFailed(error.message);
}
