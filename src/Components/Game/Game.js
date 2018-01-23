import React from 'react'
import Board from '../Board/Board'
import Player from '../Player/Player'
import Minesweeper from '../../Utils/minesweeper.js'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {game: new Minesweeper(10,10,1), playerPosition: [0,0] }	
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
		let nextPosition =[]
		nextPosition = this.state.playerPosition
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
		
		document.getElementById(`${nextPosition[0]},${nextPosition[1]}`).appendChild(document.getElementById('player'))
		this.setState({playerPosition: nextPosition})

	} 

	componentDidMount() {
		document.getElementById('0,0').appendChild(document.getElementById('player'))
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