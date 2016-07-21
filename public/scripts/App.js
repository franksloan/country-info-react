import React from 'react'
import ReactDOM from 'react-dom'
import CountryPanel from './CountryPanel'
import CategoryPanel from './CategoryPanel'
import Film from './film'
import Food from './food'
import Travel from './travel'
import AjaxHelper from './AjaxHelper'

class App extends React.Component {
	constructor(){
		super()
		this.state = {  activeCountry: '', 
						countries: [ ],
						countryData: {},
						data: [],
						containerClass: 'init',
						countryPanelClass: 'country-panel',
						filmPanelClass: 'film-panel',
						foodPanelClass : "food-panel",
						travelPanelClass : "travel-panel",
						filmWizardMode: false,
						foodWizardMode: false,
						travelWizardMode: false,
						countryPanelDisabled: false }
		this.fadePanels = this.fadePanels.bind(this)
		this.submitNewFilm = this.submitNewFilm.bind(this)
		this.submitNewFood = this.submitNewFood.bind(this)
		this.submitNewTravelSight = this.submitNewTravelSight.bind(this)
		this.closeFilmWizard = this.closeFilmWizard.bind(this)
		this.closeFoodWizard = this.closeFoodWizard.bind(this)
		this.closeTravelWizard = this.closeTravelWizard.bind(this)
	}
	componentDidMount(){
		AjaxHelper(this.props.countriesUrl, 'GET', null, function(data){
			this.setState({countries: data});
		}.bind(this))
	}
	selectCountry(country){
		this.setState({
			activeCountry: country
		})
		// Does this country exist
		let appData = this.state.data
		const countryIndex = appData.findIndex(element => element.countryName == country)
		// If not fetch it from the server
		if(countryIndex == -1){
			AjaxHelper('country/'+ country, 'GET', null, function(countryData){
				// self.setState({data: data, containerClass: 'app-container'});
				// var countryData = data.find(function(element){
				// 	return element.countryName == country;
				// })
				// self.setState({countryData: countryData});
				console.log(countryData)
				this.setState({
					containerClass: 'app-container',
					countryData: countryData
				})
				this.updateData(countryData)
			}.bind(this))
		} else {
			let countryData = this.state.data.find(element =>  element.countryName == country)
			this.setState({countryData: countryData})
		}
		
	}

	submitNewCountry(country){
		// add to list
		let countries = this.state.countries.slice()
		countries.push(country)
		// adding a new country so set the data to blank
		this.setState({
			activeCountry: country,
			countries: countries,
			countryData: {films: []},
			containerClass: 'init',
			filmWizardMode: true,
			countryPanelDisabled: true
		})
		this.fadePanels(true, false, true, true)
	}

	// adds new film item to main data object and current country
	submitNewFilm(filmItem){
		let countryDataFilms = this.updateArray('films', filmItem)

		if(this.state.filmWizardMode){
			this.setCountryData(countryDataFilms, [], null)
			this.setState({
				filmWizardMode: false,
				foodWizardMode: true
			})
			this.fadePanels(true, true, false, true)
		} else {
			let countryData = this.setCountryData(countryDataFilms, null, null)
			this.updateData(countryData)
			const activeCountry = this.state.activeCountry
			AjaxHelper('film/'+activeCountry, 'POST', filmItem, function(){
				console.log('success')
			})
		}
	}

	// adds new food item to main data object and current country
	submitNewFood(foodItem){
		let countryDataFood = this.updateArray('food', foodItem)
		if(this.state.foodWizardMode){
			this.setCountryData(null, countryDataFood, [])
			this.setState({
				foodWizardMode: false,
				travelWizardMode: true
			})
			this.fadePanels(true, true, true, false);
		} else {
			let countryData = this.setCountryData(null, countryDataFood, null)
			this.updateData(countryData)
			// update db
			const activeCountry = this.state.activeCountry
			AjaxHelper('food/'+activeCountry, 'POST', foodItem, function(){
				console.log('success')
			})
		}
	}

	// adds new travel sight item to main data object and current country
	submitNewTravelSight(travelSight){
		let countryDataTravel = this.updateArray('travel', travelSight)
		let countryData = this.setCountryData(null, null, countryDataTravel)
		// if a new travel sight has been submitted it is sufficient to add new country if
		// in wizard mode or just add the new sight if not in wizard mode
		if(this.state.travelWizardMode){
			this.setState({
				travelWizardMode: false,
				countryPanelDisabled: false
			})
			this.fadePanels(false, false, false, false)
		} else {
			// update db
			const activeCountry = this.state.activeCountry
			AjaxHelper('travel/'+activeCountry, 'POST', travelSight, function(){
				console.log('success')
			})
		}
		this.updateData(countryData)
	}

