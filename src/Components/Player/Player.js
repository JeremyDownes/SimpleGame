import React from 'react'
import '../../reset.css'
import './Player.css'


class Player extends React.Component {
	constructor(props) {
		super(props)
		this.handleKeyPress = this.handleKeyPress.bind(this)
	}

	handleKeyPress(e) {
		this.props.move(e.keyCode)
	}

	render() {
		return <input type='text' id='player' value={this.props.position} onKeyUp={this.handleKeyPress}></input>
	}
}

export default Player