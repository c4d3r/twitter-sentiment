(function () {
    var socket = io('http://localhost:8000');
    socket.on('data', function (data) {
        //console.log(data);
        //console.log(JSON.stringify(data));
        var tweetList = document.querySelector('#tweets');

        // Polarity: [ -5, 5 ]
        var tweet = document.createElement('li');
        var tweetSmiley = document.createElement('img');
        tweetSmiley.src = 'images/' + data.sentiment.polarity + '.png';
        var tweetText = document.createElement('p');
        tweetText.innerHTML = data.message.text;

        tweet.appendChild(tweetText);
        tweet.appendChild(tweetSmiley);

        tweetList.appendChild(tweet);
    });
})();