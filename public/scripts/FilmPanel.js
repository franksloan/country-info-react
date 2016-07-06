import React from 'react'
import Film from './film'
class FilmPanel extends React.Component {
	constructor(){
		super()
	}
	render(){
		if ( !this.props.films ) {
         	return (
         			<div className="film-panel">
         				<h2>Films</h2>
         				<div className="box"></div>
         			</div>
         		)
		}
		let films = this.props.films.map( (film, id) => {
			return (<Film key={id} film={film} image=''>This is a film</Film>)
		});
		return (
			<div className="film-panel">
				<h2>Films</h2>
				{films}
			</div>
		)
	}
}

export default FilmPanel