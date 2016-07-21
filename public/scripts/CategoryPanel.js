import React from 'react'
import AddItem from './AddItem'

let create = CategoryItem => class extends React.Component {
	constructor(){
		super()
		this.handleBlur = this.handleBlur.bind(this)
	}
	handleBlur(){
		if(this.props.wizardMode){
			this.props.changeCategory()
		}
	}
	render(){
		var items;
		// setup film components if there are films in the array
		if(this.props.items && this.props.items.length > 0){
			items = this.props.items.map( (item, id) => {
				return (<CategoryItem key={id} item={item} >This is a film</CategoryItem>)
			})
		}
		let AddItemForm = <AddItem onItemSubmit={this.props.submitNewItem} 
							wizardMode={this.props.wizardMode}
							buttonText={this.props.buttonText}
							disabled={this.props.disabled}/>
		return (
			<div className={this.props.className} onBlur={this.handleBlur}>
				<h2>{this.props.title}</h2>
				{items}
				{!this.props.items ? '' : AddItemForm}
			</div>
		)
	}
}

let CategoryPanel = {
	create: create
}

export default CategoryPanel