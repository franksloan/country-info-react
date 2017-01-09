//get http dependency
var http = require('http');

function findFilm(req, res){
	var filmTitle = req.params.title.replace(/ /g, "+");
	console.log(filmTitle);
	getExternalInfo("http://www.omdbapi.com/?t="+filmTitle, function(data){
		var filmData = {
			"title": data.Title,
			"rating": data.imdbRating,
			"link": "http://www.imdb.com/title/"+data.imdbID,
			"image": data.Poster,
			"description": data.Plot
		}
		res.json(filmData);
	})
}

//Get information from an external API
var getExternalInfo = function getExternalInfo(url, callback){
	http.get(url, function(response){
		
		var parts = [];
		//as data comes through add it to array
		response.on('data', function(part){
			parts.push(part);
		}).on('end', function() {
			//put all the buffers together into a JS
    		var body = JSON.parse(Buffer.concat(parts));
    		console.log(3);
    		callback(body);
    		
    	});
	});
}

var externalApiAccess = {
	findFilm: findFilm
}

module.exports = externalApiAccess