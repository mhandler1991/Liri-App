//`node liri.js concert-this <artist/band name here>`
//This will search the Bands in Town Artist Events API 
// (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) 
// for an artist and render the following information about each event to the terminal:
//Name of the venue
//Venue location

var axios = require("axios");

function bit(search){

    console.log(search);

    var api = "";

    // Search
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=" + api)
    .then(function(response){
        console.log(response.data);

        var venue = "";
        var location = "";
        var date = "";

        // var BitInfo = function(){
        //     this.venue = response.data;
        //     this.location = response.data;
        //     this.date = response.data
        // }

        // Log Venue
        console.log("Venue: ",venue);
        // Log Location
        console.log("location: ", location);
        // log date
        console.log("date: ", date);        

    });

}

module.exports = bit;