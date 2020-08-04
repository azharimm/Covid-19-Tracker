import React, { useState, useEffect } from 'react';
import {
    FormControl,
    Select,
    MenuItem,
    Card,
    CardContent
} from '@material-ui/core';
import { sortData } from './utils';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import './App.css';
import "leaflet/dist/leaflet.css"


const App = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796});
	const [mapZoom, setMapZoom] = useState(3)

    // https://disease.sh/v3/covid-19/countries

    useEffect(() => {
        const getCountriesData = async () => {
            const response = await fetch(
                'https://disease.sh/v3/covid-19/countries'
            );
            const responseData = await response.json();
            const countriesData = responseData.map((country) => {
                return {
                    name: country.country,
                    value: country.countryInfo.iso2
                };
			});
			setCountries(countriesData);
			setTableData(sortData(responseData));
        };

        getCountriesData();
	}, []);
	
	useEffect(() => {
		fetch('https://disease.sh/v3/covid-19/all')
			.then(response => response.json())
			.then(data => {
				setCountryInfo(data);	
			});
	}, [])

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);

        const url =
            countryCode === 'worldwide'
                ? 'https://disease.sh/v3/covid-19/all'
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        const response = await fetch(url);
		const responseData = await response.json();
		setMapCenter([responseData.countryInfo.lat, responseData.countryInfo.long])
        setCountryInfo(responseData);
    };

    return (
        <div className="app">
            <div className="app__left">
                <div className="app__header">
                    <h1>Covid-19 Tracker</h1>
                    <FormControl className="app__dropdown">
                        <Select
                            variant="outlined"
                            value={country}
                            onChange={onCountryChange}
                        >
                            <MenuItem value="worldwide">Worldwide</MenuItem>
                            {countries.map((country, index) => (
                                <MenuItem value={country.value} key={index}>
                                    {country.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className="app__stats">
                    <InfoBox
                        title="Jumlah Kasus"
                        cases={countryInfo.todayCases}
                        total={countryInfo.cases}
                    />
                    <InfoBox
                        title="Sembuh"
                        cases={countryInfo.todayRecovered}
                        total={countryInfo.recovered}
                    />
                    <InfoBox
                        title="Meninggal"
                        cases={countryInfo.todayDeaths}
                        total={countryInfo.deaths}
                    />
                </div>

                <Map center={mapCenter} zoom={mapZoom} />
            </div>
            <div className="app__right">
                <Card>
                    <CardContent>
                        <h3>Jumlah Kasus Berdasarkan Negara</h3>
						<Table countries={tableData} />
                        <h3>Kasus Baru Seluruh Dunia</h3>
						<LineGraph />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default App;
