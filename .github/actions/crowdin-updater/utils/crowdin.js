const updateFile = (origFilename, newFilename) => {
  console.log('origFileName: ' + origFilename);
  if (newFilename) {
    console.log('newFileName: ' + newFilename);
  }
};

const deleteFile = origFilename => {
  console.log('deleted file: ' + origFilename);
};

module.exports = {
  updateFile,
  deleteFile
};