import React from 'react'
class Food extends React.Component {
	constructor(){
		super()
	}
	render(){
		let recipe = this.props.item
		return (
			<div className="food box">
				<h4>{recipe.title} - {recipe.rating}/5</h4>
				<a href={recipe.link}><img src={recipe.image} /></a>
				<p>{recipe.description}</p>
			</div>
		)
	}
}

export default Food