import React from 'react'
let imdb = "http://www.imdb.com/title/"
class Film extends React.Component {
	constructor(){
		super()
	}
	render(){
		let film = this.props.film
		return (
			<div className="film box">
				<h4>{film.Title} - {film.imdbRating}/10</h4>
				<a href={imdb + film.imdbID}><img src={film.Poster} /></a>
				<p>{film.Plot}</p>
			</div>
		)
	}
}

export default Film