import React from 'react'
import ReactDOM from 'react-dom'
import Country from './Country'
import AddCountry from './AddCountry'

class CountryPanel extends React.Component {
	constructor(){
		super()
	}

	render(){
		if ( !this.props.data.length > 0 ) {
		    return (
		    		<div className={this.props.className}>
		    			<h2>Countries</h2>
		    		</div>
		    	)
		}
		let countries = this.props.data.map( (country, id) => {
			return (
				<Country 
					key={id} 
					country={country}
					active={country == this.props.activeCountry}
					selectCountry={this.props.selectCountry}
					disabled={this.props.disabled}/>
				)
		})
		
		return (
			<div className={this.props.className} onClick={this.props.toggleFocus}>
				<h2>Countries</h2>
				<ul>
					{countries}
				</ul>
				<AddCountry 
					onCountrySubmit={this.props.submitNewCountry} 
					cancelInput = {this.props.closeAndResetWizard}
					addCountry = {this.props.showCountryInput}
					showInput = {this.props.showInput} />
			</div>
		)
	}
}

export default CountryPanel