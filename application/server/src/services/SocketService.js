const SentimentAnalyser = require('../utils/SentimentAnalyser');

const Path = require('path');
const config = require(Path.join(__dirname, '../../config'));

const twitter = require('twitter');
const twit = new twitter(config.third_party.twitter);

class SocketService {
    constructor(io) {
        this.io = io;
        this.sockets = [];

        io.on('connection', (socket) => {

            // client joined
            console.log("Client joined!");

            let keyword = 'christmas';
            this.twitStream(socket, keyword);

            // keyword changes
            socket.on('change-keyword', (word) => {
                console.log('changing keyword!');
                this.twitStream(socket, word);
            });


            this.sockets.push(socket);
        });
    }

    twitStream(socket, keyword) {
        twit.stream('statuses/filter', { track: keyword }, (stream) => {
            stream.on('data', (data) => {

                if (!socket.connected) return;

                let sentiment = SentimentAnalyser.analyseMessage(data.text);
                let tweet = {
                    message: data.text,
                    profile_img: (data.user) ? data.user.profile_image_url : ""
                };

                socket.emit('data', {
                    tweet: tweet,
                    sentiment: sentiment
                });
            });
            stream.on('error', error => {
                console.log(error);
            });

            socket.on('disconnect', () => {
                stream.destroy();
            });
            socket.on('change-keyword', (word) => {
                stream.destroy();
            });
        });
    }

    // Incoming twitter message that we should handle
    handleTwitterMessage(message) {
        let sentiment = SentimentAnalyser.analyseMessage(message);
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