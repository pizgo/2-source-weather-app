class WeatherData {
    temperature: number;
    humidity: number;
    airPressure: number;

    constructor(temp: number, humidity: number, air: number) {
        this.temperature = temp;
        this.humidity = humidity;
        this.airPressure = air;
    }
}

export default WeatherData;