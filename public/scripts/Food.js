import React from 'react'
class Food extends React.Component {
	constructor(){
		super()
	}
	render(){
		let recipe = this.props.recipe
		return (
			<div className="food box">
				<h4>{recipe.title} - {recipe.averageRating}/5</h4>
				<a href={recipe.url}><img src={recipe.img} /></a>
				<p>{recipe.teaser}</p>
			</div>
		)
	}
}

export default Food