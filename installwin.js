var electronInstaller = require('electron-winstaller');
var resultPromise = Promise = require('bluebird');
resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './build/package/test2-win32-x64',
    outputDirectory: './release',
    authors: 'My App Inc.',
    description:'asdfaf',
    version:"1.0.1"
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));