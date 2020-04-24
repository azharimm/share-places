import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
mapboxgl.accessToken = 'pk.eyJ1IjoiYXpoYXJpbW0iLCJhIjoiY2p5Y2szMXN1MGpmNDNtcW9xNHE1ZHBsMCJ9.qQiAg9L-EApvjVz2UiQCMQ'

const Map = (props) => {
    const {center, zoom} = props

    const mapRef = useRef();
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [center.lng, center.lat],
            zoom: zoom
        });
        // eslint-disable-next-line
        const marker = new mapboxgl.Marker()  
        .setLngLat([center.lng, center.lat])
        .addTo(map);
    }, [center, zoom]);


    return (
        <div
            ref={mapRef}
            className={`map ${props.className}`}
            style={props.style}
        >
            Map Component
        </div>
    );
};

export default Map;
