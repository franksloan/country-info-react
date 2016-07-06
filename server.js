var express = require('express'),
	server = express(),
	fs = require('fs'),
	path = require('path'),
	bodyParser = require('body-parser'),
	webpack = require('webpack'),
	webpackMiddleware = require('webpack-middleware'),
	config = require('./webpack.config.js'),
	compiler = webpack(config);

var COUNTRIES = path.join(__dirname, 'countries.json'),
	COUNTRY_DATA = path.join(__dirname, 'country_data.json');

var startServer = function(){

	server.set('port', (process.env.PORT || 5001 ));

	server.use(express.static(path.join(__dirname, 'public')));
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({extended: true}));
	server.use(webpackMiddleware(compiler));
	server.get('/', function response(req, res){
		res.sendFile(path.join(__dirname, 'public/index.html'))
	})

	server.get('/country/:country', function(req, res){
		var d = new Date();
		console.log(d.getHours()+':'+d.getMinutes()+':'+d.getSeconds());
			fs.readFile(COUNTRY_DATA, function(err, data){
				if(err){
					console.error(err);
				}
				var jsonData = JSON.parse(data);
				// var countryData = jsonData.find(function(element){

				// 	return element.countryName == req.params.country;
				// })
				// for(var i = 0; i < jsonData.length; i++){
				// 	if(jsonData[i].countryName == req.params.country){
				// 		res.json(jsonData[i])
				// 		console.timeEnd('co');
				// 		return;
				// 	}
				var d = new Date();
				console.log(d.getHours()+':'+d.getMinutes()+':'+d.getSeconds());
				res.json(jsonData);
				
			})
		});
	server.get('/countries', function(req, res){
			fs.readFile(COUNTRIES, function(err, data){
				if(err){
					console.error(err);
				}
				res.json(JSON.parse(data));
			})

		});

	server.listen(server.get('port'), function(){
		console.log('started')
	});
	
}

startServer();