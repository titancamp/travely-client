import { useEffect, useRef, useState } from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

import {
  useMap,
  Marker,
  Tooltip,
  TileLayer,
  useMapEvent,
  MapContainer,
} from 'react-leaflet';

function SetViewOnClick({ animateRef }) {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
    });
  });

  return null;
}

export default function Map() {
  const [location, setLocation] = useState([40.1872, 44.5152]);
  const animateRef = useRef(true);
  const popupRef = useRef();

  function makerPositioningHandler(map) {
    map.on('click', ({ latlng: { lat, lng } }) => {
      setLocation([lat, lng]);
      map.locate();
    });
    console.log(map);
  }

  function LeafletgeoSearch() {
    const map = useMap();
    useEffect(() => {
      const searchControl = new GeoSearchControl({
        style: 'bar',
        marker: Marker,
        updateMap: true,
        autoClose: true,
        showPopup: true,
        keepResult: true,
        maxSuggestions: 5,
        showMarker: false,
        popupFormat: ({ result: { x, y } }) => {
          setLocation([x, y]);
          // map.locate();
        },
        autocomplete: true,
        provider: new OpenStreetMapProvider(),
      });
      map.addControl(searchControl);

      return () => map.removeControl(searchControl);
    }, []);

    return null;
  }

  return (
    <>
      <MapContainer
        zoom={15}
        center={location}
        style={{ width: 600, height: 600 }}
        whenCreated={makerPositioningHandler}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <Marker position={location}>
          <Tooltip
            direction='top'
            offset={[-15, -10]}
            opacity={1}
            permanent
            ref={popupRef}
          >
            permanent Tooltip for Rectangle
          </Tooltip>
        </Marker>
        <SetViewOnClick animateRef={animateRef} />
        <LeafletgeoSearch />
      </MapContainer>
    </>
  );
}
