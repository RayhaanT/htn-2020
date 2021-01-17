import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import HeatmapLayer from '../HeatmapLayer';
import { addressPoints } from './realworld.10000.js';
import 'leaflet/dist/leaflet.css';
 
    function Heatmap() {
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