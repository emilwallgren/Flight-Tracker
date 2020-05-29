import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
//import * as aircrafts from '../../data/aircrafts.json'; 

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
        <div>Airplane Details</div>
      </InfoWindow>
    )}
    </GoogleMap>
    </div>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;