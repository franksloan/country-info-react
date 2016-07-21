import React from 'react'
class Country extends React.Component {
	constructor(){
		super()
		this.selectCountry = this.selectCountry.bind(this)
	}
	selectCountry(){
		console.log(this.props.disabled)
		if(!this.props.disabled){
			this.props.selectCountry(this.props.country)
		}
	}
	render(){
		const active = this.props.active
		const disabled = this.props.disabled
		return (
			<li
				onClick={this.selectCountry}>
				<a className={ disabled ? "disabled" : 
								(active ? "active" : "inactive") }>
								{this.props.country}</a></li>
		)
	}
}

export default Country