require("dotenv").config();
var axios = require("axios")
var moment = require("moment")
var Spotify = require("node-spotify-api")
var keys = require("./keys.js")
var spotify = new Spotify(keys.spotify)
var searchType = process.argv[2]
var input = process.argv[3]


function movieSearch(input) {
    console.log("Searching OMDB...\n==============RESULT==============")
    var movieQuery = input || "the prestige";

    axios.get("https://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=15d2c100").then(function(response) {
        var jsonData = response.data;
        if (jsonData.title === undefined) {
            console.log("Please try again... (Movie title undefined)")
        }
        else{
            jsonData = [
                "Title: " + jsonData.title,
                "Year: " + jsonData.year,
                "Plot : " +  jsonData.plot,
                "Cast: " + jsonData.actors,
            ].join("\n\n");
        }
    })
}

function concertSearch(input) {
    console.log("Searching Band Is In Town...\n==============RESULT==============")
    var concertQuery = input || "taylor swift";
    axios.get("https://rest.bandsintown.com/artists/" + concertQuery + "/events?app_id=codingbootcamp").then(function(response) {
        var jsonData = response.data;
        console.log(response.data)
        if (jsonData.title === undefined) {
            console.log("Please try again... (Concert title undefined)")
        }
        else{
            for (var i = 0; i < jsonData.length; i++) {
                var concertResult = [
                    "\nVenue Name: " + jsonData[i].venue.name,
                    "\nLocation: " + jsonData[i].venue.city,
                    "\nDate of Event: " + moment(jsonData[i].datetime).format("L")
                ].join("\n\n")
                return concertResult;
            }
            console.log(concertResult);
        }
    })
}

function spotifySearch(track) {
    console.log("Searching Spotify...\n==============RESULT==============")
    spotify.search({ type: 'track', query: track }, function(err, response) {
        if (err) {
            return console.log("Error: " + err)
        }
        var jsonData = response.tracks;

        for (var i = 0; i < 5; i++) {
            var trackInfo = [
                "\nArtist: " + jsonData.items[i].artists[0].name,
                "\nTrack Name: " + jsonData.items[i].name,
                "\nAlbum Name: " + jsonData.items[i].album.name,
                "\nPreview Track: " + jsonData.items[i].preview_url,
            ]
        }
    })
}

if (searchType === "omdb-search") {
    movieSearch(input);
}
else if (searchType === "concert-search") {
    concertSearch(input);
}
else if (searchType === "spotify-search") {
    spotifySearch(input);
}
else {
    console.log("No Search Selection Made");
}

function search() {
    var responseArr = respnse.split(",")
    console.log("================")
    console.log("Result")
    console.log("================")
    for (var i = 0; i < responseArr.length; i++) {
        
        if (responseArr[i] === 'omdb-search') {
            movieThis(searchType);
        
        } else if (responseArr[i] === 'spotify-search') {
            spotifyTrack(searchType);
        
        } else if  (responseArr[i] === 'concert-search') {
            concertThis(searchType);
        
        } else {
            console.log("Invalid command");
        }
    }
    console.log("================")
}
