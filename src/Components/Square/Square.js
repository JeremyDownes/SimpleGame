import React from 'react'
import '../../reset.css'
import './square.css'



class Square extends React.Component {
	constructor(props) {
		super(props)
		this.position = this.props.position;																															// a 2d array like [0,0] generated by the Board components render loop 
		this.handleClick = this.handleClick.bind(this)
		this.style = {height: this.props.scale+'px', width: this.props.scale+'px', maxHeight: this.props.scale+'px', maxWidth: this.props.scale+'px', fontSize: this.props.scale*1.5}
		this.imageStyle = {height: this.props.scale+'px', width: this.props.scale+'px', maxHeight: this.props.scale+'px', maxWidth: this.props.scale+'px', position: 'relative', bottom: '0px'}
	}

	handleClick() {
		this.props.handleClick(this.props.position[0],this.props.position[1])													// this passes the Game component's playMove method the value of the caller which mutates this.props.playerBoard
	}

	getObject() {
		let object = this.props.board.objectBoard[this.position[0]][this.position[1]]
		if (object) {
			if (object.description) {
				if (object.description.imgSrc) {
					return <img className={object.description.type} src={object.description.imgSrc} />
				} 
			}
		} 
	}

	healthMeter() {
	let obstacle = this.props.board.obstacleBoard[this.position[0]][this.position[1]]

		if (obstacle) {
			if(obstacle.interact) {
				let hp = obstacle.interact.remove
				if(typeof(hp)==='number'){
					return <div style={{width: this.props.scale/100*hp+'px', height: this.props.scale/15+'px', marginTop: this.props.scale*-.5+'px'}} className= "meter"></div>
				}
			}		
		}
	}

	getObstacle() {
		let obstacle = this.props.board.obstacleBoard[this.position[0]][this.position[1]]

		if (obstacle) {
			if (obstacle.description) {
				if (obstacle.description.imgSrc) {
					
					return (
					<img className={obstacle.description.type} src={obstacle.description.imgSrc} style={this.imageStyle}/>
					)
				}
			}
		}  
	}
	render() {

		let content = this.props.board.playerBoard[this.position[0]][this.position[1]]

		return (
		  <div className='square' 
		  	onClick={this.handleClick} 
				style={this.style}
				id = {this.position}
			>
			{this.healthMeter()}
			{this.getObstacle()}
			{this.getObject()}
		  </div>
		)
	}
}

export default Square