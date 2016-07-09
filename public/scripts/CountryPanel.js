import React from 'react'
import ReactDOM from 'react-dom'
import Country from './Country'
import AddCountry from './AddCountry'

class CountryPanel extends React.Component {
	constructor(){
		super()
		this.state = {
			activeCountry: null,
			countriesEnabled: true
		}
		this.handleCountrySubmit = this.handleCountrySubmit.bind(this)
		this.fadePanels = this.fadePanels.bind(this)
		this.unfadePanels = this.unfadePanels.bind(this)
	}
	selectCountry(country){
		if(this.state.countriesEnabled){
			this.props.selectCountry(country)
			this.setState({activeCountry: country})
		}
	}
	handleCountrySubmit(country){
		this.props.submitNewCountry(country)
		this.props.fadeCountryPanel(true)
		this.props.fadeFilmPanel(false)
		this.setState({
			activeCountry: country,
			countriesEnabled: false
		})
	}
	fadePanels(){
		this.props.fadeFilmPanel(true)
		this.props.fadeFoodPanel(true)
		this.props.fadeTravelPanel(true)
	}
	unfadePanels(){
		this.props.unfadePanels()
	}
	render(){
		if ( !this.props.data.length > 0 ) {
		    return (
		    		<div className={this.props.className}>
		    			<h2>Countries</h2>
		    			<ul className="box">
		    			</ul>
		    		</div>
		    	)
		}
		let countries = this.props.data.map( (country, id) => {
			return (
				<Country 
					key={id} 
					country={country}
					active={country == this.state.activeCountry}
					selectCountry={this.selectCountry.bind(this, country)} />
				)
		})
		return (
			<div className={this.props.className}>
				<h2>Countries</h2>
				<ul className="box">
					{countries}
				</ul>
				<AddCountry 
					onCountrySubmit={this.handleCountrySubmit} 
					fadePanels={this.fadePanels}
					unfadePanels={this.unfadePanels}/>
			</div>
		)
	}
}

export default CountryPanel