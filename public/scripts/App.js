import React from 'react'
import ReactDOM from 'react-dom'
import CountryPanel from './CountryPanel'
import CategoryPanelMixin from './CategoryPanelMixin'
import Film from './film'
import Food from './food'
import Travel from './travel'
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
						travelPanelClass : "travel-panel",
						filmWizardMode: false,
						foodWizardMode: false,
						travelWizardMode: false }
		this.fadePanels = this.fadePanels.bind(this)
		this.submitNewFilm = this.submitNewFilm.bind(this)
		this.submitNewFood = this.submitNewFood.bind(this)
		this.submitNewTravelSight = this.submitNewTravelSight.bind(this)
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
			countryData: {films: []},
			containerClass: 'init',
			filmWizardMode: true
		})
		this.fadePanels(true, false, true, true)
	}
	submitNewFilm(filmItem){
		var countryDataFilms = this.updateArray('films', filmItem)

		if(this.state.filmWizardMode){
			this.setCountryData(countryDataFilms, [], null)
			this.setState({
				filmWizardMode: false,
				foodWizardMode: true
			})
			this.fadePanels(true, true, false, true)
		} else {
			// test this with adding a new film whilst food doesn't exist
			this.setCountryData(countryDataFilms, null, null)
		}
	}
	submitNewFood(foodItem){
		var countryDataFood = this.updateArray('food', foodItem)
		if(this.state.foodWizardMode){
			this.setCountryData(null, countryDataFood, [])
			this.setState({
				foodWizardMode: false,
				travelWizardMode: true
			})
			this.fadePanels(true, true, true, false);
		} else {
			// test this with adding a new film whilst food doesn't exist
			this.setCountryData(null, countryDataFood, null)
		}
	}
	submitNewTravelSight(travelSight){
		var countryDataTravel = this.updateArray('travel', travelSight)
		this.setCountryData(null, null, countryDataTravel)
		if(this.state.travelWizardMode){
			this.setState({
				travelWizardMode: false
			})
			this.fadePanels(false, false, false, false)
		}
	}
	setCountryData(filmsArray, foodArray, travelArray){
		filmsArray = filmsArray || this.state.countryData.films
		foodArray = foodArray || this.state.countryData.food
		travelArray = travelArray || this.state.countryData.travel 
		this.setState({
			countryData: 
				{ 	
					films: filmsArray,
					food:  foodArray,
					travel: travelArray
				}
		})
	}
	updateArray(category, item){
		if(this.state.countryData[category] == 'undefined'){
			return [food]
		} else {
			let countryDataArray = this.state.countryData[category].slice()
			countryDataArray.push(item)
			return countryDataArray
		}
	}
	fadePanels(fadeCountryPanel, fadeFilmPanel, fadeFoodPanel, fadeTravelPanel){
		this.setState({
			countryPanelClass: fadeCountryPanel ? "country-panel faded" : "country-panel",
			filmPanelClass : fadeFilmPanel ? "film-panel faded" : "film-panel",
			foodPanelClass : fadeFoodPanel ? "food-panel faded" : "food-panel",
			travelPanelClass : fadeTravelPanel ? "travel-panel faded" : "travel-panel"
		})
	}
	// <FilmPanel films={this.state.countryData.films} 
	// 	className={this.state.filmPanelClass}
	// 	submitNewFilm={this.submitNewFilm}
	// 	wizardMode={this.state.filmWizardMode} />
	render(){
		let FilmPanel = CategoryPanelMixin(Film)
		let FoodPanel = CategoryPanelMixin(Food)
		let TravelPanel = CategoryPanelMixin(Travel)
		return (<div className={this.state.containerClass}>
			<CountryPanel data={this.state.countries} 
				selectCountry={this.selectCountry.bind(this)}
				submitNewCountry={this.submitNewCountry.bind(this)}
				fadePanels={this.fadePanels}
				className={this.state.countryPanelClass} />
			<FilmPanel items={this.state.countryData.films} 
				className={this.state.filmPanelClass}
				submitNewItem={this.submitNewFilm}
				wizardMode={this.state.filmWizardMode}
				title="Films"
				buttonText="Add film" />
			<FoodPanel items={this.state.countryData.food} 
				className={this.state.foodPanelClass}
				submitNewItem={this.submitNewFood}
				wizardMode={this.state.foodWizardMode}
				title="Food"
				buttonText="Add food" />
			<TravelPanel items={this.state.countryData.travel} 
				className={this.state.travelPanelClass}
				submitNewItem={this.submitNewTravelSight}
				wizardMode={this.state.travelWizardMode}
				title="Travel"
				buttonText="Add sight" />
			</div>
		)
	}
}
ReactDOM.render(
	<App countriesUrl='countries/' />, 
	document.getElementById('app')
);


export default App