# Flight-Tracker

## What is Flight-Tracker?
Flight-Tracker is a web-application built in React. The purpose is to easily be able to track active airplanes all around the world. 

## Why was Flight-Tracker built?
For personal reasons. I've been having airplanes flying with low altitude over my house while studying computer science over distance. They have been flying so quickly that I havent been able to see what type they are (military, commercial or other). So I wanted to know what type of airplanes they were and what speed + altitude they were flying at. Hence, the idea behind Flight-Tracker was born :)

## How is Flight-Tracker built?
Flight-Tracker is built on React (create-react-app) frontend. It utilizes the [OpenSky REST API](https://opensky-network.org/apidoc/rest.html) to feed in active airplanes which then are positioned on an integrated Google Map. It then grabs the unique ICAO 24-bit address of the transponder and puzzles that together with another API-call that fetches info about the individual airplane.

## Installation
### Downloading and installing the application locally
Download the source-code from here and then run:

`npm install`
to install all necessary dependencies.

### Set up Google Maps
Get an API-Key for Google Maps from Google.
Follow [this documentation](https://developers.google.com/maps/documentation/javascript/get-api-key) to create and get the key.

When you have the key, create a file named **.env** and place it in the root-folder of the application.
In that .env-file add this variable with your key:

`REACT_APP_MAPS=[Replace this block with your API-key and remove the brackets]`

## Local Usage
Start the application by running `npm start`from the "flights"-folder.

When the application have started, wait for a bit for the map and markers to load.

When everything have loaded, you should be located in Sweden by default, simply zoom out and drag yourself around on the map to change location (just as you can do on regular Google Maps).

If you click on an airplane, an infobox should appear that shows the following info about the airplane:

1. Icao24
2. Airplane model
3. Origin country
4. Operator
5. Velocity
6. Vertical speed
7. Altitude

That's it, enjoy Flight-Tracker! :)