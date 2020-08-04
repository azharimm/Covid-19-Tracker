import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core'
import './App.css';

const App  = () => {
	const [countries, setCountries] = useState([]);

	// https://disease.sh/v3/covid-19/countries
	
	useEffect(() => {
		const getCountriesData = async () => {
			const response = await fetch('https://disease.sh/v3/covid-19/countries')
			const responseData = await response.json();
			const countriesData = responseData.map(country => {
				return {
					name: country.country,
					value: country.countryInfo.iso2
				}
			})

			setCountries(countriesData)
		}

		getCountriesData();

	}, []);

	return (
		<div className="App">
			<div className="app_header">
				<h1>Covid-19 Tracker</h1>
				<FormControl className="app_dropdown">
					<Select
					variant="outlined"
					value="abc">
						{
							countries.map((country, index) => (
								<MenuItem value={country.value} key={index}>{country.name}</MenuItem>
							))
						}
					</Select>
				</FormControl>
			</div>
			{/* Header */}
			{/* Title + Select Dropdown */}

			{/* Infoboxs */}
			{/* Infoboxs */}
			{/* Infoboxs */}

			{/* Table Cases Count */}
			{/* Graph */}

			{/* Maps */}
		</div>
	);
}

export default App;
