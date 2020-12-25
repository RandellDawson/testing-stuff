const core = require("@actions/core");
const util = require('util');

const getOutputFromCommand = async (command) => {
  try {
    const { stdout } = await exec(command);
    return stdout;
  }
  catch (err) {
    console.log('we have an error');
    console.log('command');
    console.log(command + '\n');
    return undefined
  };
};

(async () => {
  try {
    const commit = core.getInput('commit-sha');
    core.info(`commit #${commit} was pushed`);
    const exec = util.promisify(require('child_process').exec);
    const diffCommand = `git show -m --name-status ${commit}^..${commit}`;
    const diff = await getOutputFromCommand(diffCommand);
    core.info(diff);
    const files = diff.split('\n');
    if (files && file.length) {
      for (let file of files) {
        const [ change, filename ] = file.split(/\s+/);
        core.info(change + ' - ' + filename);
      }
    }
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