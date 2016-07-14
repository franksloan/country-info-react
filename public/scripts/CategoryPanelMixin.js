import React from 'react'
import AddItem from './AddItem'

let CategoryPanelMixin = CategoryItem => class extends React.Component {
	constructor(){
		super()
		this.handleItemSubmit = this.handleItemSubmit.bind(this)
	}
	handleItemSubmit(item){
		this.props.submitNewItem(item)
	}
	render(){
		var items;
		// setup film components if there are films in the array
		if(this.props.items && this.props.items.length > 0){
			items = this.props.items.map( (item, id) => {
				return (<CategoryItem key={id} item={item} >This is a film</CategoryItem>)
			})
		}
		let AddItemForm = <AddItem onItemSubmit={this.handleItemSubmit} 
							wizardMode={this.props.wizardMode}
							buttonText={this.props.buttonText}/>
		return (
			<div className={this.props.className}>
				<h2>{this.props.title}</h2>
				{items}
				{!this.props.items ? '' : AddItemForm}
			</div>
		)
	}
}

export default CategoryPanelMixin