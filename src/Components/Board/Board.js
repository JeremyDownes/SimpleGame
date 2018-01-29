import React from 'react'
import Square from '../Square/Square'
import Player from '../Player/Player'
import '../../reset.css'
import './board.css'

class Board extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)

	}

	handleClick(x,y) {
		this.props.handleClick(x,y);																									  // passes the event from a square to the game
	}

	render() {
		let style = {																																		//  Dynamic style
		  gridTemplateColumns: '1fr '.repeat(this.props.board.playerBoard[0].length),		//  Adding another fraction of screen for every item column in our playerBoard array	
 		  gridTemplateRows: '1fr '.repeat(this.props.board.playerBoard.length)					//  Doing the same for every row
		};
		let iRow = -1																																	// I itterate first thing and it's index values so itterators to -1
		let iColumn =-1																																

		return (
			<div className='board' style={style}>															
				{
					this.props.board.playerBoard.map(row=> {
						iRow++
						return row.map(square=> {
							iColumn++
							iColumn=iColumn%this.props.board.playerBoard[0].length;
							return <Square board={this.props.board} position={[iRow,iColumn]} id={iRow+iColumn} handleClick={this.handleClick} scale={this.props.scale} chase={this.props.chase}/> 
						})
					})
				}
			</div>
		)
	}
}

export default Board;
/*
		return (
			<div className='board' style={style}>																				  // applies our dynamic style dividing our veiwport grid up like we want

				{
					this.props.board.playerBoard.map(row=> {																	// Start the loop for each row
						iRow++;																																	// itterate up to (0,-1)
						return row.map(square=> {																								// Start the loop for each column within the row
							iColumn++;																														// itterate up to (0,0)
							iColumn=iColumn%this.props.board.playerBoard[0].length;								// mod by length sets our count back to 0 when it hits the length	
							return <Square board={this.props.board} position={[iRow,iColumn]} handleClick={this.handleClick} /> ;  //we render a square with a reference to the game board it's position and a reference to an event handler
						})																																																				
					})											// the squares render nicely into a grid based on the array dimensions
				}
			</div>
		);
	*/