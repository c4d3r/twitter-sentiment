'use strict';

// Load modules
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const sinon = require('sinon');

// Define shortcuts
const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const beforeEach = lab.beforeEach;
const after = lab.after;
const expect = Code.expect;

describe('Test', () => {
    let server;

    beforeEach((done) => {
        done();
    });

    it('hello world', (done) => {
        expect('hello world').to.equal('hello world');
        done();
    });
});