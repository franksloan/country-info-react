import React from 'react'
class Travel extends React.Component {
	constructor(){
		super()
	}
	render(){
		let sight = this.props.sight
		return (
			<div className="travel box">
				<h4>{sight.sightName}</h4>
				<a href={sight.url}><img src={sight.img} /></a>
				<p>{sight.sightDescription}</p>
			</div>
		)
	}
}

export default Travel