import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
//import * as aircraftinfo from '../../data/aircrafts.json'; 
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
        console.log(response["states"])
      });

    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <GoogleMap 
        defaultZoom={7}
        defaultCenter={{ lat:  57.041401, lng: 12.401050 }}
        defaultOptions={{  styles: mapStyles }}
    >
    { airplanes.map((airplane) => ( 
       <Marker 
          key={airplane[0]}
          position={{ 
            lat: parseFloat(airplane[6]),
            lng: parseFloat(airplane[5]) 
          }}
          onClick={() => {
            setSelectedAirplane(airplane);
          }}
          icon={{ 
            url: './plane.png',
            scaledSize: new window.google.maps.Size(25, 25),
            // The rotation below does not work
            rotation: 30
           }}
       />
    ))}

    {selectedAirplane && (
      <InfoWindow
        position={{ 
          lat: parseFloat(selectedAirplane[6]),
          lng: parseFloat(selectedAirplane[5]) 
         }}
         onCloseClick={() => {
          setSelectedAirplane(null);
         }}
      >
        <div>
          <h2>Airplane Data</h2>
          <p><b>Icao24:</b> {selectedAirplane[0]}</p>
          <p><b>Track:</b> {parseFloat(selectedAirplane[10])}</p>
          <p><b>On Ground:</b> {selectedAirplane[8]}</p>
          <p><b>Velocity:</b> {selectedAirplane[9]} m/s</p>
          <p><b>Vertical Speed:</b> {selectedAirplane[11]} m/s</p>
          <p><b>Altitude:</b> {selectedAirplane[13]}</p>

          </div>
      </InfoWindow>
    )}
    </GoogleMap>
    </div>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;