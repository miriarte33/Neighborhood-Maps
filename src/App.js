import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map'
import SideBar from './SideBar'
import FoursquareAPI from './api/foursquare'

class App extends Component {
	state = {
		places: [], 
		markers: [],
		center: {},
		zoom: 11,
		search: {
			near: 'Miami,FL',
			query: 'burgers',
			limit: 10
		}
	}

	componentDidMount() {
		FoursquareAPI.search(this.state.search).then(results => {
			const markers = results.response.venues.map(place => {
				return {
					lat: place.location.lat,
					lng: place.location.lng,
					showInfo: false,
					isRendered: true,
					placeId: place.id
				}
			})

			this.setState({
				places: results.response.venues,
				markers,
				center: results.response.geocode.feature.geometry.center
			})
		}).catch(err => alert(`There was an error loading your map:\n${err}`))
	}

	markerClicked = markerClicked => {
		this.closeMarkers()
		const markers = this.state.markers.map(marker => {
			if (marker.lng === markerClicked.lng && marker.lat === markerClicked.lat) 
				marker.showInfo = true
			return marker
		})
		this.setState({markers})
		const place = this.state.places.find(place => place.id === markerClicked.placeId)
		FoursquareAPI.getDetails(markerClicked.placeId).then(results => {
			const clickedPlace = Object.assign(place, results.response.venue)
			this.setState({places: Object.assign(this.state.places, clickedPlace)}) // copies the clicked place to the placesarray in the state so we can get the details and photo
		}).catch(err => alert(`There was an error gathering information about this marker:\n${err}`))
	}

	listItemClicked = listItem => {
		// find the marker that corresponds to this list item
		const marker = this.state.markers.find(marker => marker.placeId === listItem.id)
		this.markerClicked(marker)
	}

	closeMarkers = () => {
		const markers = this.state.markers.map(marker => {
			marker.showInfo = false
			return marker
		})
		this.setState({markers})
	}

	changeResults = (search) => {
		FoursquareAPI.search({
			near: `${search.city},${search.state}`,
			limit: search.limit,
			query: search.query
		}).then(results => {
			const markers = results.response.venues.map(place => {
				return {
					lat: place.location.lat,
					lng: place.location.lng,
					showInfo: false,
					isRendered: true,
					placeId: place.id
				}
			})

			this.setState({
				places: results.response.venues,
				markers,
				center: results.response.geocode.feature.geometry.center
			})
		}).catch(err => alert(`There was an error loading your map:\n${err}`))
	}

	zoom = (lat, lng) => {
		this.setState({center:{lat, lng}, zoom: 20})
		if (this.state.zoom === 20) 
			this.setState({zoom: 11})
	}

	render() {
		return (
			<div className='container'>
				<Map className='map' results={this.state} markerClickEvent={this.markerClicked} markerZoom={this.zoom}/> 
				<SideBar places={this.state.places} changeResults={this.changeResults} onItemClick={this.listItemClicked} /> 
			</div>
		);
	}
}

export default App;
