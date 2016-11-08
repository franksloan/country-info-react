import React from 'react'
import AddItem from './AddItem'

let create = CategoryItem => class extends React.Component {
	constructor(){
		super()
		this.state = {
			showForm: false
		}
		this.toggleButton = this.toggleButton.bind(this)
	}
	handleClick(name){
		this.props.toggleFocus();
	}

	toggleButton(){
		this.setState({
			showForm: !this.state.showForm
		})
	}

	render(){
		var items;
		// setup film components if there are films in the array
		if(this.props.items && this.props.items.length > 0){
			items = this.props.items.map( (item, id) => {
				return (<CategoryItem key={id} item={item} >This is a film</CategoryItem>)
			})
		}
		let AddItemForm = <AddItem onItemSubmit= { this.props.submitNewItem }
							toggleButton= { this.toggleButton }
							buttonText= { this.props.buttonText }
							disabled= { !this.props.focus }
							showForm= { this.state.showForm } />

		let className = this.props.className + (!this.props.focus ? " faded" : "")

		return (
			<div className={className} onClick={this.handleClick.bind(this)}>
				<h2>{this.props.title}</h2>
				{items}
				{!this.props.items ? 'aa' : AddItemForm}
			</div>
		)
	}
}

let CategoryPanel = {
	create: create
}

export default CategoryPanel