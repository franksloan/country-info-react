import React from 'react'
import Travel from './travel'
import AddItem from './AddItem'

class TravelPanel extends React.Component {
	constructor(){
		super()
		this.handleTravelSightSubmit = this.handleTravelSightSubmit.bind(this)
	}
	handleTravelSightSubmit(sight){
		this.props.submitNewTravelSight(sight)
	}
	render(){
		var travel
		// setup film components if there are films in the array
		if(this.props.travel && this.props.travel.length > 0){
			travel = this.props.travel.map( (sight, id) => {
				return (<Travel key={id} sight={sight}>This is a film</Travel>)
			})
		}
		let AddTravelForm = <AddItem onItemSubmit={this.handleTravelSightSubmit} 
							wizardMode={this.props.wizardMode} 
							buttonText="Add sight"/>
		return (
			<div className={this.props.className}>
				<h2>Travel</h2>
				{travel}
				{!this.props.travel ? '' : AddTravelForm}
			</div>
		)			
	}
}

export default TravelPanel