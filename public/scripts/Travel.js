import React from 'react'

class Travel extends React.Component {
	constructor(){
		super()
	}
	render(){
		let sight = this.props.item
		return (
			<div className="travel box">
				<h4>{sight.title}</h4>
				<a href={sight.link}><img src={sight.image} /></a>
				<p>{sight.description}</p>
			</div>
		)
	}
}

export default Travel