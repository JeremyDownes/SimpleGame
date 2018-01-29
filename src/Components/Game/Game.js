import React from 'react'
import Board from '../Board/Board'
import Player from '../Player/Player'
import Menu from '../Menu/Menu'
import GameLogic from '../../Utils/GameLogic.js'
import Obstacles from '../../Utils/Obstacles.js'
import './game.css'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {game: new GameLogic(21,21,Obstacles,
				[	{location: [19,13], imgSrc: './coin.png', type: 'coin', interact: {coin: 1, remove: true}},	{location: [17, 8], imgSrc: './coin.png', type: 'coin', interact: {coin: 1, remove: true}}])
		, player: { position: [19,1],name: 'W. Wolff', type: 'human', level: 1, health: 100, magic: 50, equipped: [], experience: {points:0, experiences: []}, coin: 0, stats: [], inventory: []}
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
		player.health -= 5
		this.setState({player: player})
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

	movePlayer() {
		let x = null
		let y = null
		let keyCode = null
		this.destination[0] > this.state.player.position[0] ? x=true : x=false
		this.destination[1] > this.state.player.position[1] ? y=true : y=false
		if (x&&y) {
			(this.destination[0] - this.state.player.position[0]) >= (this.destination[1] - this.state.player.position[1]) ? keyCode=40 : keyCode=39
		}
		if (!x&&!y) {
			(this.state.player.position[0] - this.destination[0]) >= (this.state.player.position[1] - this.destination[1]) ? keyCode=38 : keyCode=37 
		}
		if (x&&!y) {
			(this.destination[0] - this.state.player.position[0]) >= (this.state.player.position[1] - this.destination[1]) ? keyCode=40 : keyCode=37 
		}
		if (!x&&y) {
			(this.state.player.position[0] - this.destination[0]) >= (this.destination[1] - this.state.player.position[1]) ? keyCode=38 : keyCode=39 
		}
		

		if (this.destination[0] !== this.state.player.position[0] || this.destination[1] !== this.state.player.position[1] ){
			if (!this.state.playerMoving) {
				this.state.playerMoving = setInterval(function() {this.movePlayer()}.bind(this) ,200)
			}
			this.move(keyCode)
		} 
	}

	playMove(x,y) {
		this.destination = [x,y]
		this.movePlayer()
	}

	move(keyCode) {
		if (this.destination[0] === this.state.player.position[0] && this.destination[1] === this.state.player.position[1] ) {
			let interval = this.state.playerMoving
			this.setState({playerMoving: null})
			clearInterval(interval)
			alert(this.destination)
			return
		}

			let nextPosition = []
			let player = this.state.player
			let animation = false
			nextPosition[0] = this.state.player.position[0]
			nextPosition[1] = this.state.player.position[1]
			switch(keyCode) {
				case 39: 
					if(document.getElementById(`${this.state.player.position[0]},${this.state.player.position[1]+1}`)) {
						nextPosition[1]++
						animation = 'righting'
					}
					break; 
				case 37: 
					if (document.getElementById(`${this.state.player.position[0]},${this.state.player.position[1]-1}`)) {
						nextPosition[1]--
						animation = 'lefting'
					}
					break; 
				case 38: 
					if (document.getElementById(`${this.state.player.position[0]-1},${this.state.player.position[1]}`)) {
						nextPosition[0]--
						animation = 'upping'
					}
					break; 
				case 40: 
					if (document.getElementById(`${this.state.player.position[0]+1},${this.state.player.position[1]}`)) {
						nextPosition[0]++
						animation = 'downing'
					}
					break; 
			}

		if (this.state.game.canPlayerEnter(nextPosition)) {
			if (this.state.game.objectBoard[nextPosition[0]][nextPosition[1]]) {
				player = this.state.game.objectInteract(nextPosition,player)
			}

			player.position = nextPosition
			this.setState({player: player})	
			
				document.getElementById(`${nextPosition[0]},${nextPosition[1]}`).appendChild(document.getElementById('player'))
				document.getElementById('input').focus()
		
			return animation
		} else { 
			let codes = [37,38,39,40]
			this.move(codes[Math.floor(Math.random()*4)])
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
				<Player position = {this.state.playerPosition} move={this.move} change={this.state.playerChange}/>
				<Board handleClick={this.playMove} board={this.state.game} startGame={this.startGame} scale={this.scale} chase={this.chase}/>
				<Menu coin={this.state.player.coin} health={this.state.player.health} style={sideBarSize}/>
			</div>
		)
	}
}

export default Game;