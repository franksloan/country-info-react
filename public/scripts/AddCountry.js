import React from 'react'
import ReactDOM from 'react-dom'
import {Button, ButtonGroup, FormGroup, FormControl, Form} from 'react-bootstrap'

class AddCountry extends React.Component {
	constructor(){
		super()
		this.state = {
			showAddCountryButton: true,
			newCountry: '',
			buttonDisabled: false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleCountryInput = this.handleCountryInput.bind(this)
		this.addCountry = this.addCountry.bind(this)
		this.handleBlur = this.handleBlur.bind(this)
	}
	handleCountryInput(e){
		this.setState({newCountry: e.target.value})
	}
	handleSubmit(e){
		e.preventDefault();
		var country = this.state.newCountry
		this.props.onCountrySubmit(country)
		this.setState({newCountry: '',
						showAddCountryButton: true,
						buttonDisabled: true})
	}
	handleBlur(e){
		this.setState({showAddCountryButton: true})
		this.props.unfadePanels();
	}
	addCountry(){
		this.setState({showAddCountryButton: false})
		this.props.fadePanels();
	}
	render(){
		let countryInput = <Form className="commentForm" onSubmit={this.handleSubmit}>
							<FormGroup bsSize="small">
							      <FormControl 
							      type="text" 
							      value={this.state.newCountry}
							      onChange={this.handleCountryInput} 
							      autoFocus
							      onBlur={this.handleBlur}/>
							</FormGroup>
						   </Form>

		let addCountryButton = <Button onClick={this.addCountry} 
										bsSize="sm"
										disabled={this.state.buttonDisabled}
										>Add country</Button>

		return (
			<div id="country-input">
				{this.state.showAddCountryButton ? addCountryButton : countryInput }
			</div>
		)
	}
}

export default AddCountry







