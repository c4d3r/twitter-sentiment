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

const SocketService = require('../../application/server/src/services/SocketService');

describe('SocketService', () => {
    let server;

    beforeEach((done) => {
        done();
    });

    it('The constructor should correctly initialize the default parameters', (done) => {
        let io = {
            on: (name, cb) => {
                return cb(socket);
            }
        };

        let socket = {
            on: (name, cb) => {
                return cb(`socket_${name}_ok`);
            }
        };

        let socketService = new SocketService(io);
        expect(socketService.sockets).to.equal([ socket ]);
        expect(socketService.io).to.equal(io);

        done();
    });

    it('should send a message to all sockets when calling sendMessageToAll', (done) => {
        let socketsCalled = 0;

        let io = {
            on: (name, cb) => {
                switch (name) {
                    case 'connection':
                        return cb(socket);
                        break;
                    default:
                        return cb('not_implemented');
                }
            }
        };

        let socket = {
            on: (name, cb) => {
                return cb(`socket_${name}_ok`);
            },
            emit: (topic, message) => {
                socketsCalled++;
                return `topic_${topic}_message_${message}_called`;
            }
        };

        let socketService = new SocketService(io);

        socketService.sendMessageToAll("test-topic", "test-message");
        expect(socketsCalled).to.equal(1);
        done();
    });
});