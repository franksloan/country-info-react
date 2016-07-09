import React from 'react'
class Country extends React.Component {
	constructor(){
		super()
		this.selectCountry = this.selectCountry.bind(this)
	}
	selectCountry(country){
		this.props.selectCountry(country)
	}
	render(){
		return (
			<li
			onClick={this.selectCountry}
			className={this.props.active ? "highlight" : "" }>{this.props.country}</li>
		)
	}
}

export default Country