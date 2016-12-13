var sentiments = {
    "-5": 0,
    "-4": 0,
    "-3": 0,
    "-2": 0,
    "-1": 0,
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0
}
var tweets = [];

document.onreadystatechange = () => {
    init();
}

var init = () => {

    var tweetList = document.querySelector('#tweets');
    var updateDOM = (tweet) => {
        tweets.unshift(tweet);
        tweetList.insertBefore(tweet, tweetList.firstChild);
        if(tweets.length > 50) {            
            tweetList.removeChild(tweetList.lastChild);
            
        }
    }
    var setSentiments = () => {
        document.getElementById("sentiment_-4").innerHTML = sentiments["-5"] + sentiments["-4"];
        document.getElementById("sentiment_-2").innerHTML = sentiments["-3"] + sentiments["-2"];
        document.getElementById("sentiment_-1").innerHTML = sentiments["-1"];
        document.getElementById("sentiment_0").innerHTML = sentiments["0"];
        document.getElementById("sentiment_1").innerHTML = sentiments["1"];
        document.getElementById("sentiment_2").innerHTML = sentiments["2"];
        document.getElementById("sentiment_3").innerHTML = sentiments["3"];
        document.getElementById("sentiment_5").innerHTML = sentiments["4"] + sentiments["5"];
    }

    var socket = io('http://localhost:8000');
    socket.on('data', function (data) {
        //console.log(data);
        //console.log(JSON.stringify(data));
        
        // Polarity: [ -5, 5 ]
        var tweet = document.createElement('li');
        var tweetSmiley = document.createElement('img');
        tweetSmiley.src = 'images/' + data.sentiment.polarity + '.png';
        var tweetText = document.createElement('p');
        tweetText.innerHTML = data.message.text;

        sentiments[data.sentiment.polarity]++;
        setSentiments();

        tweet.appendChild(tweetText);
        tweet.appendChild(tweetSmiley);
                
        updateDOM(tweet);
        
    });
};