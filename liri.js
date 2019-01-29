require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require('axios');
var keys = require('./keys');
var request = require('request');
var moment = require('moment');
var spotify = new Spotify(keys.spotify)
var userCommand = process.argv[2];

if(userCommand === 'concert-this'){
    var bandName = process.argv.slice(3).join(" ")
    var queryUrl ='https://rest.bandsintown.com/artists/' + bandName + '/events?app_id=codingbootcamp';
    request(queryUrl, function(error, response, body) {
        if(error) console.log(err);
        var result = JSON.parse(body)[0];
        console.log('------------------');
        console.log('Artist: ' + bandName);
        console.log('Venue: ' + result.venue.name);
        console.log('Location: ' + result.venue.city);
        console.log('Date: ' + moment(result.datetime).format('MM/DD/YYYY'));
        console.log('------------------');
    })

}else if(userCommand == 'spotify-this-song'){
    var songName =process.argv.slice(3).join(" ")
    console.log(songName);
        if(songName == undefined){
            songName == 'The sign by Ace of Base';
        }
    spotify.search({ type: 'track', query: songName, limit: 1}, function(error, data){
        if(error){
            return console.log('ERR0R:' + err)
        }else{
        for(var i=0; i<data.tracks.items.length; i++){
            console.log('------------------')
            console.log('Artist: ' +data.tracks.items[i].album.artists.name);
            console.log('Album Name: ' + data.tracks.items[i].album.name);
            console.log('Song: ' + data.tracks.items[i].name);
            console.log('Song URL: ' + data.tracks.items[i].preview_url)
            console.log('------------------')
              }}})
}else if(userCommand ==='movie-this'){
    var movieName = process.argv.slice(3).join(" ");
    queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy';

    if(movieName == undefined){
        movieName == 'Mr. Nobody';
    }else{
        axios.get(queryUrl).then(
            function(response) {
                console.log('------------------');
                console.log('Title: ' + response.data.Title);
                console.log('Release Year: ' + response.data.Year);
                console.log('IMDB Rating: ' + response.data.imdbRating);
                console.log('Rotten Tomatoes: ' + response.data.Ratings[1].Value);
                console.log('Country: ' + response.data.Country);
                console.log('Language: ' + response.data.Language);
                console.log('Movie Plot: ' + response.data.Plot);
                console.log('Actors: ' + response.data.Actors);
                console.log('------------------');
    })}
}else if(movieName == 'do-what-it-says'){

} 