const SentimentAnalyser = require('../utils/SentimentAnalyser');

class SocketService {
    constructor(io) {
        this.io = io;
        this.sockets = [];

        io.on('connection', (socket) => {
            this.sockets.push(socket);
        });
    }

    // Incoming twitter message that we should handle
    handleTwitterMessage (message) {
        let sentiment = SentimentAnalyser.analyseMessage(message.text);

        this.sendMessageToAll('data', {
            message: message,
            sentiment: sentiment
        });
    }

    /**
     * Send a message to the given Socket.IO topic to all subscribed sockets
     * @param topic
     * @param message
     */
    sendMessageToAll(topic, message) {
        for (let socket of this.sockets) {
            socket.emit(topic, message);
        }
    }
}

module.exports = SocketService;