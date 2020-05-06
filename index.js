const Twitter = require('twitter-lite');
const keys = require('./keys.js');

const user = new Twitter({
    consumer_key: keys.APIkey,
    consumer_secret: keys.APIsecretkey,
});

(async function() {
    try {
        // Retrieve the bearer token from twitter.
        const response = await user.getBearerToken();
        console.log(`Got the following Bearer token from Twitter: ${response.access_token}`);
        
        // Construct our API client with the bearer token.
        const app = new Twitter({
            bearer_token: response.access_token,
        });
    } catch(e) {
        console.log("There was an error calling the Twitter API.");
        console.dir(e);
    }
})();