import React from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import '../common/map-styles.css';

const Map = (props) => {
    const coordinates = [props.latitude, props.longitude];
    return (
        <MapContainer center={coordinates} zoom={12} style={{height: '350px'}}>
            <TileLayer
                attribution="<a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a>"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coordinates}>
                <Popup>
                    <span>
                        {props.address}
                    </span>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;