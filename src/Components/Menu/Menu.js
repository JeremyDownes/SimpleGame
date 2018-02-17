import React from 'react'
import './menu.css'


class Menu extends React.Component {

	constructor(props){
		super(props)
		this.expandInventory = 'collapse'
		this.expandAttributes = 'collapse'
		this.expandExperience = 'collapse'
	}

	expand(field) {
		switch (field) {
			case 'Inventory' :
				this.expandInventory === 'collapse'? this.expandInventory = 'expand' : this.expandInventory = 'collapse'
				break

			case 'Attributes' :
				this.expandAttributes === 'collapse'? this.expandAttributes = 'expand' : this.expandAttributes = 'collapse'
				break

			case 'Experience' :
				this.expandExperience === 'collapse'? this.expandExperience = 'expand' : this.expandExperience = 'collapse'
				break
		}
		this.setState({})
	}

	render() {
		let direction = this.props.direction === 'row' ? 'column':'row'
		let reverse =  this.props.direction === 'row' ? 'row':'row'
		let size = this.props.size
		let style= {display: 'flex', flexDirection: direction, justifyContent: 'space-around', alignItems: 'center',flexWrap: 'wrap', fontSize: '2rem', marginTop: this.props.size/35, }
		return (
			<div style = {this.props.style} className='menuRoot'>
			 <div style = {style}>
			 	<h1> {this.props.player.name}</h1>
					<div style={style}>
						Health:
						<div style={{backgroundColor: 'red', width: this.props.player.attributes.health+'px', height: '1.5rem'}}>
						</div>
					</div>	

					<div style={style}>
						Magic:
						<div style={{backgroundColor: 'green', width: this.props.player.attributes.magic+'px', height: '1.5rem'}}>
						</div>
					</div>						

					<div style={style}>
					  Coins:
						{this.props.player.inventory.coin} 
					</div>
					
					<div style={{width: '90%', display: 'flex',flexDirection: reverse, justifyContent: 'space-around'}}>
						<div id='eqp1' style={{width: this.props.size/3+'px', height: this.props.size/3+'px'}}></div>
						<div id='eqp2'style={{width: this.props.size/3+'px', height: this.props.size/3+'px'}}></div>
					</div>

					<div className= 'Inventory' style= {style} onClick={this.expand.bind(this,'Inventory')}>
						<span class="fa  fa-caret-up">  Inventory</span>
						<div className = {this.expandInventory}>
							{this.props.player.inventory.inventory.map(item=> <img className= 'item' src={item.description.imgSrc}/>)}
						</div>
					</div>

					<div className= 'Attributes' style= {style} onClick={this.expand.bind(this,'Attributes')}>
						<span class="fa  fa-caret-up">  Attributes</span>
						<div className = {this.expandAttributes}>
							{this.props.player.inventory.inventory.map(item=> <img className= 'item' src={item.description.imgSrc}/>)}
						</div>
					</div>

					<div className= 'Experience' style= {style} onClick={this.expand.bind(this,'Experience')}>
						<span class="fa  fa-caret-up">  Experience</span>
						<div className = {this.expandExperience}>
							<ul>
								<li>Points: {this.props.player.experience.points}</li>
								{this.props.player.experience.experiences.map(item=> <li>item</li>)}
							</ul>
						</div>
					</div>					
				</div>
			</div>
		)
	}


}

export default Menu