const util = require('util');
const exec = util.promisify(require('child_process').exec);
const crowdinMethods = require('./crowdin');

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

module.exports = {
  getOutputFromCommand,
  crowdinMethods
};