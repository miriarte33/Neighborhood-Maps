import React, { Component } from 'react'

class SearchFilters extends Component {
	state = {
		state: '',
		cities: [],
		selectedCity: '', 
		limit: 10,
		query: 'burger'
	}

	changeState = state => {
		state === 'FL' ? this.setState({cities: ['Miami', 'Tallahassee', 'Orlando']}) : this.setState({cities:['New York', 'Albany']})
		this.setState({state})
	}

	changeCity = city => {
		this.setState({selectedCity: city})
	}

	changeAmount = amount => {
		this.setState({limit: amount})
	}

	changeQuery = query => {
		this.setState({query})
	}

	render() {
		return (
			<form className='search-filter' onSubmit={e => {
				e.preventDefault()
				const search = {
					city: this.state.selectedCity,
					state: this.state.state,
					limit: this.state.limit,
					query: this.state.query 
				}
				if (this.state.selectedCity !== '' && this.state.state !== '')
					this.props.changeResults(search)
			}}>
				<label htmlFor='state-select'>State: </label>
				<select id='state-select' onChange={(e) => this.changeState(e.target.value)}>
					<option value=''>--State--</option>
					<option value='FL'>FL</option>
					<option value='NY'>NY</option>
				</select>
				<label htmlFor='city-select'>City: </label>
				<select id='city-select' onChange={(e) => this.changeCity(e.target.value)}>
					<option>--City--</option>
					{this.state.cities.map(city => {
						return <option key={city} value={city}>{city}</option>
					})}
				</select>
				<input type='number' name='amount' min='1' max='30' placeholder='Amount of Markers' onChange={e => this.changeAmount(e.target.value)}/>
				<input type='text' name='query' placeholder='Search: i.e burgers' onChange={e => this.changeQuery(e.target.value)}/>
				<input type='submit' value='Apply Filters' />
			</form>
		)
	}
}

export default SearchFilters;
