import React from 'react'
import Country from './Country'
class CountryPanel extends React.Component {
	constructor(){
		super()
		this.state = {
			activeCountry: null
		}
	}
	selectCountry(country){
		this.props.selectCountry(country)
		this.setState({activeCountry: country})
	}
	render(){
		if ( !this.props.data.length > 0 ) {
		    return (
		    		<div className="country-panel">
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
			<div className="country-panel">
				<h2>Countries</h2>
				<ul className="box">
					{countries}
				</ul>
			</div>
		)
	}
}

export default CountryPanel