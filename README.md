## Weather Api

The purpose of the app is to show weather forecast for a given coordinates from two different API's. 
After providing the LAT and LON coordinates by the user, the app displays specified weather data. The app has a switch, which can be used to change the data source from one API to another (the source is displayed on the screen). The user interface remains the same (also the weather data types) , no matter which API is currently being displayed. 
In order to avoid possible problems emerging from using two different API's (with different structure), I decided to implement the Adapter design pattern, which enbaled smooth switching between the data sources.


### Created with:

- React.js
- TypeScript
- SASS
- Cypress integration tests


#### Future improvements
styling and UI design
