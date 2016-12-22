let config;
let defaultEnv = 'dev';
let allowed = ['dev', 'stag', 'prod', 'test'];
let processArg = process.argv[2];
let nodeEnv = process.env.NODE_ENV;

if (allowed.indexOf(processArg) === -1) {
    processArg = undefined;
}

if (allowed.indexOf(nodeEnv) === -1) {
    nodeEnv = undefined;
}

// Set environment
config = require('./app_' + (processArg || nodeEnv || defaultEnv));

module.exports = config;