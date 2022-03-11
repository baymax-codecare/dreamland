const express = require('express');
const winston = require('winston');
const config = require('config');

const app = express();
const port = process.env.port || 3080;

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined...');
    process.exit(1);
}

require('./startup/routes')(app);
require('./startup/db')();

app.listen(port, () => winston.info(`Listening on port ${port}`));
