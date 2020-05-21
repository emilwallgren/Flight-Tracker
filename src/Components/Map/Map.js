import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

function Map() {
  // Set state (locations of airplanes) to initial request as markers
  const airplanes_location = 0;

  // Set state (locations of airplanes) to initial request as markers
  const [airplanes, setAirplanes] = useState(airplanes_location);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update state (markers) every second
      setAirplanes(airplanes => airplanes + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <GoogleMap 
        defaultZoom={10}
        defaultCenter={{ lat:  57.041401, lng: 12.401050 }}
    />
    <h1>{airplanes}</h1>
    </div>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;