	// if there is new data for a category add it to selected country otherwise keep exisitng data
	setCountryData(filmsArray, foodArray, travelArray){
		filmsArray = filmsArray || this.state.countryData.films
		foodArray = foodArray || this.state.countryData.food
		travelArray = travelArray || this.state.countryData.travel
		let countryData = { 	
							films: filmsArray,
							food:  foodArray,
							travel: travelArray
						  }
		this.setState({
			countryData: countryData		
		})
		return countryData
	}

	// update main data object on state
	updateData(countryData){
		let data = this.state.data;
		const activeCountry = this.state.activeCountry
		// if the country exists then update the existing country
		// otherwise add the new country the app's data
		if(data.findIndex(element => element.countryName == activeCountry) > -1){
			data = data.map(function(element, i){
				if(element.countryName === activeCountry){
					element.films = countryData.films
					element.food = countryData.food
					element.travel = countryData.travel
					return element
				}
				return element
			})
		} else {
			const activeCountry = this.state.activeCountry
			if(!countryData.countryName){
				countryData.countryName = activeCountry
			}
			data = data.slice()
			data.push(countryData)
			AjaxHelper('new_country/'+activeCountry, 'POST', countryData, function(){
				console.log('success')
			})
		}
		this.setState({ data: data })
	}

	// creates an array with the new item or adds the item to already existing array for that category
	updateArray(category, item){
		if(this.state.countryData[category] == 'undefined'){
			return [item]
		} else {
			let countryDataArray = this.state.countryData[category].slice()
			countryDataArray.push(item)
			return countryDataArray
		}
	}

	closeFilmWizard(){
		if(this.state.filmWizardMode){
			this.setState({
				filmWizardMode: false,
				foodWizardMode: true
			})
			this.setCountryData(null, [], null)
			this.fadePanels(true, true, false, true)
		}
	}

	closeFoodWizard(){
		if(this.state.foodWizardMode){
			this.setState({
				foodWizardMode: false,
				travelWizardMode: true
			})
			this.setCountryData(null, null, [])
			this.fadePanels(true, true, true, false)
		}
	}

	closeTravelWizard(){
		if(this.state.travelWizardMode){
			this.setState({
				travelWizardMode: false,
				countryPanelDisabled: false
			})
			this.fadePanels(false, false, false, false)
			const countryData = this.state.countryData
			console.log(countryData)
			// If there was some data added for the new country then save the data
			if(countryData.films.length > 0 || countryData.food.length > 0 || countryData.travel.length > 0){
				this.updateData(countryData)
			} else {
				// If only the name of the country was set then remove it from the list
				let countries = this.state.countries.slice()
				countries.splice(countries.length - 1)
				this.setState({
					countries: countries
				})
			}
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
	render(){
		let FilmPanel = CategoryPanel.create(Film)
		let FoodPanel = CategoryPanel.create(Food)
		let TravelPanel = CategoryPanel.create(Travel)
		return (<div className={this.state.containerClass}>
			<CountryPanel data={this.state.countries} 
				activeCountry={this.state.activeCountry}
				selectCountry={this.selectCountry.bind(this)}
				submitNewCountry={this.submitNewCountry.bind(this)}
				fadePanels={this.fadePanels}
				className={this.state.countryPanelClass}
				disabled={this.state.countryPanelDisabled} />
			<FilmPanel items={this.state.countryData.films} 
				className={this.state.filmPanelClass}
				submitNewItem={this.submitNewFilm}
				wizardMode={this.state.filmWizardMode}
				changeCategory={this.closeFilmWizard}
				title="Films"
				buttonText="Add film"
				disabled={this.state.countryPanelDisabled} />
			<FoodPanel items={this.state.countryData.food} 
				className={this.state.foodPanelClass}
				submitNewItem={this.submitNewFood}
				wizardMode={this.state.foodWizardMode}
				changeCategory={this.closeFoodWizard}
				title="Food"
				buttonText="Add food"
				disabled={this.state.countryPanelDisabled} />
			<TravelPanel items={this.state.countryData.travel} 
				className={this.state.travelPanelClass}
				submitNewItem={this.submitNewTravelSight}
				wizardMode={this.state.travelWizardMode}
				changeCategory={this.closeTravelWizard}
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