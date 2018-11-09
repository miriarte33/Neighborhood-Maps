class Helper {
	constructor() {
		this.baseUrl = 'https://api.foursquare.com/v2/'  
		this.keys = {
			client_id: process.env.REACT_APP_CLIENT_ID,
			client_secret: process.env.REACT_APP_CLIENT_SECRET, 
			v: '20181015'
		}
	}

	stringifyObject(keys) {
		return Object.keys(keys).map(key => `${key}=${keys[key]}`).join('&')
	}

	urlBuild(parameters) {
		return !parameters ? '' : this.stringifyObject(parameters) 
	}

	headers() {
		return {
			Accept: 'application/json'
		}
	}

	fetchUrl(destination, method, urlParameters) {
		let request = {
			method, 
			headers: this.headers()
		}
		return fetch(
			`${this.baseUrl}${destination}?${this.stringifyObject(this.keys)}&${this.urlBuild(urlParameters)}`,
			request
		).then(response => response.json()).catch(err => {
			alert("There was an error")
		})
	}
}

class FoursquareAPI {
	static search(urlParameters) {
		let helper = new Helper()
		return helper.fetchUrl('venues/search', 'GET', urlParameters)
	}

	static getDetails(placeId) {
		let helper = new Helper()
		return helper.fetchUrl(`venues/${placeId}`, 'GET')
	}

	static getPhotos(placeId) {
		let helper = new Helper()
		return helper.fetchUrl(`venues/${placeId}/photos`, 'GET')
	}
}

export default FoursquareAPI 
