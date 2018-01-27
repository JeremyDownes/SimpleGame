import React from 'react'
import '../../reset.css'
import './Player.css'
import walk from './step.gif' // needs Character.js
import stand from './some_pissed_off_little_guy_by_rongs1234.png'

class Player extends React.Component {
	constructor(props) {
		super(props)
		this.state = {currentAnimation: 'stand', animation: {stand: require('./some_pissed_off_little_guy_by_rongs1234.png'), walk: require('./step.gif'), left: require('./left.gif')}}
		this.handleKeyPress = this.handleKeyPress.bind(this)
		this.class = ''
	}

	handleKeyPress(e) {
		let animation = this.props.move(e.keyCode)
		if(animation) {
			this.class = animation
			this.setState({currentAnimation: 'walk'})
			setTimeout(function() {
				this.class = ''
				this.setState({currentAnimation: 'stand'})
			}.bind(this),1000)
	
		}
	}

	render() {
		return (
			<div id='player' className={this.class}>
				<img src={this.state.animation[this.state.currentAnimation]}/>
				<input id='input' type='text' value={this.props.position} onKeyUp={this.handleKeyPress} autoFocus='true'></input>
			</div>
		)
	}
}

export default Player