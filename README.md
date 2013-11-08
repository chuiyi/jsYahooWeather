# jsYahooWeather
==============

use YQL to query weather by your device's location
(must allow browser to get location by HTML5 geolocation)

- written by pure javascript code

implement step:
1. use geolocation(HTML5) method to get device's location
2. build a YQL query with jsonp (using geo.placefinder table)
3. next, use the result of placefinder to parse a "woeid" key to query another YQL weather.forecast table
4. now you can get next 5 day's weather at your area
