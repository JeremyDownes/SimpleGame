export class GameLogic {
	constructor(numberOfRows,numberOfColumns,obstacles,objects){
		this._obstacles = obstacles;	// [{location: [2,3], type: 'fire', changeable: true, doesDamage: true},{location: [20,16], type: 'wall', changeable: false, doesDamage: false}]
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = GameLogic.generatePlayerBoard(numberOfRows,numberOfColumns)
		this._obstacleBoard = GameLogic.generateObstacleBoard( GameLogic.generatePlayerBoard(numberOfRows,numberOfColumns),obstacles)
		this._objectBoard = GameLogic.generateObjectBoard( GameLogic.generatePlayerBoard(numberOfRows,numberOfColumns),objects)
	}

	get playerBoard() {
		return this._playerBoard
	}

	get obstacleBoard() {
		return this._obstacleBoard
	}	

	get objectBoard() {
		return this._objectBoard
	}	

	objectInteract(objXY,player) {
		let obj = this.objectBoard[objXY[0]][objXY[1]]
		let interact = obj.interact
		let key =Object.keys(interact)[0]
		if(typeof(obj.interact[key])==='number') {
			player[key] += obj.interact[key]
		}
		if(obj.interact.remove) {
			this.objectBoard[objXY[0]][objXY[1]] = null
		}
		return player
	}

	canPlayerEnter(position) {
		let x = position[0]
		let y = position[1]
		if(this._obstacleBoard[x][y]) {
			return false
		} else {
			return true
		}
	}

	static generatePlayerBoard(numberOfRows,numberOfColumns) {
		let board = []
		for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
			let row = []
			for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
				row.push(null)
			}
			board.push(row)
		}
		return board
	}

	static generateObstacleBoard (board,obstacles) {
		obstacles.forEach(obstacle=> {
			let x = obstacle.location[0]
			let y = obstacle.location[1]
			board[x][y] = obstacle
		})
		console.log(board)
	  return board
	}	

	static generateObjectBoard (board,objects) {
		objects.forEach(object=> {
			let x = object.location[0]
			let y = object.location[1]
			board[x][y] = object
		})
		console.log(board)
	  return board
	}	
}

export default GameLogic

/*  getNumberOfNeighborBombs(rowIndex,columnIndex) {
		const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
		const numberOfRows = this._bombBoard.length
		const numberOfColumns = this._bombBoard[0].length
		let numberOfBombs = 0
		neighborOffsets.forEach(offset => {
			const neighborRowIndex = rowIndex + offset[0]
			const neighborColumnIndex = columnIndex + offset[1]
			if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
				if (this._bombBoard[neighborRowIndex][neighborColumnIndex]==="B") {
					numberOfBombs++
				}
			}
		})
		return numberOfBombs
	}
*/