import React from 'react'

class Film extends React.Component {
	constructor(){
		super()
	}
	render(){
		let film = this.props.item
		return (
			<div className="film box">
				<h4>{film.title} - {film.rating}/10</h4>
				<a href={film.link}><img src={film.image} /></a>
				<p>{film.description}</p>
			</div>
		)
	}
}

export default Film