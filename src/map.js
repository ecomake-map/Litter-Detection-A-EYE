import React, { useState, useEffect } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'
import firebase from 'firebase';
import Card from './components/Card';
const Map = () => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        var storageRef = firebase.storage().ref("images");
        // Now we get the references of these images
        storageRef.listAll().then(function (result) {
            result.items.forEach(function (imageRef) {
                displayImage(imageRef);
            });
        }).catch(function (error) {
            // Handle any errors
        });
    }, []);

    function displayImage(imageRef) {
        imageRef.getDownloadURL().then(function (url) {
            let lat = parseFloat(parseFloat(url.split('%2F')[1].split('%2C')[0]).toFixed(6));
            let lng = parseFloat(parseFloat(url.split('%2F')[1].split('%2C')[1].split('?')[0]).toFixed(6));
            setMarkers((prevMarkers) => {
                return [...prevMarkers, { position: { lat: lat, lng: lng }, url: url }];
            });
        }).catch(function (error) {
            // Handle any errors
        });
    }
    const [clickedMarker, setClickedMarker] = useState();
    const closeCard = () => {
        setClickedMarker(null);
    }


    return (
        <GoogleMap
            defaultZoom={14}
            defaultCenter={{ lat: 40.425869, lng: -86.908066 }}
            defaultOptions={{ disableDefaultUI: true }}>
            { markers.length > 0 ?
                markers.map((marker, index) => {
                    return (
                        <Marker
                            key={index}
                            defaultPosition={marker.position}
                            onClick={() => { setClickedMarker(marker) }}
                        ></Marker>
                    );
                })
                : null
            }
            {clickedMarker ? <Card marker={clickedMarker} closeCard={closeCard} /> : null}
        </GoogleMap >
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;