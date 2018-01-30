import React from 'react'
import './menu.css'


class Menu extends React.Component {

	render() {
		let direction = this.props.direction === 'row' ? 'column':'row'
		let size = this.props.size
		let style= {display: 'flex', flexDirection: direction, justifyContent: 'space-around', alignItems: 'center',flexWrap: 'wrap', fontSize: '2rem', margin: this.props.size/15, }
		return (
			<div style = {this.props.style} className='menuRoot'>
			 <div style = {style}>
					<div style={style}>
						Health:
						<div style={{backgroundColor: 'red', width: this.props.health+'px', height: '1.5rem'}}>
						</div>
					</div>	
					
					<div>
					  Coins:
						{this.props.coin} 
					</div>
				</div>
			</div>
		)
	}


}

export default Menu