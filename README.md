# Weather-App

<picture>
<img src="weather_dashboard1.png">
</picture>

## Description
This application displays current weather for the city searched using the search text box input and clicking search button.
Application uses open weather API. 
Server APIs allows to access their data and functionality by making requests with specific parameters to a URL. .
Searched city is stored using `localStorage` to store any persistent data.

## Installation

N/A

## Usage

To use this web page, navigate to the above site using chrome browser.


Check code repo in path below
https://github.com/DeepaSU1/Weather-App/blob/main/index.html 
https://github.com/DeepaSU1/Weather-App/blob/main/js/script.js

 


### User Story

```text
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

* Create a weather dashboard with form inputs.
  * When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
  * When a user views the current weather conditions for that city they are presented with:
    * The city name
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
    * The wind speed
  * When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
  * When a user click on a city in the search history they are again presented with current and future conditions for that city
