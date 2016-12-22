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

const SentimentAnalyser = require('../../application/server/src/utils/SentimentAnalyser');

describe('SentimentAnalyser', () => {
    let server;

    beforeEach((done) => {
        done();
    });

    it('The sentiment analyser should return a correct sentiment on analyse', (done) => {
        let result = SentimentAnalyser.analyseMessage("happy");
        expect(result.polarity).to.equal(3);
        done();
    });

    it('If bigger than 5 it should be capped to 5', (done) => {
        let result = SentimentAnalyser.analyseMessage("@Vukaradzic Have i been good enough to get a follow as a christmas present? :)");
        expect(result.polarity).to.equal(5);
        done();
    });

    it('If smaller than -5 it should be capped to -5', (done) => {
        let result = SentimentAnalyser.analyseMessage("If I ever see this, I fucking swear, I'm going OFF https://t.co/rEObFKgPe9");
        expect(result.polarity).to.equal(-5);
        done();
    });
});