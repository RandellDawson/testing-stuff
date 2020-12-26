const core = require("@actions/core");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const getOutputFromCommand = async (command) => {
  try {
    const { stdout } = await exec(command);
    return stdout;
  }
  catch (err) {
    console.log('we have an error');
    console.log('command');
    console.log(command + '\n');
    console.log(err.stderr);
    return null;
  };
};

(async () => {
  try {
    const commit = core.getInput('commit-sha');
    core.info(`commit # pushed: ${commit}`);
    // need to research why the following diff command does not work
    // const diffCommand = `git diff --name-status -m ${commit}^..${commit}`;

    const logCommand = `git log -n 10 --pretty=format:'%h -%d %s (%cr) <%an>' --abbrev-commit > log.txt`;
    const log = await getOutputFromCommand(logCommand);

    const diffCommand = `git diff --name-status -m ${commit}^..${commit}`;
    const diff = await getOutputFromCommand(diffCommand);
    console.log(diff);

    const files = diff && diff.trim().split('\n');
    if (files && files.length) {
      const learnFileRegex = /^curriculum\/challenges\/english\/\d\d-(?!certifications)/;
      const learnFiles = files
        .map(file => {
          const [ change, filename ] = file.split(/\s+/);
          return { change, filename };
        })
        .filter(file => learnFileRegex.test(file.filename));
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