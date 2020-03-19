const core = require("@actions/core");
const github = require("@actions/github");

try {
  const labelsToFail = core.getInput("labels-to-fail");
  if (!Array.isArray(labelsToFail)) {
    throw new Error('Input labels-to-fail should be an array');
  }

  const prLabels = github.context.payload.pull_request.labels;
  console.log('PR Labels: ' + JSON.stringify(prLabels));
  if ( prLabels.some(prLabel => labelsToFail.includes(prLabel))) {
    console.log('Found a label to fail on this PR');
  }
  process.exit(0);
} catch (error) {
  core.setFailed(error.message);
}
