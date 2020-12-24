const core = require("@actions/core");
const github = require("@actions/github");

try {
  const prNum = core.getInput('pr-num');
  console.log(`PR # ${prNum} was merged`);
} catch (error) {
  core.setFailed(error.message);
}
