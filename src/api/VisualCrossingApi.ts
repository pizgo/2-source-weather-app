import WeatherApi from "./WeatherApi";
import WeatherData from "../data/WeatherData";

class VisualCrossingApi implements WeatherApi {

    private readonly APIVisualCrossing = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    private readonly APIKeyVisualCrossing = process.env.REACT_APP_API_KEY_VICUALCROSSING

    async getWeatherData(lat: string, lon: string) : Promise<WeatherData> {

        return fetch(`${this.APIVisualCrossing}${lat}%2C%20${lon}/today?unitGroup=metric&key=${this.APIKeyVisualCrossing}&contentType=json`,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                return response.json();
            })
            .then(responseBody => {
                const temperature = responseBody.days[0].temp;
                const humidity = responseBody.days[0].humidity;
                const airPressure = responseBody.days[0].pressure;
                return new WeatherData(temperature, humidity, airPressure)
            })
    }
}
export default VisualCrossingApi;