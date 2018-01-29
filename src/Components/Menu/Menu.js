import React from 'react'


class Menu extends React.Component {

	render() {
		let style= {backgroundColor: 'red', width: this.props.health+'px',height: '20px'}
		return (
			<div style = {this.props.style}>
				Health:
				<div style={style}>
					{this.props.health}
				</div>
				Coins:
				<div>
					{this.props.coin} 
				</div>
			</div>
		)
	}


}

export default Menu