const core = require("@actions/core");
const { getOutputFromCommand, crowdinMethods: crowdin } = require('./utils');
const learnRegex = /^curriculum\/challenges\/english\/\d\d-(?!certificates).+(?!part-\d\d\d\.md$)/i;
const learnDir = 'curriculum/challenges/english';

const defineFileChanges = async (file) => {
  let deleteFile, updateFile;
  const [statusCode, origFilename, newFilename] = file.split(/\s+/);
  // only need first letter of change status code
  statusCode = statusCode[0];
  switch (statusCode) {
    case 'A':
    case 'M':
      updateFile = origFilename;
      break;
    case 'D':
      deleteFile = origFilename;
      break;
    case 'R':
      deleteFile = origFilename;
      updateFile = newFilename;
      break;
    case 'C':
      updateFile = newFilename;
      break;
  }
  let fileChange = {};
  if (del) {
    fileChange = { ...fileChange, deleteFile };
  }
  if (update) {
    let command = `git show -C100% -M100% -m ${commit}:${update}`;
    const content = await getOutputFromCommand(command);
    fileChange = { ...fileChange, updateFile, content };
  }
  return fileChange;
};

(async () => {
  try {
    const commit = core.getInput('commit-sha');
    core.info(`commit # pushed: ${commit}`);

    const logCommand = `git log -n 5 --pretty=format:'%h -%d %s (%cr) <%an>' --abbrev-commit > log.txt`;
    const log = await getOutputFromCommand(logCommand);
    console.log('log of last 5 commits');
    console.log(log);

    const diffCommand = `git diff --name-status -m -M -C ${commit}^..${commit} -- ${learnDir}`;
    const diff = await getOutputFromCommand(diffCommand);
    console.log('diff');
    console.log(diff);

    const files = diff && diff.trim().split('\n');
    if (files && files.length) {
      const changedCurriculumFiles = files.map(defineFileChanges)
      console.log(
        changedCurriculumFiles.length
          ? 'learn curriculum in commit\n' + JSON.stringify(changedCurriculumFiles, null, 2)
          : 'no learn files in commit'
      );
      return changedCurriculumFiles;
    }
    core.info('action complete');
  } catch (error) {
    core.setFailed(error.message);
  }

})();