const core = require("@actions/core");
const { getOutputFromCommand, crowdinMethods: crowdin } = require('./utils');
const learnDir = '';
// incorporate the following into diffCommand once sure everything works
// const learnDir = ' -- curriculum/challenges/english';
const learnRegex = /^curriculum\/challenges\/english\/\d\d-(?!certificates)/;

(async () => {
  try {
    const commit = core.getInput('commit-sha');
    core.info(`commit # pushed: ${commit}`);

    const logCommand = `git log -n 5 --pretty=format:'%h -%d %s (%cr) <%an>' --abbrev-commit > log.txt`;
    const log = await getOutputFromCommand(logCommand);
    console.log('log below');
    console.log(log);

    const diffCommand = `git diff --name-status -m -M -C ${commit}^..${commit}${learnDir}`;
    const diff = await getOutputFromCommand(diffCommand);
    console.log('diff below');
    console.log(diff);

    const files = diff && diff.trim().split('\n');
    if (files && files.length) {
      const learnFiles = files
        .map(file => {
          const [change, origFilename, newFilename] = file.split(/\s+/);
          // only need about first letter of change status code
          let fileObj = { change: change[0], origFilename };
          if (newFilename) {
            fileObj = { ...fileObj, newFilename };
          }
          return fileObj;
        })
        .filter(({ change, origFilename, newFilename }) => {
          if (
            (change === 'A' || change === 'M' || change === 'D') &&
            origFilename.match(learnRegex)
          ) {
            return true;
          } else if (
            (change === 'R' || change === 'C') &&
            (origFilename.match(learnRegex) || newFilename.match(learnRegex))
          ) {
            return true;
          }
          return false;
        });
      console.log(
        learnFiles.length
          ? 'learn curriculum in commit\n' + JSON.stringify(learnFiles, null, 2)
          : 'no learn files in commit'
      );
      return learnFiles;
    }
    core.info('action complete');
  } catch (error) {
    core.setFailed(error.message);
  }

})();