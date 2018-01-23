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
		return (
			<div id='player'>
				<img src='https://orig00.deviantart.net/3d23/f/2008/092/6/6/some_pissed_off_little_guy_by_rongs1234.jpg'/>
				<input id='input' type='text' value={this.props.position} onKeyUp={this.handleKeyPress}></input>
			</div>
		)
	}
}

export default Player