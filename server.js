var express = require('express'),
	server = express(),
	fs = require('fs'),
	path = require('path'),
	bodyParser = require('body-parser'),
	webpack = require('webpack'),
	webpackMiddleware = require('webpack-middleware'),
	config = require('./webpack.config.js'),
	compiler = webpack(config),
	jsonAccess = require('./server/jsonAccess'),
	externalApiAccess = require('./server/externalApiAccess');

var COUNTRIES = path.join(__dirname, 'countries.json'),
	COUNTRY_DATA = path.join(__dirname, 'country_data.json'),
	COUNTRY_DATA_COPY = path.join(__dirname, 'country_data_copy.json');

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
		jsonAccess.getCountryData(req, res)
	});
	server.get('/countries', function(req, res){
		jsonAccess.readCountries(req, res)
	});

	server.post('/film/:country', function(req, res){
		jsonAccess.addItem(req, res, 'films')
	});

	server.get('/film/search/:title', function(req, res){
		externalApiAccess.findFilm(req, res);
	})

	server.post('/food/:country', function(req, res){
		jsonAccess.addItem(req, res, 'food')
	});

	server.post('/travel/:country', function(req, res){
		jsonAccess.addItem(req, res, 'travel')
	});

	server.post('/new_country/', function(req, res){
		jsonAccess.addCountry(req, res)
	});

	server.listen(server.get('port'), function(){
		console.log('started')
	});
	
}

startServer();