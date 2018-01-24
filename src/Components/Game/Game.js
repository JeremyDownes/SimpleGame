import React from 'react'
import Board from '../Board/Board'
import Player from '../Player/Player'
import GameLogic from '../../Utils/GameLogic.js'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {game: new GameLogic(21,21,[
				{location: [10,0]},
				{location: [10,1]},
				{location: [11,2]},
				{location: [12,3]},
				{location: [12,4]},
				{location: [13,5]},
				{location: [13,6]},
				{location: [14,9]},
				{location: [11,5]},
				{location: [10,6]},
				{location: [9,6]},
				{location: [8,7]},
				{location: [8,8]},
				{location: [9,9]},
				{location: [10,10]},
				{location: [11,11]},
				{location: [12,10]},
				{location: [13,9]},
				{location: [14,9]},
				{location: [15,10]},
				{location: [15,11]},
				{location: [16,12]},
				{location: [16,13]},
				{location: [17,14]},
				{location: [17,15]},
				{location: [17,16]},
				{location: [11,8]},
				{location: [12,6]},
				{location: [17,17]},
				{location: [18,18]},
				{location: [18,19]},
				{location: [19,20]},
				{location: [12,9]}
				],
				[
					{location: [19,13], imgSrc: './coin.png'},
				{location: [17, 8], imgSrc: './coin.png'}
				
				])
		, playerPosition: [19,1] }	
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
			nextPosition[0] = this.state.playerPosition[0]
			nextPosition[1] = this.state.playerPosition[1]
			switch(keyCode) {
				case 39: 
					if(document.getElementById(`${this.state.playerPosition[0]},${this.state.playerPosition[1]+1}`)) {
						nextPosition[1]++
					}
					break; 
				case 37: 
					if (document.getElementById(`${this.state.playerPosition[0]},${this.state.playerPosition[1]-1}`)) {
						nextPosition[1]--
					}
					break; 
				case 38: 
					if (document.getElementById(`${this.state.playerPosition[0]-1},${this.state.playerPosition[1]}`)) {
						nextPosition[0]--
					}
					break; 
				case 40: 
					if (document.getElementById(`${this.state.playerPosition[0]+1},${this.state.playerPosition[1]}`)) {
						nextPosition[0]++
					}
					break; 
			}
		if (this.state.game.canPlayerEnter(nextPosition)) {
			document.getElementById(`${nextPosition[0]},${nextPosition[1]}`).appendChild(document.getElementById('player'))
			this.setState({playerPosition: nextPosition})	
			nextPosition=null
			return
		}	else {
			nextPosition=[]
			return
		}
	} 

	componentDidMount() {
		document.getElementById(this.state.playerPosition[0]+','+this.state.playerPosition[1]).appendChild(document.getElementById('player'))
		if (document.getElementById('input')) { document.getElementById('input').focus() }
	}

	render() {
		if (document.getElementById('input')) { document.getElementById('input').focus() }
		return (
			<div>			
				<Player position = {this.state.playerPosition} move={this.move}/>
				<Board handleClick={this.playMove} board={this.state.game} startGame={this.startGame} />
			</div>
		)
	}
}

export default Game;