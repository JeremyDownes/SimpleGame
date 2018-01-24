import React from 'react'
import '../../reset.css'
import './Player.css'
import character from './some_pissed_off_little_guy_by_rongs1234.png' // needs Character.js


class Player extends React.Component {
	constructor(props) {
		super(props)
		this.handleKeyPress = this.handleKeyPress.bind(this)
	}

	handleKeyPress(e) {
		this.props.move(e.keyCode)
	}

	render() {
		return (
			<div id='player'>
				<img src={character}/>
				<input id='input' type='text' value={this.props.position} onKeyUp={this.handleKeyPress}></input>
			</div>
		)
	}
}

export default Player