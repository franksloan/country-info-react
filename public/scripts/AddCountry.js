import React from 'react'
import ReactDOM from 'react-dom'
import {Button, ButtonGroup, FormGroup, FormControl, Form, InputGroup, Glyphicon} from 'react-bootstrap'

class AddCountry extends React.Component {
	constructor(){
		super()
		this.state = {
			newCountry: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleCountryInput = this.handleCountryInput.bind(this)
		this.handleCancel = this.handleCancel.bind(this)

	}
	handleCountryInput(e){
		this.setState({newCountry: e.target.value})
	}

	handleSubmit(e){
		e.preventDefault();
		var country = this.state.newCountry
		this.props.onCountrySubmit(country)
	}

	handleCancel(e){
		e.stopPropagation()
		this.setState({
			newCountry: ''
		})
		this.props.cancelInput()
	}

	render(){
		let countryInput = <Form onSubmit={this.handleSubmit}>
							<FormGroup bsSize="small">
								<InputGroup>
							      <FormControl 
							      	type="text" 
							      	value={this.state.newCountry}
							      	onChange={this.handleCountryInput} 
							      	autoFocus />	
							      <InputGroup.Addon onClick= { this.handleCancel } >
							         <Glyphicon glyph="remove" />
							      </InputGroup.Addon>						    							           
							    </InputGroup>
							</FormGroup>
						   </Form>

		let addCountryButton = <Button onClick={this.props.addCountry} 
										bsSize="sm"
										>Add country</Button>
		return (
			<div id="country-input">
				{this.props.showInput ? countryInput : addCountryButton }
			</div>
		)
	}
}

export default AddCountry







