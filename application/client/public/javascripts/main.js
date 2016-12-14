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
var resetSentiments = () => {
    for(let key of Object.keys(sentiments)) {
        sentiments[key] = 0;
    }
}
var tweets = [];
var running = 1;
document.onreadystatechange = (readyState) => {
    if (document.readyState == "interactive") {
        console.log("Initiating application...");
        init();
    }
}

var init = () => {
    var keyword = document.getElementById("keyword");    
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

    var ctx = document.getElementById("sentimentChart");
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['<img src="images/-4.png"/>', "-2", "-1", "0", "1", "2", "3", "5"],
            datasets: [{
                label: 'Sentiments',
                data: Object.values(sentiments),
                backgroundColor: [
                    'rgba(255, 0, 0, 0.50)',
                    'rgba(255, 96, 0, 0.50)',
                    'rgba(255, 178, 0, 0.50)',
                    'rgba(255, 255, 0, 0.50)',
                    'rgba(214, 255, 0, 0.50)',
                    'rgba(155, 255, 0, 0.50)',
                    'rgba(96, 255, 0, 0.50)',
                    'rgba(50, 255, 0, 0.50)'
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 96, 0, 1)',
                    'rgba(255, 178, 0, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(214, 255, 0, 1)',
                    'rgba(155, 255, 0, 1)',
                    'rgba(96, 255, 0, 1)',
                    'rgba(50, 255, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    var socketListener = function (data) {
        //console.log(data);
        //console.log(JSON.stringify(data));
        
        // Polarity: [ -5, 5 ]        
        var tweet = document.createElement('li');
        var tweetSmiley = document.createElement('img');
        tweetSmiley.src = 'images/' + data.sentiment.polarity + '.png';
        var tweetText = document.createElement('p');
        tweetText.innerHTML = data.tweet.message;
        var tweetProfile = document.createElement('img')
        tweetProfile.src = data.tweet.profile_img;

        sentiments[data.sentiment.polarity]++;
        setSentiments();

        tweet.appendChild(tweetProfile);
        tweet.appendChild(tweetText);
        tweet.appendChild(tweetSmiley);
                
        updateDOM(tweet);

        // update chart
        chart.data.datasets[0].data = [
            sentiments["-5"] + sentiments["-4"],
            sentiments["-3"] + sentiments["-2"],
            sentiments["-1"],
            sentiments["0"],
            sentiments["1"],
            sentiments["2"],
            sentiments["3"],
            sentiments["4"] + sentiments["5"]
        ];                
        chart.update();        
    }

    var socket = io('http://localhost:3000');
    keyword.onchange = (event) => {
        if(!socket.connected) {
            alert("No connection!");
            return;
        }
        console.log("Changing keyword to: " + keyword.value);
        socket.emit('change-keyword', keyword.value);
        resetSentiments();
    };

    document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            // pause
            
            if(running == 1) {
                running = 0;
                console.log("Pausing application");
                socket.removeListener('data');
            } else {
                running = 1;
                socket.on('data', socketListener);
                console.log("Resuming application");
            }
        }
    }

    socket.on('data', socketListener);
};
