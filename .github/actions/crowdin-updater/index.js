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
    core.info(`commit #${commit} was pushed`);
    const diffCommand = `git diff --name-status -m origin/master ${commit}^`;
    const diff = await getOutputFromCommand(diffCommand);
    const files = diff && diff.trim().split('\n');
    if (files && files.length) {
      const learnFileRegex = /^curriculum\/challenges\/english\//;
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
    core.info('done');
    process.exit();
    let prevCommitCommand = `git show ${commit}^:${filepath}`;
    let currCommitCommand = `git show ${commit}:${filepath}`;

    const oldContent = await getOutputFromCommand(prevCommitCommand);
    const newContent = await getOutputFromCommand(currCommitCommand);
    core.info(oldContent + '\n************\n' + newContent);
  } catch (error) {
    core.setFailed(error.message);
  }

})();