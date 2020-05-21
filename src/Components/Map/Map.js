import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

function Map() {
  // Set state (locations of airplanes) to initial request as markers
  const [airplanes, setAirplanes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update state (markers) every second
      fetch('https://opensky-network.org/api/states/all', { method: "GET" })
      .then(res => res.json())
      .then(response => {
        setAirplanes(response["states"])
        console.log(response["states"])
      })
      
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <GoogleMap 
        defaultZoom={10}
        defaultCenter={{ lat:  57.041401, lng: 12.401050 }}
    >
    { airplanes.map((airplane) => ( 
       <Marker 
          key={airplane[0]}
          position={{ 
            lat: airplane[6],
            lng: airplane[5] 
          }}
       />
    ))}
    </GoogleMap>
    </div>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;