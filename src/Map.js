// https://stackoverflow.com/questions/44729776/how-can-animation-be-added-to-markers-in-react-google-maps
/* global google */

import React, { Component } from 'react' 
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import './css/map.css'

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
	<GoogleMap
		defaultZoom={8}
		zoom={props.results.zoom}
		defaultCenter={{ lat: -34.397, lng: 150.644 }}
		center={props.results.center}
	>
		{props.results.markers.filter(marker => marker.isRendered).map(marker => {
			const info = props.results.places.find(place => place.id === marker.placeId)
			return (
				<Marker key={`lat: ${marker.lat} lng: ${marker.lng}`} 
					position={{ lat: marker.lat, lng: marker.lng}}
					onClick={() => props.markerClickEvent(marker)}
					animation={marker.showInfo ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
				>
					{marker.showInfo && (
						<InfoWindow> 
							<div className='info'>
								{info.bestPhoto && (
									<img src={`${info.bestPhoto.prefix}150x150${info.bestPhoto.suffix}`} 
										alt={`${info.name}`} />
								)}
								<h1>{info.name}</h1>
								<p>{info.location.address}</p>
								<button onClick={() => props.markerZoom(marker.lat, marker.lng)}>Toggle Zoom</button>
							</div>
						</InfoWindow>
					)}
				</Marker>
			)
		})}
	</GoogleMap>
))

class Map extends Component {
	render() {
		return (
			<MyMapComponent
				{...this.props}
				googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_MAPSKEY}`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `100%`, width: `75%` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		)
	}
}

export default Map; 


