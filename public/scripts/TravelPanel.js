import React from 'react'
import Travel from './travel'
class TravelPanel extends React.Component {
	constructor(){
		super()
	}
	render(){
		if ( !this.props.travel ) {
         	return (
         			<div className={this.props.className}>
         				<h2>Travel</h2>
         				<div className="box"></div>
         			</div>
         		)
		}
		let travel = this.props.travel.map( (sight, id) => {
			return (<Travel key={id} sight={sight}>This is a film</Travel>)
		});
		return (
			<div className={this.props.className}>
				<h2>Travel</h2>
				{travel}
			</div>
		)		
	}
}

export default TravelPanel