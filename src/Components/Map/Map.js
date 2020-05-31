import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import mapStyles from "./../../mapStyles";

function Map() {
  const [selectedAirplane, setSelectedAirplane] = useState(null);
  const [airplanes, setAirplanes] = useState([]);

  useEffect(() => {
    // Update state (markers) every second
    const interval = setInterval(() => {
      fetch('https://opensky-network.org/api/states/all', { method: "GET" })
      .then(res => res.json())
      .then(response => {
        setAirplanes(response["states"]);
      });

    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <GoogleMap 
        defaultZoom={7}
        defaultCenter={{ lat:  57.041401, lng: 12.401050 }}
        defaultOptions={{  styles: mapStyles, streetViewControl: false }}
    >
    { airplanes.map((airplane) => ( 
       <Marker 
          key={airplane[0]}
          position={{ 
            lat: parseFloat(airplane[6]),
            lng: parseFloat(airplane[5]) 
          }}
          onClick={() => {
            // Add airplane info to be used with InfoWindow
            fetch(`https://api.allorigins.win/get?url=https://opensky-network.org/api/metadata/aircraft/list?q=${airplane[0]}`, { method: "GET" })
            .then(response => {
              if (response.ok) return response.json()
              throw new Error('Network response was not ok.')
            })
            .then(data => {
              const json = JSON.parse(data.contents);
              let allData = [];
              allData[0] = airplane;
              if (!Array.isArray(json.content) || !json.content.length)
              {
                allData[1] = [];
                allData[1][0] = {};
                allData[1][0].operator = "Unknown";
                allData[1][0].model = "Unknown";
                allData[1][0].country = "Unknown";
              }
              else 
              {
                allData[1] = json.content;
                if (allData[1][0].operator === "") {
                  allData[1][0].operator = "Unknown";
                }
                if (allData[1][0].model === "") {
                  allData[1][0].model = "Unknown";
                }
              }
              setSelectedAirplane(allData);
            });
          }}
          icon={{ 
            url: './plane.png',
            scaledSize: new window.google.maps.Size(60, 60)
           }}
       />
    ))}

    {selectedAirplane && (
      <InfoWindow
        position={{ 
          lat: parseFloat(selectedAirplane[0][6]),
          lng: parseFloat(selectedAirplane[0][5]) 
         }}
         onCloseClick={() => {
          setSelectedAirplane(null);
         }}
      >
        <div>
          <h5>Airplane Info</h5>
          <p><b>Icao24:</b> {selectedAirplane[0][0]}</p>
          <p><b>Model:</b> {selectedAirplane[1][0].model}</p>
          <p><b>Country:</b> {selectedAirplane[1][0].country}</p>
          <p><b>Operator:</b> {selectedAirplane[1][0].operator}</p>
          <br></br>
          <h5>Tracking</h5>
          <p><b>Velocity:</b> {selectedAirplane[0][9]} m/s</p>
          <p><b>Vertical Speed:</b> {selectedAirplane[0][11]} m/s</p>
          <p><b>Altitude:</b> {selectedAirplane[0][13]} m</p>

          </div>
      </InfoWindow>
    )}
    </GoogleMap>
    </div>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;