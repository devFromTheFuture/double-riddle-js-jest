const path = require('path');

const TMP_DIR = process.env.TMP_DIR ||  path.resolve(__dirname, 'tmp/');

const createSolutionObject = function(content) {

    content = "exports.solutionObject = " + JSON.stringify(content);

    const fs = require('fs');
    const filePath = path.resolve(TMP_DIR, 'solutionObject.js');

    try{
        fs.writeFileSync(filePath, content);
    } catch (e){
        console.log("Cannot write file ", e);
    }
}


const main = async (event = {}) => {

    const solutionObj = event.solutionObj;

    if (!solutionObj) {
        throw("no solution object");
    }

    const path = createSolutionObject(solutionObj);
    console.log(path);

    const validateApp = require('./test/index.js').main;
    console.log(validateApp);

    const testResult = await validateApp();

    return testResult;

}

exports.main = main;