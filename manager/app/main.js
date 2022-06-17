import fetch from 'node-fetch';

const sendJSON = async (where, body) => {
    const response = await fetch(where, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
    return response;
}


const sendToRunner = async solutionFile => {

    const runnerURL = 'http://app-runner:8080'; //'http://localhost:9000';

    const body = {
        solution: solutionFile
    };

    console.log('sending to runner', body);

    const response = await sendJSON(runnerURL, body);
    const data     = response.json();

    return data;
}

const sendToValidator = async solutionObj => {

    const validatorURL = 'http://app-validator:8080'; // 'http://localhost:9001';

    const body = {
        solutionObj : solutionObj,
    }

    console.log('sending to validator', body);

    const response = await sendJSON(validatorURL, body)
    const data     = response.json();

    return data;
}


export const main = async ( event = {}) => {

    console.log('welcome to manager');

    const solutionFile = event.solution;

    if (!solutionFile) {
        throw("no solution file");
    }

    const runnerResponse = await sendToRunner(solutionFile);
    if (runnerResponse.error) {
        throw (runnerResponse.error);
    }
    console.log('runner response', runnerResponse);

    const validatorResponse = await sendToValidator(runnerResponse);
    console.log('validator response', validatorResponse);

    if (validatorResponse.body && validatorResponse.body.status && validatorResponse.body.status === 'fail') {
        throw (validatorResponse);
    }

    const response = {
        status : 200,
        welcome: 'from manager',
        response : validatorResponse
    }

    console.log(JSON.stringify(response));

    return response;

    
}
