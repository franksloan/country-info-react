import React from 'react'
import Food from './food'
class FoodPanel extends React.Component {
	constructor(){
		super()
	}
	render(){
		if ( !this.props.food ) {
         	return (
         			<div className={this.props.className}>
         				<h2>Food</h2>
         				<div className="box"></div>
         			</div>
         		)
		}
		let food = this.props.food.map( (recipe, id) => {
			return (<Food key={id} recipe={recipe}>This is a film</Food>)
		});
		return (
			<div className={this.props.className}>
				<h2>Food</h2>
				{food}
			</div>
		)		
	}
}

export default FoodPanel