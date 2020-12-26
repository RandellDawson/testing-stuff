const core = require("@actions/core");
const { getOutputFromCommand, crodinMethods: crowdin } = require('./utils');
const learnDir = '';
// incorporate the following into diffCommand once sure everything works
// const learnDir = ' -- curriculum/challenges/english';
const learnRegex = /^curriculum\/challenges\/english\/\d\d-(?!certifications)/;

(async () => {
  try {
    const commit = core.getInput('commit-sha');
    core.info(`commit # pushed: ${commit}`);

    const logCommand = `git log -n 10 --pretty=format:'%h -%d %s (%cr) <%an>' --abbrev-commit > log.txt`;
    const log = await getOutputFromCommand(logCommand);

    const diffCommand = `git diff --name-status -m -M -C ${commit}^..${commit}${learnDir}`;
    const diff = await getOutputFromCommand(diffCommand);
    console.log('diff below');
    console.log(diff);

    const files = diff && diff.trim().split('\n');
    if (files && files.length) {
      const learnFiles = files
        .map(file => {
          const [change, origFilename, newFilename] = file.split(/\s+/);
          let fileObj = { change, origFilename };
          if (newFilename) {
            fileObj = { ...fileObj, newFilename };
          }
          return fileObj;
        })
        .filter(({ change, origFilename, newFilename }) => {
          // only need about first letter of change status code
          const code = change[0];
          if (
            (code === 'A' || code === 'M' || code === 'D') &&
            origFilename.match(learnRegex)
          ) {
            return true;
          } else if (
            (code === 'R' || code === 'C') &&
            (origFilename.match(learnRegex) || newFilename.match(learnRegex))
          ) {
            return true;
          }
          return false;
        });
      console.log(
        learnFiles.length
          ? 'learn files in commit\n' + JSON.stringify(learnFiles, null, 2)
          : 'no learn files in commit'
      );
    }
    core.info('action complete');
    process.exit();
  } catch (error) {
    core.setFailed(error.message);
  }

})();