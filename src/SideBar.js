import React, { Component } from 'react'
import PlaceList from './PlaceList'
import SearchFilters from './SearchFilters'

class SideBar extends Component {
	render() {
		return (
			<div>
				<aside>
					<SearchFilters changeResults={this.props.changeResults} />  
					<PlaceList onItemClick={this.props.onItemClick}className='side-bar' places={this.props.places} />
				</aside>
			</div>
		)
	}
}

export default SideBar
