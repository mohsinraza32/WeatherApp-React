import axios from 'axios';
import { useState } from 'react';
export const WeatherApp = () => {

    const apikey = "f3c6821617cc1cd2f498d07bb6e6dc33";
    
    const [inputCity, setInputCity] = useState('');
    const [data, setData] = useState({});
    const [isVisible, setIsVisible] = useState(false);

    const getWeatherData = (cityName) => {
        if(!cityName)return;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`;

        axios.get(apiUrl)
            .then((res) => {
                console.log("response", res.data)
                setData(res.data);

            }).catch((err) => {
                console.log("err", err);

            }) 
    }
   
    const handleInputChange = (e) => {
           setInputCity(e);
           console.log("data:" , inputCity);
                  
    }
    const handleSearch = () => {
                if(!inputCity)return;
                getWeatherData(inputCity);
                setIsVisible(true);                     
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="container">
            <h1>Weather App</h1>
            <div className="input-data">
                <form onSubmit={handleFormSubmit}>
                    <input type="text" name="text" autoComplete='off' placeholder="Enter City Name..." className="input-form"
                        onChange={(e) => handleInputChange(e.target.value)}
                        value={inputCity}
                    />
                    <input type="submit" value="Search" className='serach-btn' onClick={handleSearch}/>

                </form>
                {isVisible && (<div className="weather-data">
                    <h4 className="cityname">{data?.name}</h4>
                    <h4 className="weathertemp">{((data?.main?.temp) - 273.15).toFixed(0)}°C</h4>
                    <h5 className="weatherCondition">{data?.weather?.[0].main}</h5>
                    <h6 className="weatherHumidity">Humidity:{data?.main?.humidity}%</h6>
                </div>
                )}
            </div>
        </div>
    )
} 