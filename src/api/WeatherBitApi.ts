import WeatherApi from "./WeatherApi";
import WeatherData from "../data/WeatherData";

class WeatherBitApi implements WeatherApi {

    private readonly APIKeyWeatherBit = process.env.REACT_APP_API_KEY_WEATHERBIT
    private readonly APIWeather = 'http://api.weatherbit.io/v2.0/current'

     async getWeatherData(lat: string, lon: string) : Promise<WeatherData> {
        return fetch(`${this.APIWeather}?lat=${lat}&lon=${lon}&key=${this.APIKeyWeatherBit}&include=minutely`)
            .then(response => response.json())
            .then(responseBody => {
                const temperature = responseBody.data[0].app_temp;
                const humidity = responseBody.data[0].rh;
                const airPressure = responseBody.data[0].pres;
                return new WeatherData(temperature, humidity, airPressure)
            })
    }
}

export default WeatherBitApi;