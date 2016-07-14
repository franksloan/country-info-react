import React from 'react'
import Food from './food'
import AddItem from './AddItem'

class FoodPanel extends React.Component {
	constructor(){
		super()
		this.handleFoodSubmit = this.handleFoodSubmit.bind(this)
	}
	handleFoodSubmit(food){
		this.props.submitNewFood(food)
	}
	render(){
		var food;
		// setup film components if there are films in the array
		if(this.props.food && this.props.food.length > 0){
			food = this.props.food.map( (recipe, id) => {
				return (<Food key={id} recipe={recipe} image=''>This is a film</Food>)
			})
		}
		let AddFoodForm = <AddItem onItemSubmit={this.handleFoodSubmit} 
							wizardMode={this.props.wizardMode} 
							buttonText="Add Food"/>
		return (
			<div className={this.props.className}>
				<h2>Food</h2>
				{food}
				{!this.props.food ? '' : AddFoodForm}
			</div>
		)	
	}
}



export default FoodPanel