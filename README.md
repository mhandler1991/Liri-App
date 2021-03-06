# liri-node-app
Liri acts as a command prompt version of 'Siri' or 'Google'. It pulls requests from 3 different api's through the command prompt to find information on artists tours, songs, and movies. 

Problem being Solved:
The ability to quickly search information on band tours, spotify songs, & movies

App Orginzation:
The app is organized through a main file called liri.js which then feeds from installed packages and a handful of other files to run functionality

Deployed version can be found here: https://github.com/mhandler1991/liri-node-app

Developed soely by M Handler

### Integrations Used

1. Spotify API
2. Bands In Town API
3. OMDB API

### Packages Used

1. [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
2. [Axios](https://www.npmjs.com/package/axios)
3. [OMDB API](http://www.omdbapi.com) 
4. [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
5. [Moment](https://www.npmjs.com/package/moment)
6. [DotEnv](https://www.npmjs.com/package/dotenv)

# Images / Examples

### Concert This
1. The first input will be 'concert-this'
2. The second input will be *the band you want to search* 

![Bands In Town Request](/images/ct-request.png)

1. The following infomation will return:
    - Venue Name
    - Venue Location
    - Venue Dates

![Bands in Town Response](/images/ct-response.png)
*Response is then logged

### Spotify This
1. The first input will be 'spotify-this-song'
2. The second input will be *the song you want to search* 

![Bands In Town Request](/images/spotify-request.png)

1. The following infomation will return:
    - Artist
    - Term
    - Link
    - Album

![Bands in Town Response](/images/spotify-response.png)
*Response is then logged

### Movie This
1. The first input will be 'movie-this'
2. The second input will be *the movie you want to search* 

![Bands In Town Request](/images/m-request.png)

1. The following infomation will return:
    - Title
    - Year
    - Rating
    - Rotten Tomatoes Rating
    - Country of Production
    - Language
    - Plot
    - Actors

![Bands in Town Response](/images/m-response.png)
*Response is then logged

### Random This
1. The  input will be 'do-what-it-says'

![Bands In Town Request](/images/says-request.png)

This will pull a defined command and term from a text file and run the according functionality

![Bands in Town Response](/images/says-response.png)
*Response is then logged

### Code

````
// Requirements

require('dotenv').config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');

// User Inputs
var command = process.argv[2];
var term = process.argv.slice(3).join(" ");



// *********************
// Determine Functions
// *********************

// Determine Desired Request:
if (command === "concert-this") {

    console.log("Searching Bands in town api...");

    concertthis(term);

} else if (command === "spotify-this-song") {

    console.log("Searching Track in Spotify...");

    trackthis(term);

} else if (command === "movie-this") {

    console.log("Seaching Movie...");

    moviethis(term);

} else if (command === "do-what-it-says") {

    console.log("Doing what you say...");

    dothis(term);

} else {

    // Log Unknown Command
    console.log("!!!!!!!!!!!!!!!");
    console.log("Unknown command");
    console.log("Please use one of the following Commands:");
    console.log("1: concert-this");
    console.log("2: spotify-this-song");
    console.log("3: movie-this");
    console.log("4: do-what-it-says");
    console.log("!!!!!!!!!!!!!!!");

}



// *********************
// Functions
// *********************


// Bands in Town Functionality
function concertthis() {
    var search = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=********";

    axios.get(search).then(
        function (response) {

            // Create Response Object
            var log = {
                Venue_Name: response.data[0].venue.name,
                Venue_Location: response.data[0].venue.city + " " + response.data[0].venue.region,
                Venue_Date: moment(response.data[0].datetime).format("MMM Do YY")
            }

            // Console Log Response
            console.log("*Response*");
            console.log("");
            console.log(log);
            console.log("**********");
            console.log("");

            // Log onto a Txt.file
            fs.appendFile("log.txt", "\nConcert Request:" + log.Venue_Name + "," 
            + log.Venue_Location + "," + log.Venue_Date + "  ", function (err) {
                if (err) throw err;
                console.log("Log Created");
                console.log("**********");
            });
        });
}

// Spotify Functionality
function trackthis(term) {
    spotify.search({
        type: 'track',
        query: term
    }, function (err, response) {
        if (err) {
            // Log if Error
            return console.log('Error occurred: ' + err);
        }

        // Create Response Object
        var log = {
            Artist: response.tracks.items[0].album.artists[0].name,
            Term: term,
            Link: response.tracks.items[0].album.href,
            Album: response.tracks.items[0].album.name
        }

        // Console Log Response
        console.log("*Response*");
        console.log("");
        console.log(log);
        console.log("**********");
        console.log("");


        // Log onto a Txt.file
        fs.appendFile("log.txt", "\nSpotify Request:" + log.Artist + "," 
        + log.Term + "," + log.Link + "," + log.Album + "  ", function (err) {
            if (err) throw err;
            console.log("Log Created");
            console.log("**********");
        });

    });
}

// OMDB Fuctionality
function moviethis() {

    // Variables
    var api = "********";
    var url = "http://www.omdbapi.com/?apikey=" + api + "&t=" + term

    axios.get(url).then(function (response) {

        // Full Resonse Log
        // console.log(response.data);

        var log = {
            // * Title of the movie
            Title: response.data.Title,
            // * Year the movie came out
            Year: response.data.Year,
            // * OMDB Rating of the movie
            Rating: response.data.imdbRating,
            // * Rotten Tomatoes Rating of the movie
            Rotten_Tomates_Rating: response.data.Ratings[1].Value,
            // * Country where the movie was produced
            Country_Production: response.data.Country,
            // * Language of the movie
            Language: response.data.Language,
            // * Plot of the movie
            Plot: response.data.Plot,
            // * Actors in the movie
            Actors: response.data.Actors
        }

        // Console Log Response
        console.log("*Response*");
        console.log("");
        console.log(log);
        console.log("**********");
        console.log("");

        // Log onto a Txt.file
        fs.appendFile("log.txt", "\nOMDB Request:" + log.Title + "," 
        + log.Year + "," + log.Rating + "," + log.Rotten_Tomates_Rating + "," 
        + log.Country_Production + "," + log.Language + "," + log.Plot + "," + log.Actors + "  ", 
        function (err) {
            if (err) throw err;
            console.log("Log Created");
            console.log("**********");
        });
    })

}

function dothis() {

    fs.readFile("random.txt", "utf8", (err, data) => {
        if (err) throw err;

        var arr = data.split(',');

        console.log("File States:")
        console.log(arr);
        console.log("");
        console.log("------------");
        console.log("");

        var cmd = arr[0];
        var rdm = arr[1];

        // Determine Desired Request:
        if (cmd === "concert-this") {

            console.log("Searching Bands in town api...");

            concertthis(rdm);

        } else if (cmd === "spotify-this-song") {

            console.log("Searching Track in Spotify...");

            trackthis(rdm);

        } else if (cmd === "movie-this") {

            console.log("Seaching Movie...");

            moviethis(rdm);

        } else {

            // Log Unknown Command
            console.log("!!!!!!!!!!!!!!!");
            console.log("Unknown command");
            console.log("Please use one of the following Commands:");
            console.log("1: concert-this");
            console.log("2: spotify-this-song");
            console.log("3: movie-this");
            console.log("4: do-what-it-says");
            console.log("!!!!!!!!!!!!!!!");

        }

    })
}
````