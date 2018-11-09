import React, { Component } from 'react'

class Place extends Component {
	render() {
		const { place } = this.props
		return (
			<li onClick={() => this.props.onItemClick(place)} tabIndex={this.props.index} className='list-item'>
				<ul className='place-details'>
					<li>{place.name}</li>
					<li>{place.location.address}</li>
				</ul>
			</li>
		)
	}
}

export default Place
