import React from 'react';
import Header from './Components/Header/Header';
import WrappedMap from './Components/Map/Map';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ height: '100vh' }}>
        <WrappedMap 
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_MAPS}`} 
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    </div>
  );
}

export default App;
