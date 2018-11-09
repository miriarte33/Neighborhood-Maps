import React, { Component } from 'react'
import Place from './Place'
import './css/sidebar.css'

class PlaceList extends Component {
	render() {
		return (
			<div>
				<h1 style={{textAlign: 'center'}}> Search Results </h1>
				<ol className='place-list'>
					{this.props.places.map((place,index) => {
						return <Place onItemClick={this.props.onItemClick} index={index} place={place} key={`${index}: ${place.name}`}/>
					})}
				</ol>
			</div>
		)
	}
}

export default PlaceList
