import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import HeatmapLayer from '../HeatmapLayer';
import 'leaflet/dist/leaflet.css';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'firstName', headerName: 'First name', width: 110 },
  { field: 'lastName', headerName: 'Last name', width: 110 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 100,
  },

];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
    function Heatmap() {
        const [addressPoints, setAddressPoints] = useState(0);

        useEffect (() => {
          const result = axios(
            'http://localhost:3600/heatmap'
          ).then(response =>{
                let points = [];
                response.data.forEach(element => {
                    points.push([element.latitude, element.longitude, element.priority]);
                });
                setAddressPoints(points);
            }).catch(error =>{
                console.log(error)
            });
       
          
          
        });

        return (
            <div>
                <Map center={[0, 0]} zoom={13} style={{ height: "70vh"}}>
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


                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                </div>
            </div>
        );
    }
 
export default Heatmap; 

// render(<MapExample />, document.getElementById('app'));