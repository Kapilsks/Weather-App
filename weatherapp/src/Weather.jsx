import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
export default function Weather() {
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "2a64c603645ab0d0cd4a98ca533dc138";

    const handleCityChange = (evt) => {
        setCity(evt.target.value);
        if (error) setError(false); // Reset error state when the user starts typing again
    };

    const getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                setError(true);
                return;
            }
            let jsonresponse = await response.json();
            let result = {
                city: city,
                temp: jsonresponse.main.temp,
                tempMin: jsonresponse.main.temp_min,
                tempMax: jsonresponse.main.temp_max,
                humidity: jsonresponse.main.humidity,
                feels_like: jsonresponse.main.feels_like,
                weather: jsonresponse.weather[0].description,
            };
            setWeatherData(result);
            setCity(""); // Clear input after successful weather fetch
            setError(false); // Clear error if successful
            console.log(result);
        } catch (error) {
            setError(true);
        }
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (city) {
            getWeatherInfo();
        } else {
            setError(true); 
        }
    };

    return (
        <div>
            <h4>Search for the Weather!</h4>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="outlined-basic"
                    label="City"
                    value={city}
                    variant="outlined"
                    onChange={handleCityChange}
                />
                <br /><br />
                <Button variant="contained" type="submit">
                    Search!
                </Button>
            </form>
            {error && <p style={{ color: 'red' }}>No Such Place Exists...</p>}
            {weatherData && (
                <div>
                    <h5>Weather in <b>{weatherData.city}{weatherData.humidity>80?<ThunderstormIcon/>:weatherData.temp>15?<WbSunnyIcon/>:<AcUnitIcon/>}</b></h5>
                    <p>Temperature: {weatherData.temp}°C</p>
                    <p>Min Temperature: {weatherData.tempMin}°C</p>
                    <p>Max Temperature: {weatherData.tempMax}°C</p>
                    <p>Humidity: {weatherData.humidity}%</p>
                    <p>Feels Like: {weatherData.feels_like}°C</p>
                    <p>Description: {weatherData.weather}</p>
                </div>
            )}
        </div>
    );
}
