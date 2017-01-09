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
						activeCountryData: {'fms': 'tms'},
						containerClass: 'app-container',
						data: [],
						categoryPanelNames: ['film-panel', 'food-panel', 'travel-panel'],
						countryPanelClass: 'country-panel',
						filmPanelClass: 'film-panel',
						foodPanelClass : "food-panel",
						travelPanelClass : "travel-panel",
						showCountryInput: false,
						wizardMode: false,
						wizardCategory: "",
						filmCategoryFocus: true,
						foodCategoryFocus: true,
						travelCategoryFocus: true }
		this.updateArray = this.updateArray.bind(this)
		this.submitNewFilm = this.submitNewFilm.bind(this)
		this.submitNewFood = this.submitNewFood.bind(this)
		this.submitNewTravelSight = this.submitNewTravelSight.bind(this)
		this.closeAndResetWizard =  this.closeAndResetWizard.bind(this)
		this.showCountryInput = this.showCountryInput.bind(this)
		this.toggleFocus = this.toggleFocus.bind(this)
		this.toggleFocusFilmCategory = this.toggleFocusFilmCategory.bind(this)
		this.toggleFocusFoodCategory = this.toggleFocusFoodCategory.bind(this)
		this.toggleFocusTravelCategory = this.toggleFocusTravelCategory.bind(this)
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
				this.setState({
					activeCountryData: countryData
				})
				this.updateData(countryData)
			}.bind(this))
		} else {
			let countryData = this.state.data.find(element =>  element.countryName == country)
			this.setState({activeCountryData: countryData})
		}
		
	}

	submitNewCountry(country){
		// adding a new country so set the data to blank
		this.setState({
			activeCountry: country,
			activeCountryData: {films: [], food: [], travel: []},
			wizardMode: true,
			filmCategoryFocus: true,
			foodCategoryFocus: false,
			travelCategoryFocus: false,
			wizardCategory: 'film'
		})
	}

	// adds new film item to main data object and current country
	submitNewFilm(filmItem){
		const countryDataFilms = this.updateArray('films', filmItem)
		const activeCountryData = this.setActiveCountryData(countryDataFilms, null, null)
		this.updateData(activeCountryData)
		if(this.state.wizardMode){
			this.addActiveCountryToCountriesList()
			console.log(activeCountryData)
			this.saveNewCountry(activeCountryData)
			this.closeAndResetWizard(activeCountryData.countryName)
		} else {
			const activeCountry = this.state.activeCountry
			AjaxHelper('film/'+activeCountry, 'POST', filmItem, function(){
				console.log(filmItem.title + ' has been saved.')
			})
		}
	}

		// adds new food item to main data object and current country
	submitNewFood(foodItem){
		const countryDataFood = this.updateArray('food', foodItem)
		const activeCountryData = this.setActiveCountryData(null, countryDataFood, null)
		this.updateData(activeCountryData)
		if(this.state.wizardMode){
			this.addActiveCountryToCountriesList()
			this.saveNewCountry(activeCountryData)
			this.closeAndResetWizard(activeCountryData.countryName)
		} else {
			// update db
			const activeCountry = this.state.activeCountry
			AjaxHelper('food/'+activeCountry, 'POST', foodItem, function(){
				console.log(foodItem.title + ' has been saved.')
			})
		}
	}

	// adds new travel sight item to main data object and current country
	submitNewTravelSight(travelSight){
		const countryDataTravel = this.updateArray('travel', travelSight)
		const activeCountryData = this.setActiveCountryData(null, null, countryDataTravel)
		this.updateData(activeCountryData)
		if(this.state.wizardMode){
			this.addActiveCountryToCountriesList()
			this.saveNewCountry(activeCountryData)
			this.closeAndResetWizard(activeCountryData.countryName)
		} else {
			// update db
			const activeCountry = this.state.activeCountry
			AjaxHelper('travel/'+activeCountry, 'POST', travelSight, function(){
				console.log(travelSight.title + ' has been saved.')
			})
		}
		
	}

	closeAndResetWizard(country){
		this.setState({
			activeCountry: country,
			filmCategoryFocus: true,
			foodCategoryFocus: true,
			travelCategoryFocus: true,
			wizardMode: false,
			showCountryInput: false,
			wizardCategory: ''
		})
	}

	saveNewCountry(activeCountryData){
		AjaxHelper('new_country/', 'POST', activeCountryData, function(){
			console.log("New country, " + activeCountryData.countryName + ', has been saved.')
		})
	}

	// if there is new data for a category add it to selected country otherwise keep exisitng data
	setActiveCountryData(filmsArray, foodArray, travelArray){
		filmsArray = filmsArray || this.state.activeCountryData.films
		foodArray = foodArray || this.state.activeCountryData.food
		travelArray = travelArray || this.state.activeCountryData.travel
		const countryData = { 	
							countryName: this.state.activeCountry,
							films: filmsArray,
							food:  foodArray,
							travel: travelArray
						  }
		this.setState({
			activeCountryData: countryData	
		})
		return countryData
	}

	addActiveCountryToCountriesList(){
		const countries = this.state.countries.slice()
		countries.push(this.state.activeCountry)
		this.setState({countries: countries})
	}

	// update main data object on state
	updateData(activeCountryData){
		let data = this.state.data;
		const activeCountryName = activeCountryData.countryName
		// if the country exists then update the existing country
		// otherwise add the new country the app's data 
		if(data.findIndex(element => element.countryName == activeCountryName) > -1){
			data = data.map(function(element, i){
				if(element.countryName === activeCountryName){
					element.films = activeCountryData.films
					element.food = activeCountryData.food
					element.travel = activeCountryData.travel
					return element
				}
				return element
			})
		} else {
			data = data.slice()
			data.push(activeCountryData)
		}
		this.setState({ data: data })
	}

	// creates an array with the new item or adds the item to already existing array for that category
	updateArray(category, item){
		if(typeof this.state.activeCountryData[category] == 'undefined'){
			return [item]
		} else {
			let countryDataArray = this.state.activeCountryData[category].slice()
			countryDataArray.push(item)
			return countryDataArray
		}
	}

	showCountryInput(){
		this.setState({showCountryInput: true})
	}

	toggleFocus(){
		if(this.state.wizardMode){
			this.setState({
				filmCategoryFocus: false,
				foodCategoryFocus: false,
				travelCategoryFocus: false
			})
		}
	}

	// Chnage the category to film if that is clicked
	toggleFocusFilmCategory(){
		if(this.state.wizardMode && this.state.wizardCategory !== 'film'){
			this.setState({
				filmCategoryFocus: !this.state.filmCategoryFocus,
				foodCategoryFocus: false,
				travelCategoryFocus: false,
				wizardCategory: 'film'
			})
		}
	}

	toggleFocusFoodCategory(){
		if(this.state.wizardMode && this.state.wizardCategory !== 'food'){
			this.setState({
				foodCategoryFocus: !this.state.foodCategoryFocus,
				filmCategoryFocus: false,
				travelCategoryFocus: false,
				wizardCategory: 'food'
			})
		}
	}

	toggleFocusTravelCategory(){
		if(this.state.wizardMode && this.state.wizardCategory !== 'travel'){
			this.setState({
				travelCategoryFocus: !this.state.travelCategoryFocus,
				filmCategoryFocus: false,
				foodCategoryFocus: false,
				wizardCategory: 'travel'
			})
		}
	}

	render(){
		let FilmPanel = CategoryPanel.create(Film)
		let FoodPanel = CategoryPanel.create(Food)
		let TravelPanel = CategoryPanel.create(Travel)
		return (<div className= { this.state.containerClass }>
			<CountryPanel data= { this.state.countries } 
				activeCountry= { this.state.activeCountry }
				showCountryInput= { this.showCountryInput }
				selectCountry= { this.selectCountry.bind(this) }
				submitNewCountry= { this.submitNewCountry.bind(this) }
				closeAndResetWizard= { this.closeAndResetWizard }
				className= { this.state.countryPanelClass }
				toggleFocus= { this.toggleFocus }
				wizardMode= { this.state.wizardMode }
				showInput= { this.state.showCountryInput } />
			<FilmPanel items={this.state.activeCountryData.films} 
				className={this.state.filmPanelClass}
				submitNewItem={this.submitNewFilm}
				title="Films"
				buttonText="Add film"
				toggleFocus={this.toggleFocusFilmCategory}
				focus={this.state.filmCategoryFocus} />
			<FoodPanel items={this.state.activeCountryData.food} 
				className={this.state.foodPanelClass}
				submitNewItem={this.submitNewFood}
				title="Food"
				buttonText="Add food"
				toggleFocus={this.toggleFocusFoodCategory}
				focus={this.state.foodCategoryFocus} />
			<TravelPanel items={this.state.activeCountryData.travel} 
				className={this.state.travelPanelClass}
				submitNewItem={this.submitNewTravelSight}
				title="Travel"
				buttonText="Add sight"
				toggleFocus={this.toggleFocusTravelCategory}
				focus={this.state.travelCategoryFocus} />
			</div>
		)
	}
}
ReactDOM.render(
	<App countriesUrl='countries/' />, 
	document.getElementById('app')
);


export default App