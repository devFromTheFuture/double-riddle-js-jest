const path = require('path');
const TMP_PATH = process.env.TMP_DIR || path.resolve(__dirname, 'tmp/');

const createSolutionFile =  function(content) {

    console.log('createSolutionFile f() in runner')

    const fs = require('fs');
    const filePath = path.resolve(TMP_PATH, 'solution.js');

    try{
        fs.writeFileSync(filePath, content);
    } catch (e){
        console.log("Cannot write file ", e);
    }
    return filePath;
}

const main = async ( event = {}) => {

    const solutionFile = event.solution;

    if (!solutionFile) {
        throw("no solution file");
    }

    const path = createSolutionFile(solutionFile);
    console.log(path);

    const testApp = require('./test/index.js').main;
    console.log(testApp);
    const solutionObj = await testApp();

    return {
        solutionObj
    };

    
}

exports.main = main;