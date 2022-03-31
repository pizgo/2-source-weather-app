import { useState } from "react";
import WeatherAPIType from "../api/WeatherAPIType";
import WeatherApi from "../api/WeatherApi";
import WeatherBitApi from "../api/WeatherBitApi";
import VisualCrossingApi from "../api/VisualCrossingApi";

function Weather() {

    const [lat, setLat] = useState ("");
    const [lon, setLon] = useState ("");
    const [apiType, setApiType] = useState(WeatherAPIType.WeatherBit);
    const [temperature, setTemperature] = useState("-");
    const [humidity, setHumidity] = useState("-");
    const [airPressure, setAirPressure] = useState("-");
    const [inputError, setInputError] = useState ("");
    const [connectionError, setConnectionError] = useState ("");

    function weatherApi(): WeatherApi {
         return (apiType === WeatherAPIType.WeatherBit) ? new WeatherBitApi() : new VisualCrossingApi();
    }

    const changeSource = () => {
        setApiType((apiType === WeatherAPIType.WeatherBit) ?
            WeatherAPIType.VisualCrossing : WeatherAPIType.WeatherBit)
    }

    function validateInput () : boolean {
        let isAnyError = false;
        if ((!(/^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/.test(lat + ',' + ' ' + lon)))) {
            setInputError('You have to pass right coordinates in the right format, eg. "24.23"');
            isAnyError = true
        } else {
            setInputError("")
        }
        return isAnyError;
    }

    const fetchAndDisplayWeatherData = () => {
        const isAnyError = validateInput();
        if (!isAnyError) {
            weatherApi().getWeatherData(lat, lon)
                .then(weatherData => {
                    setTemperature(weatherData.temperature.toFixed(1).toString());
                    setHumidity(weatherData.humidity.toFixed(1).toString());
                    setAirPressure(weatherData.airPressure.toFixed(1).toString());
                })
                .catch(error => {
                    console.log("There's an error:" + error)
                    setConnectionError("There is a connection error. Try again later")
                })
        }
    };

    return (
            <div className='container'>
                <div className='box'>
                    <div className = 'text'>Weather forecast has been generated from:</div>
                    <div className='text source'>{(apiType == WeatherAPIType.WeatherBit) ? "WeatherBit API" : "VisualCrossing API"}</div>
                    <button onClick={changeSource} className='btn changeSourceBtn'>
                        Change weather source
                    </button>
                </div>
                <div className='box'>
                    <p className='text'>Pass the coordinates:</p>
                    <input type="text" onChange={e => setLat(e.target.value)} className="input lat" placeholder="latitude"/>
                    <input type="text" onChange={e => setLon(e.target.value)} className="input lon" placeholder="longitude"/>
                    <button onClick={fetchAndDisplayWeatherData} className='btn displayBtn'>Send</button>
                </div>
                <div className='box'>
                    <div className='text'>
                        Temperature: <span className="weatherParam temperature">{temperature} C</span>
                    </div>
                    <div className='text'>
                        Humidity: <span className="weatherParam humidity">{humidity} %</span>
                    </div>
                    <div className='text'>
                        Air pressure: <span className="weatherParam airpressure">{airPressure} hPa</span>
                    </div>
                </div>
                <div className='box'>
                    <p className='error inputError'>{inputError}</p>
                    <p className='error connectionError'>{connectionError}</p>
                </div>
            </div>
    )
}

export default Weather;