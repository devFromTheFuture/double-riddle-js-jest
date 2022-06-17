
const path = require('path');
const TMP_DIR = process.env.TMP_DIR || path.resolve(__dirname, '../tmp/');
const SOLUTION_PATH = path.resolve(TMP_DIR, 'solution.js');



const main = () => {

    console.log('from test app');

    delete require.cache[require.resolve(SOLUTION_PATH)];
    const s = require(SOLUTION_PATH);

    solutionObject = {
        'roarX' : 'this is solution object',
        'methodCall' : s.method('param'),

        's.doSomething1' : (()=>{

            

            return 'xxxx'
        })(),
        
        's.add(1,2,3)' : s.add(1,2,3),
        's.add(1,1,1)' : s.add(1,1,1),
        's.add(2,3,4)' : s.add(2,3,4),

        's.add(5,5,5)' : s.add(5,5,5)
    }

    return solutionObject;

}

exports.main = main;