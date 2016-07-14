import React from 'react'
import Film from './film'
import AddItem from './AddItem'

class FilmPanel extends React.Component {
	constructor(){
		super()
		this.handleFilmSubmit = this.handleFilmSubmit.bind(this)
	}
	handleFilmSubmit(film){
		this.props.submitNewFilm(film)
	}
	render(){
		var films;
		// setup film components if there are films in the array
		if(this.props.films && this.props.films.length > 0){
			films = this.props.films.map( (film, id) => {
				return (<Film key={id} film={film} image=''>This is a film</Film>)
			})
		}
		let AddFilmForm = <AddItem onItemSubmit={this.handleFilmSubmit} 
							wizardMode={this.props.wizardMode}
							buttonText="Add film"/>
		return (
			<div className={this.props.className}>
				<h2>Films</h2>
				{films}
				{!this.props.films ? '' : AddFilmForm}
			</div>
		)
	}
}

export default FilmPanel