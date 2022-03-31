import WeatherData from "../data/WeatherData";

interface WeatherApi {
     getWeatherData(lat: string, lon: string) : Promise<WeatherData>
}

export default WeatherApi;