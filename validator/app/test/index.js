

const main = async () => {

let result;
var rx;

try {

    const { spawnSync, execSync, spawn } = require( 'child_process' );

    console.log('b4 rx')
    rx = spawnSync( './node_modules/.bin/jest', {
        encoding: 'utf8',
        stdio: 'pipe',
        stderr: 'pipe'
    } );// [ '-lh', '/usr' ] );
    
    console.log( `stderr: ${rx.stderr}` );
    console.log( `stdout: ${rx.stdout}` );
    console.log( `status: ${rx.status}` );

    result = {
        stderr : rx && rx.stderr && rx.stderr ,
        stdout : rx && rx.stdout && rx.stdout,
        status : rx && rx.status && rx.status
    }
    

} catch(err) {

    console.log('ERROR');
    console.error(err);

    console.log( `stderr: ${err.stderr}` );
    console.log( `stdout: ${err.stdout}` );
    console.log( `status: ${err.status}` );

    result = {
        stderr : err && err.stderr && err.stderr,
        stdout : err && err.stdout && err.stdout,
        status : err && err.status && err.status
    }
    
    console.log('ERROR');

}

var status = result.status === 0 ? 'success' : 'fail';

let response = {
    statusCode : 200,
    body : {
        /*
        'status': JSON.stringify(status),
        'data'  : JSON.stringify(result)
        */
    }
}

response.body.status = status;
response.body.data   = result;

return response;

}

exports.main = main;

