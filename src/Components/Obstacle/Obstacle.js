import React from 'react'

class Obstacle extends React.Component {

	constructor(props) {
		super(props)
		this.interval = setInterval(this.chase.bind(this),100)

	}

	chase() {
		this.props.chase(this.props.position)
	}

	componentWillUnmount() {
   clearInterval(this.interval);
}

makeID() {
	return "@"+this.props.position
}

	render() {
		
		return( <img src={this.props.src} style={this.props.style} id={this.props.id}/>)
	}
}

export default Obstacle