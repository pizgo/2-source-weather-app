describe("WeatherForecast", () => {
  it ("correctly shows no temperature, humidity and airpressure, when no coordinates provided", () => {
    //given
    websiteIsOpened()

    //when
    provideNoCoordinates()
    clickedSendBtn()

    //then
    displaysInTemperature("-")
    displaysInHumidity("-")
    displaysInAirPressure("-")

  })

  it ("correctly shows no temperature, humidity and airpressure, when only lat is provided", () => {
    //given
    websiteIsOpened();

    //when
    provideOnlyLat("52.0");
    clickedSendBtn();

    //then
    displaysInTemperature("-");
    displaysInHumidity("-");
    displaysInAirPressure("-");
  })

  it ("correctly shows no temperature, humidity and airpressure, when only lon is provided", () => {
    //given
    websiteIsOpened();

    //when
    provideOnlyLon("52.0");
    clickedSendBtn();

    //then
    displaysInTemperature("-");
    displaysInHumidity("-");
    displaysInAirPressure("-");
  })

  it ("correctly shows temperature, humidity and airpressure from default API, when both coordinators are provided", () => {
    //given
    websiteIsOpened()

    //when
    provideBothCoordinates("52.0", "52.0")
    clickedSendBtn()

    //then
    weatherDataIsNotEmpty()

  })

  it ("after clicking on changeSourceBtn, user is informed about the change", () => {
    //given
    websiteIsOpened()

    //when
    clickedChangeSourceBtn()

    //then
    displayChangedSource('VisualCrossing API')

  })

  it ("the app correctly displays weather forecast from different API's after clicking on changeSourceBtn and displayBtn", () => {
    //given
    websiteIsOpened()

    //when
    provideBothCoordinates("52.0", "52.0")
    clickedSendBtn()
    let tempValue = getValueFromField('.temperature')
    let humidityValue = getValueFromField('.humidity')
    let airValue = getValueFromField('.airpressure')
    clickedChangeSourceBtn()
    clickedSendBtn()

    //then
    displayDataFromDifferentApi(tempValue, humidityValue, airValue)

  })

  it ("inform of an error when empty input is passed", () => {
    //given
    websiteIsOpened()

    //when
    provideNoCoordinates()
    clickedSendBtn()

    //then
    displayInputError('You have to pass right coordinates')
  })

  it ("inform of an error when wrong input is passed", () => {
    //given
    websiteIsOpened()

    //when
    provideWrongLat('abc')
    provideWrongLon('abc')
    clickedSendBtn()

    //then
    displayInputError('You have to pass right coordinates')
  })
});


function websiteIsOpened() {
  cy.visit("http://localhost:3000");
}

function clickedSendBtn() {
  cy.contains("Send").click();
}

function provideNoCoordinates() {
  cy.get('.lat').clear()
  cy.get('.lon').clear()
}

function provideOnlyLat (lat : string) {
  cy.get('.lat').type(lat);
  cy.get('.lon').clear();
}

function provideOnlyLon (lon : string) {
  cy.get('.lat').clear();
  cy.get('.lon').type(lon);
}

function provideBothCoordinates (lat: string, lon: string) {
  cy.get('.lat').type(lat);
  cy.get('.lon').type(lon);
}

function displaysInTemperature(result : string){
  cy.get(".temperature").contains(result)
}

function displaysInHumidity(result : string){
  cy.get(".humidity").contains(result)
}

function displaysInAirPressure(result : string){
  cy.get(".airpressure").contains(result)
}

function weatherDataIsNotEmpty() {
  cy.get('.temperature').should('not.to.be.empty')
  cy.get('.temperature').should('not.to.equal', "-")
  cy.get('.humidity').should('not.to.be.empty')
  cy.get('.humidity').should('not.to.equal', "-")
  cy.get('.airpressure').should('not.to.be.empty')
  cy.get('.airpressure').should('not.to.equal', "-")
}

function clickedChangeSourceBtn() {
  cy.contains('Change weather source').click();
}

function displayChangedSource(sourceName: string) {
  cy.get('.source').contains(sourceName)
}

function getValueFromField(className: string) {
  return cy.get(className)
}

function displayDataFromDifferentApi(oldTempValue: Cypress.Chainable<JQuery<HTMLElement>>, oldHumidityValue: Cypress.Chainable<JQuery<HTMLElement>>, oldAirValue: Cypress.Chainable<JQuery<HTMLElement>>) {
  expect( (cy.get('.temperature').should('not.to.equal', oldTempValue)) ||
                 (cy.get('.humidity').should('not.to.equal', oldHumidityValue)) ||
                 (cy.get('.airpressure').should('not.to.equal', oldAirValue)))
}

function provideWrongLat(wrongInput: string) {
  cy.get('.lat').type(wrongInput)
}

function provideWrongLon(wrongInput: string) {
  cy.get('.lon').type(wrongInput)
}

function displayInputError(error: string) {
  cy.get('.inputError').contains(error)
}
