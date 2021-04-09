import React from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "../../styles/map-styles.css";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    mapContainer: {
        height: "400px",
    }
});

const Map = (props) => {
    const classes = useStyles();

    const coordinates = [props.latitude, props.longitude];
    return (
        <MapContainer
            center={coordinates}
            zoom={12}
            className={classes.mapContainer}
        >
            <TileLayer
                attribution='<a href="http://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coordinates}>
                <Popup>
                    <span>{props.address}</span>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
