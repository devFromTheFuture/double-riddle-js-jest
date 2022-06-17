let main;

try {
    main = require('./main.js').main;
} catch(e) {
    console.log(e);
}

exports.lambdaHandler = main;