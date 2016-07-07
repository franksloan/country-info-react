import React from 'react'
import ReactDOM from 'react-dom'
import CountryPanel from './CountryPanel'
import FilmPanel from './FilmPanel'
import FoodPanel from './FoodPanel'
import TravelPanel from './TravelPanel'
import $ from 'jquery'

let ajaxHelper = (self, url, callback) => {
		$.ajax({
		    url: 'http://localhost:5001/' + url,
		    dataType: 'json',
		    cache: false,
		    success: function(data) {
		      callback(self, data);
		    }.bind(self),
		    error: function(xhr, status, err) {
		      console.error(self.props, status, err.toString());
		    }.bind(self)
		});
	}
class App extends React.Component {
	constructor(){
		super()
		this.state = { countries: [ ],
						countryData: {},
						data: [],
						containerClass: 'init' }
	}
	componentDidMount(){
		ajaxHelper(this, this.props.countriesUrl, function(self, data){
			self.setState({countries: data});
		})

	}
	selectCountry(country){
		if(this.state.data.length == 0){
			ajaxHelper(this, 'country/'+ country, function(self, data){
				self.setState({data: data, containerClass: 'container'});
				var countryData = data.find(function(element){
					return element.countryName == country;
				})
				self.setState({countryData: countryData});
			})
		} else {

			var countryData = this.state.data.find(function(element){

				return element.countryName == country;
			})
			this.setState({countryData: countryData});
			console.log(this.state.countryData)

		}
		
	}
	render(){
		return (<div className={this.state.containerClass}>
			<CountryPanel data={this.state.countries} selectCountry={this.selectCountry.bind(this)} />
			<FilmPanel films={this.state.countryData.films} />
			<FoodPanel food={this.state.countryData.food} />
			<TravelPanel travel={this.state.countryData.travel} />
			</div>
		)
	}
}
ReactDOM.render(
	<App countriesUrl='countries/' containerClass='init' />, 
	document.getElementById('app')
);


export default App