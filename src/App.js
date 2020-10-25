import './App.css';
import Map from './map';
import Nav from './components/nav/Nav';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {


    return (
        <Nav>
            <div style={{ width: "100vw", height: "100vh" }}>
                <Map
                    googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDej4tfnSFsNHhxVn2IDsxJZ104B1zReSU"}
                    loadingElement={<div style={{ height: "100%" }}></div>}
                    containerElement={<div style={{ height: "100%" }}></div>}
                    mapElement={<div style={{ height: "100%" }}></div>} />
            </div>
        </Nav>
    );
}

export default App;
