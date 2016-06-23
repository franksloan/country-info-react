var path = require('path');

module.exports = {
	entry: path.join(__dirname, 'public/scripts/main.js'),
	  output: {
	    path: path.join(__dirname, '/dist/'),
	    filename: 'index.js.js',
	    publicPath: '/'
	  },
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	}
}