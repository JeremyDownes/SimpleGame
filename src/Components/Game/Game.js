import React from 'react'
import Board from '../Board/Board'
import Player from '../Player/Player'
import GameLogic from '../../Utils/GameLogic.js'
import dragon from '../../resources/images/dragon.gif'
import './game.css'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {game: new GameLogic(21,21,[{location: [3,2], description: {type:'dragon',imgSrc: '../../resources/images/dragon.gif', style:{height: '9rem'} }},{location: [10,0]},{location: [10,1]},{location: [11,2]},{location: [12,3]},{location: [12,4]},{location: [13,5]},{location: [13,6]},{location: [14,9]},{location: [11,5]},{location: [10,6]},{location: [9,6]},{location: [8,7]},{location: [8,8]},{location: [9,9]},{location: [10,10]},{location: [11,11]},{location: [12,10]},{location: [13,9]},{location: [14,9]},{location: [15,10]},{location: [15,11]},{location: [16,12]},{location: [16,13]},{location: [17,14]},{location: [17,15]},{location: [17,16]},{location: [11,8]},{location: [12,6]},{location: [17,17]},{location: [18,18]},{location: [18,19]},{location: [19,20]},{location: [12,9]}],
				[	{location: [19,13], imgSrc: './coin.png', type: 'coin', interact: {coin: 1, remove: true}},	{location: [17, 8], imgSrc: './coin.png', type: 'coin', interact: {coin: 1, remove: true}}])
		, player: { position: [19,1],name: 'W. Wolff', type: 'human', level: 1, health: 100, magic: 50, equipped: [], experience: {points:0, experiences: []}, coin: 0, stats: [], inventory: []} }	// import from db
		this.playMove = this.playMove.bind(this)
		this.neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
		this.move = this.move.bind(this)
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

	playMove(x,y) {
		alert(x+","+y)
	}

	move(keyCode) {
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
			setTimeout(function () {
				document.getElementById(`${nextPosition[0]},${nextPosition[1]}`).appendChild(document.getElementById('player'))
				document.getElementById('input').focus()
			},1000) 
			return animation
		}
	} 

  componentDidMount() {
		document.getElementById(this.state.player.position[0]+','+this.state.player.position[1]).appendChild(document.getElementById('player'))	
	  document.getElementById('input').focus() 
	}

	render() {
		if (document.getElementById('input')) { document.getElementById('input').focus() }
		return (
			<div style={{display: 'flex'}}>			
			<img src={require('../../resources/images/dragon.gif')} className='dragon'/>
			<p style={{fontSize: "5rem"}}>Ads</p>
				<Player position = {this.state.playerPosition} move={this.move} change={this.state.playerChange}/>
				<Board handleClick={this.playMove} board={this.state.game} startGame={this.startGame} />
				<p style={{fontSize: "5rem", color: 'black'}}>Coins {this.state.player.coin}</p>
			</div>
		)
	}
}

export default Game;