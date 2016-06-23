var express = require('express'),
	server = express(),
	fs = require('fs'),
	path = require('path'),
	webpack = require('webpack'),
	webpackMiddleware = require('webpack-middleware'),
	config = require('./webpack.config.js'),
	compiler = webpack(config);

var startServer = function(){

	server.set('port', (process.env.PORT || 5001 ));

	var expressRouter = express.Router();
	server.use('/', express.static(path.join(__dirname, 'public')));
	server.use(webpackMiddleware(compiler));
	server.use(function(req, res, next) {
	    // Set permissive CORS header - this allows this server to be used only as
	    // an API server in conjunction with something like webpack-dev-server.
	    res.setHeader('Access-Control-Allow-Origin', '*');

	    // Disable caching so we'll always get the latest comments.
	    res.setHeader('Cache-Control', 'no-cache');
	    next();
	});

	server.use('/', expressRouter);

	expressRouter.route('/country/:country')
		.get(function(req, res){

		});

	expressRouter.route('/countries')
		.get(function(req, res){

		});

	server.listen(server.get('port'), function(){
		console.log('started')
	});
	
}

startServer();