var fs = require('fs'),
	path = require('path');

var COUNTRIES = path.join(__dirname, 'jsonData/countries.json'),
	COUNTRY_DATA = path.join(__dirname, 'jsonData/country_data.json'),
	COUNTRY_DATA_COPY = path.join(__dirname, 'jsonData/country_data_copy.json');


function readCountries(req, res){
	fs.readFile(COUNTRY_DATA, function(err, data){
		if(err){
			console.error(err);
		}
		var jsonData = JSON.parse(data);
		var countryNames = jsonData.map(function(countryData){
			return countryData.countryName;
		})

		res.json(countryNames);
	})
}

function getCountryData(req, res){
	fs.readFile(COUNTRY_DATA, function(err, data){
		if(err){
			console.error(err);
		}
		var jsonData = JSON.parse(data);
		var countryData = jsonData.find(function(element){

			return element.countryName == req.params.country;
		})
		res.json(countryData)
	})
}

function addItem(req, res, category){
	fs.readFile(COUNTRY_DATA, function(err, data){
		if(err){
			console.error(err);
		}
		var jsonData = JSON.parse(data);
		jsonData = jsonData.map(function(countryData){
			if(countryData.countryName == req.params.country){
				if(typeof countryData[category] == 'undefined'){
					countryData[category] = [req.body]
				} else {
					countryData[category].push(req.body)

				}
			}
			return countryData;
		})
		fs.writeFile(COUNTRY_DATA, JSON.stringify(jsonData, null, 2), function(err) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			res.json(200);
		});
	})
}

function addCountry(req, res){
	fs.readFile(COUNTRY_DATA, function(err, data){
		if(err){
			console.error(err);
		}
		var jsonData = JSON.parse(data);
		console.log(req.body);
		jsonData.push(req.body)
		fs.writeFile(COUNTRY_DATA, JSON.stringify(jsonData, null, 2), function(err) {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			res.json(200);
		});
	})
}


var jsonAccess = {
	readCountries: readCountries,
	getCountryData: getCountryData,
	addItem: addItem,
	addCountry: addCountry
}

module.exports = jsonAccess