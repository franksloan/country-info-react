import React from 'react'
import {Button, ButtonGroup, FormGroup, FormControl, Form, ControlLabel, Glyphicon} from 'react-bootstrap'

class AddItem extends React.Component {
	constructor(){
		super()
		this.state = {
			title: '',
			rating: 5,
			link: '',
			image: '',
			description: ''
		}
		this.handleRating = this.handleRating.bind(this)
		this.handleTitle = this.handleTitle.bind(this)
		this.handleLink = this.handleLink.bind(this)
		this.handleImage = this.handleImage.bind(this)
		this.handleDescription = this.handleDescription.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleRating(e){
		this.setState({
			rating: e.target.value
		})
	}
	handleTitle(e){
		this.setState({
			title: e.target.value
		})
	}
	handleLink(e){
		this.setState({
			link: e.target.value
		})
	}
	handleImage(e){
		this.setState({
			image: e.target.value
		})
	}
	handleDescription(e){
		this.setState({
			description: e.target.value
		})
	}
	handleSubmit(e){
		e.preventDefault()
		const item = {
			title: this.state.title,
			rating: this.state.rating,
			link: this.state.link,
			image: this.state.image,
			description: this.state.description
		}

		this.props.onItemSubmit(item)
		this.setState({
			showForm: false,
			title: '',
			rating: 5,
			link: '',
			image: '',
			description: ''
		})
	}
	render(){
		let upArrow = <Glyphicon glyph="chevron-up" />
		let addItemButton = <Button onClick={this.props.toggleButton}
										name='toggle'
										bsSize="xsmall"
										disabled={this.props.disabled}
										block
										>{ this.props.showForm ? upArrow : this.props.buttonText }</Button>
		let addItemForm = <Form className="box" onSubmit={this.handleSubmit}>
							<FormGroup bsSize="small" validationState={this.state.title.length == 0 ? "error" : "success"} >
								<ControlLabel>Title</ControlLabel>
								<FormControl
									type="text"
									autoFocus
									value={this.state.title}
									onChange={this.handleTitle}/>
								<FormControl.Feedback >
									<Glyphicon glyph={this.state.title.length == 0 ? "remove" : "text-size"} />
								</FormControl.Feedback >
							</FormGroup>
							<FormGroup bsSize="small" validationState={this.state.rating == 5 ? "error" : "success"}>
								<ControlLabel>Rating</ControlLabel>
								<input type="range"
									min="0"
									max="10" 
									step="0.1"
									value={this.state.rating}
									onChange={this.handleRating}/>
								<p>{this.state.rating}</p>
							</FormGroup>
							<FormGroup bsSize="small" validationState={this.state.link.length == 0 ? "error" : "success"}>
								<ControlLabel>Link</ControlLabel>
								<FormControl
									type="text"
									value={this.state.link}
									onChange={this.handleLink}/>
								<FormControl.Feedback >
									<Glyphicon glyph={this.state.link.length == 0 ? "remove" : "link"} />
								</FormControl.Feedback >
							</FormGroup>
							<FormGroup bsSize="small" validationState={this.state.image.length == 0 ? "error" : "success"}>
								<ControlLabel>Image</ControlLabel>
								<FormControl 
									type="text"
									value={this.state.image}
									onChange={this.handleImage}/>
								<FormControl.Feedback >
									<Glyphicon glyph={this.state.image.length == 0 ? "remove" : "picture"} />
								</FormControl.Feedback >
							</FormGroup>
							<FormGroup bsSize="small" validationState={this.state.description.length == 0 ? "error" : "success"}>
							    <ControlLabel>Description</ControlLabel>
							    <FormControl componentClass="textarea" 
							      	value={this.state.description}
							      	onChange={this.handleDescription}/>
							      <FormControl.Feedback >
									<Glyphicon glyph={this.state.description.length == 0 ? "remove" : "edit"} />
								</FormControl.Feedback >
							</FormGroup>
							<Button type="submit" bsSize="small" block>
							      Submit
							</Button>
						  </Form>
		// In wizard mode only show the form - otherwise toggle the form
		return(
			<div className={this.props.className}>
				{ addItemButton }
				{ this.props.showForm ? addItemForm : '' }
			</div>
		)
		
	}
}

export default AddItem