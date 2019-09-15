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
    var search = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

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
            fs.appendFile("log.txt", "\nConcert Request:" + log.Venue_Name + "," + log.Venue_Location + "," + log.Venue_Date + "  ", function (err) {
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
        fs.appendFile("log.txt", "\nSpotify Request:" + log.Artist + "," + log.Term + "," + log.Link + "," + log.Album + "  ", function (err) {
            if (err) throw err;
            console.log("Log Created");
            console.log("**********");
        });

    });
}

// OMDB Fuctionality
function moviethis() {

    // Variables
    var api = "trilogy";
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
        fs.appendFile("log.txt", "\nOMDB Request:" + log.Title + "," + log.Year + "," + log.Rating + "," + log.Rotten_Tomates_Rating + "," + log.Country_Production + "," + log.Language + "," + log.Plot + "," + log.Actors + "  ", function (err) {
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