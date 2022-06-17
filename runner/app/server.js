'use strict';

const express = require('express');

const handler = require('./app.js').lambdaHandler;

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.json());
    
app.post('/', async function (req, res) {

    let appResult;
    try {
      appResult = await handler(req.body);
    } catch(e) {

      console.error('error:', e);
      const err = JSON.stringify(e, Object.getOwnPropertyNames(e));
    
      appResult = {
        error : err
      }
    }
      

    console.log('will return');
    console.log(appResult);

    res.send(appResult);
   // res.end();
})

app.get('/', (req, res) => {
  res.send('Hello World  xxx');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
