export class Minesweeper {
	constructor(numberOfRows,numberOfColumns,numberOfBombs){
		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Minesweeper.generatePlayerBoard(numberOfRows,numberOfColumns)
		this._bombBoard = Minesweeper.generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs)
	}

	get playerBoard() {
		return this._playerBoard
	}

	get bombBoard() {
		return this._bombBoard
	}	

	flipTile(rowIndex, columnIndex) {
		if(this._playerBoard[rowIndex][columnIndex]!==" ") {
			alert("This tile has already been flipped!")
			return;
		} else if (this._bombBoard[rowIndex][columnIndex]==="B") {
			this._playerBoard[rowIndex][columnIndex] = "B";
		} else {
			this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex,columnIndex);
		}
		this._numberOfTiles--
  }

  getNumberOfNeighborBombs(rowIndex,columnIndex) {
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

	get hasSafeTiles() {
		return (this._numberOfTiles-this._numberOfBombs) 
	} 

	static generatePlayerBoard(numberOfRows,numberOfColumns) {
		let board = []
		for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
			let row = []
			for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
				row.push(" ")
			}
			board.push(row)
		}
		return board
	}

	static generateBombBoard (numberOfRows,numberOfColumns,numberOfBombs) {
		let board = []
		for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
			let row = []
			for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
				row.push(null)
			}
			board.push(row)
		}
		
 	  let numberOfBombsPlaced = 0

	  while (numberOfBombsPlaced < numberOfBombs) {
	 	 	let randomRowIndex = Math.floor(Math.random() * numberOfRows)
	  	let randomColumnIndex = Math.floor(Math.random() * numberOfColumns)
	  	if (board[randomRowIndex][randomColumnIndex] !== "B") {
		  	board[randomRowIndex][randomColumnIndex] = "B"
	  		numberOfBombsPlaced++
	  	}
	  }
	  return board
	}	
}

export default Minesweeper