const Twitter = require('twitter-lite');
const keys = require('./keys.js');
const language = require('@google-cloud/language');
const languageClient = new language.LanguageServiceClient();

const user = new Twitter({
    consumer_key: keys.APIkey,
    consumer_secret: keys.APIsecretkey,
});

async function getSentimentScore(text) {
    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };

    const [result] = await languageClient.analyzeSentiment({ document: document });
    const sentiment = result.documentSentiment;
    console.log(sentiment);
    return sentiment.score;
}


async function checkFor(text) {
    try {
        let response = await user.getBearerToken();
        console.log(`Got the following Bearer token from Twitter: ${response.access_token}`);

        const app = new Twitter({
            bearer_token: response.access_token,
        });

        response = await app.get(`/search/tweets`, {
            q: text, // The search term
            lang: "en",        // Let's only get English tweets
            count: 100,        // Limit the results to 100 tweets
        });

        let allTweets = "";
        for (tweet of response.statuses) {
            allTweets += tweet.text + "\n";
        }

        const sentimentScore = await getSentimentScore(allTweets);
        console.log(`The sentiment about text  is: ${sentimentScore}`);


    } catch (e) {
        console.log("There was an error calling the Twitter API.");
        console.dir(e);
    }
};

checkFor("apple");


