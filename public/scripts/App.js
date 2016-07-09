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
						containerClass: 'init',
						countryPanelClass: 'country-panel',
						filmPanelClass: 'film-panel',
						foodPanelClass : "food-panel",
						travelPanelClass : "travel-panel" }
		this.unfadePanels = this.unfadePanels.bind(this)
		this.fadeCountryPanel = this.fadeCountryPanel.bind(this)
		this.fadeFilmPanel = this.fadeFilmPanel.bind(this)
		this.fadeFoodPanel = this.fadeFoodPanel.bind(this)
		this.fadeTravelPanel = this.fadeTravelPanel.bind(this)
	}
	componentDidMount(){
		ajaxHelper(this, this.props.countriesUrl, function(self, data){
			self.setState({countries: data});
		})

	}
	selectCountry(country){
		if(this.state.data.length == 0){
			ajaxHelper(this, 'country/'+ country, function(self, data){
				self.setState({data: data, containerClass: 'app-container'});
				var countryData = data.find(function(element){
					return element.countryName == country;
				})
				self.setState({countryData: countryData});
			})
		} else {

			var countryData = this.state.data.find(function(element){

				return element.countryName == country;
			})
			this.setState({countryData: countryData})
		}
		
	}
	submitNewCountry(country){
		// send to server

		// add to list
		var countries = this.state.countries.slice()
		countries.push(country)
		console.log(country)
		// adding a new country so set the data to blank
		this.setState({
			countries: countries,
			countryData: {},
			containerClass: 'init'
		})
		
	}
	unfadePanels(){
		this.setState({
			countryPanelClass : "country-panel",
			filmPanelClass : "film-panel",
			foodPanelClass : "food-panel",
			travelPanelClass : "travel-panel"
		})
	}
	fadeCountryPanel(fade){
		this.setState({
			countryPanelClass : fade ? "country-panel faded" : "country-panel"
		})
	}
	fadeFilmPanel(fade){
		this.setState({
			filmPanelClass : fade ? "film-panel faded" : "film-panel" 
		})
	}
	fadeFoodPanel(fade){
		this.setState({
			foodPanelClass : fade ? "food-panel faded" : "food-panel"
		})
	}
	fadeTravelPanel(fade){
		this.setState({
			travelPanelClass : fade ? "travel-panel faded" : "travel-panel"
		})
	}
	render(){
		return (<div className={this.state.containerClass}>
			<CountryPanel data={this.state.countries} 
				selectCountry={this.selectCountry.bind(this)}
				submitNewCountry={this.submitNewCountry.bind(this)}
				fadeCountryPanel={this.fadeCountryPanel}
				fadeFilmPanel={this.fadeFilmPanel}
				fadeFoodPanel={this.fadeFoodPanel}
				fadeTravelPanel={this.fadeTravelPanel}
				unfadePanels={this.unfadePanels}
				className={this.state.countryPanelClass} />
			<FilmPanel films={this.state.countryData.films} 
				fadeCountryPanel={this.fadeCountryPanel}
				className={this.state.filmPanelClass}/>
			<FoodPanel food={this.state.countryData.food} 
				fadeCountryPanel={this.fadeCountryPanel}
				className={this.state.foodPanelClass}/>
			<TravelPanel travel={this.state.countryData.travel} 
				fadeCountryPanel={this.fadeCountryPanel}
				className={this.state.travelPanelClass}/>
			</div>
		)
	}
}
ReactDOM.render(
	<App countriesUrl='countries/' />, 
	document.getElementById('app')
);


export default App