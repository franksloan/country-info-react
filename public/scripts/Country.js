import React from 'react'
class Country extends React.Component {
	constructor(){
		super()
	}
	selectCountry(country){
		this.props.selectCountry(country)
	}
	render(){
		return (
			<li
			onClick={this.selectCountry.bind(this)}
			className={this.props.active ? "highlight" : "" }>{this.props.country}</li>
		)
	}
}

export default Country