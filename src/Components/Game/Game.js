import React from 'react'
import Board from '../Board/Board'
import Player from '../Player/Player'
import Menu from '../Menu/Menu'
import GameLogic from '../../Utils/GameLogic.js'
import Obstacles from '../../Utils/Obstacles.js'
import Objects from '../../Utils/Objects.js'
import './game.css'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {game: new GameLogic(21,21,Obstacles,Objects)
		, player: { position: [19,1],name: 'W. Wolff', attributes: {type: 'human', level: 1, health: 100, magic: 50,  strength: 9, attributes: []}, experience: {points:0, experiences: []}, inventory: {equipped: {sword: 1}, coin: 0 }}
		, obstacles: [], objects: [], playerMoving: null
		 }	// import from db
		this.playMove = this.playMove.bind(this)
		this.movePlayer = this.movePlayer.bind(this)
		this.neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
		this.move = this.move.bind(this)
		this.chase = this.chase.bind(this)
		this.direction = [0,-1]
		this.destination = this.state.player.position
		this.scale = window.innerHeight <= window.innerWidth ? window.innerHeight / 21 : window.innerWidth / 21
		this.remainder = window.innerHeight <= window.innerWidth ? window.innerWidth - window.innerHeight : window.innerHeight - window.innerWidth
		this.points = 0;
	}

	clear(x,y) {	
		this.neighborOffsets.forEach(offset=> {
			if (this.state.game.hasSafeTiles === 0) {
				return
			}
			let fX = offset[0]+x
			let fY = offset[1]+y
			if(fX >= 0 && fY >= 0 && fX < this.state.game.playerBoard.length && fY < this.state.game.playerBoard[0].length) {
				if(this.state.game.playerBoard[fX][fY] === ' ') {
					this.playMove(fX,fY)
					return
				}
			}	
		})
	}

	caught() {
		let player = this.state.player
		player.attributes.health -= 5
		this.setState({player: player})
		let alive = true 
		if (this.state.player.attributes.health<=0) {
			if (alive){alert('You Died')}
				alive=false
			document.location.reload()
		}
	}

	chase(position) {
		let candidate = [position[0] + this.direction[0],position[1]+this.direction[1]]
		if (candidate[0] === this.state.player.position[0] && candidate[1] === this.state.player.position[1]) {this.caught()}
		
		if (candidate[0] >= 0 && candidate[0] < 21 && candidate[1] >= 0 && candidate[1] < 21) {

			if (this.state.game.obstacleBoard[candidate[0]][candidate[1]]) {
				let directions = [[1,0],[0,1],[-1,0],[0,-1]]
				this.direction= directions[Math.floor(Math.random()*4)]
			} else {
				let game = this.state.game
				game.obstacleBoard[candidate[0]][candidate[1]] = game.obstacleBoard[position[0]][position[1]]
				game.obstacleBoard[position[0]][position[1]] = null
				this.setState({game:game})
			}
		} else {
				let directions = [[1,0],[0,1],[-1,0],[0,-1]]
				this.direction= directions[Math.floor(Math.random()*4)]
		}
	}

	movePlayer() {   // this is still set up for arrow keycodes... refactor?
		let x = null
		let y = null
		let keyCode = []
		this.destination[0] > this.state.player.position[0] ? x=true : x=false
		this.destination[1] > this.state.player.position[1] ? y=true : y=false
		if (x&&y) {
			(this.destination[0] - this.state.player.position[0]) >= (this.destination[1] - this.state.player.position[1]) ? keyCode=[40,39]  : keyCode = [39,40]
		}
		if (!x&&!y) {
			(this.state.player.position[0] - this.destination[0]) >= (this.state.player.position[1] - this.destination[1]) ? keyCode=[38,37] : keyCode=[37,38]
		}
		if (x&&!y) {
			(this.destination[0] - this.state.player.position[0]) >= (this.state.player.position[1] - this.destination[1]) ? keyCode=[40,37] : keyCode=[37,40] 
		}
		if (!x&&y) {
			(this.state.player.position[0] - this.destination[0]) >= (this.destination[1] - this.state.player.position[1]) ? keyCode=[38,39] : keyCode=[39,38] 
		}
		

		if (this.destination[0] !== this.state.player.position[0] || this.destination[1] !== this.state.player.position[1] ){
			if (!this.state.playerMoving) {
				this.state.playerMoving = setInterval(function() {this.movePlayer()}.bind(this) ,300)
			}
			this.move(keyCode)
		} 
	}

	playMove(x,y) {
		if(this.state.game.obstacleBoard[x][y]===null) {
			this.destination = [x,y]
			this.movePlayer()
		}
		else {this.obstacleInteract(x,y)}
	}

	combat(x,y)
		{
			let obstacle = this.state.game.obstacleBoard[x][y]
			let moves = obstacle.description.interact.combat
			let playerAttack = Math.floor(Math.random()*(this.state.player.attributes.strength * this.state.player.inventory.equipped.sword))
			let opponentAttack = Math.floor(Math.random()*(moves[Math.floor(Math.random()*moves.length)]))
			let player = this.state.player
			let game = this.state.game
			player.attributes.health -= opponentAttack 
			obstacle.description.interact.hp -= playerAttack
			game.obstacleBoard[x][y] = obstacle
			this.setState({player: player, game: game})
		}

	obstacleInteract(x,y) {
		let obstacle = this.state.game.obstacleBoard[x][y] 
		if(obstacle.description.interact) {
			if(obstacle.description.interact.remove) {
				if(obstacle.description.interact.combat) {
				// this.combat returns x,y 
				} else {
				// this.qualify	returns require object  
				}
			} else {
				if(obstacle.description.interact.speak) {
				// this.speak passes conversation object
				}
				if(obstacle.description.interact.attribute) {
				// this.attribute returns attribute object
				}
			}
		}
	}

	objectInteract (position)
	{
		let player= this.state.player
		let game = this.state.game
		if(this.state.game.objectBoard[position[0]][position[1]].interact.coin) {
			player.inventory.coin += this.state.game.objectBoard[position[0]][position[1]].interact.coin
		} 
		if(this.state.game.objectBoard[position[0]][position[1]].interact.remove) {
			game.objectBoard[position[0]][position[1]] = null
		}			
		this.setState({player: player, game : game })
	}

	move(keyCode) { // also still using key codes

		if (this.destination[0] === this.state.player.position[0] && this.destination[1] === this.state.player.position[1] ) {
			let interval = this.state.playerMoving
			this.setState({playerMoving: null})
			clearInterval(interval)
			return
		}

		if (this.state.player.inventory.coin === 15) {
			let thisState = this.state
			thisState.game.objectBoard[0][0] = 	{location: [0,0], imgSrc: require('../../resources/images/objects/exit.jpg'), type: 'exit', interact: {function: 'nextLevel', remove: true}}
		}

		let nextPosition = []
		let player = this.state.player
		nextPosition[0] = this.state.player.position[0]
		nextPosition[1] = this.state.player.position[1]
		nextPosition = this.state.game.doesPositionExist(keyCode[0],nextPosition)

		if (this.state.game.canPlayerEnter(nextPosition)) {
			if (this.state.game.objectBoard[nextPosition[0]][nextPosition[1]]) {
				this.objectInteract(nextPosition)
			}
			player.position = nextPosition
			this.setState({player: player})	
				document.getElementById(`${nextPosition[0]},${nextPosition[1]}`).appendChild(document.getElementById('player'))
			return true // animation
		} else {
			nextPosition[0] = this.state.player.position[0]
			nextPosition[1] = this.state.player.position[1]
			nextPosition = this.state.game.doesPositionExist(keyCode[1],nextPosition)

			if (this.state.game.canPlayerEnter(nextPosition))

				if (this.state.game.objectBoard[nextPosition[0]][nextPosition[1]]) {
					player = this.objectInteract(nextPosition)
				}
				player.position = nextPosition
				this.setState({player: player})	
					document.getElementById(`${nextPosition[0]},${nextPosition[1]}`).appendChild(document.getElementById('player'))
				return true // animation
			}	
		
	} 



  componentDidMount() {
		document.getElementById(this.state.player.position[0]+','+this.state.player.position[1]).appendChild(document.getElementById('player'))	
	}

	render() {
			let direction = window.innerHeight <= window.innerWidth ? 'row' : 'column'
			let sideBarSize = direction === 'row' ? {width: this.remainder/2+'px'} : {height: this.remainder/2+'px'}  
		return (
			<div style={{display: 'flex', flexDirection: direction}}>	
				<div className = 'ads' style={sideBarSize} ></div>	
				<Player position = {this.state.playerPosition} move={this.move} change={this.state.playerChange} scale = {this.scale}/>
				<Board handleClick={this.playMove} board={this.state.game} startGame={this.startGame} scale={this.scale} chase={this.chase}/>
				<Menu coin={this.state.player.inventory.coin} health={this.state.player.attributes.health} style={sideBarSize} direction={direction} size={this.remainder/2}/>
			</div>
		)
	}
}

export default Game;