import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import HeatmapLayer from '../HeatmapLayer';
import 'leaflet/dist/leaflet.css';
 
    function Heatmap() {
        const [addressPoints, setAddressPoints] = useState(0);
 
        useEffect (() => {
          const result = axios(
            'https://jsonplaceholder.typicode.com/users'
          ).then(response =>{
                console.log(response)
                setAddressPoints(response.data);
                console.log(addressPoints);
            }).catch(error =>{
                console.log(error)
            });
       
          
          
        });

        return (
            <div>
                <Map center={[0, 0]} zoom={13} style={{ height: "100vh" }}>
                    <HeatmapLayer
                        fitBoundsOnLoad
                        fitBoundsOnUpdate
                        points={addressPoints}
                        longitudeExtractor={m => m[1]}
                        latitudeExtractor={m => m[0]}
                        intensityExtractor={m => parseFloat(m[2])} />
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                </Map>
            </div>
        );
    }
 
export default Heatmap; 
// render(<MapExample />, document.getElementById('app'));