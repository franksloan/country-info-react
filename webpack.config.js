var path = require('path');

module.exports = {
	entry: path.join(__dirname, 'public/main.js'),
	output: {
	    path: path.join(__dirname, '/public/'),
	    filename: 'index.js',
	    publicPath: '/'
	},
	externals: {
	    'cheerio': 'window',
	    'react/lib/ExecutionEnvironment': true,
	    'react/lib/ReactContext': true,
	},
	devServer: {
	    hot: true,
	    inline: true,
	    port: 5001,
	    historyApiFallback: true,
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	}
}