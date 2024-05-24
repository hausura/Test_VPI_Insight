import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import BoxChat from '../../widgets/boxchat/BoxChat';
import NavigationBar from '../../widgets/navigationbar/NavigationBar';
import ChangeLayer from '../../widgets/changelayer/ChangeLayer';
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { MapController } from '../../widgets/mapController/MapController';
import HomeLoading from '../../widgets/loadingScreen/HomeLoading';
import Greeting from '../../widgets/greeting/Greeting';

mapboxgl.accessToken = import.meta.env.VITE_MapboxToken;

const Home = () => {
    const mapContainerRef = useRef(null);
    const map = useRef(null);

    const [center, setCenter] = useState([106.9230, 16.84769]);
    const [zoom, setZoom] = useState(4.8);
    const [exception, setException] = useState(false);

    // Initialize map when component mounts
    useEffect(() => {
        if (!mapContainerRef.current) return;
        if (!mapContainerRef.current) return;

        try {
            map.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/vpimaps/clidvmlz6000201pggtuua6zq",
                center: center,
                zoom: zoom,
                hash: "map",
                attributionControl: false,
                renderWorldCopies: false,
                projection: "mercator",
                customAttribution: ""
            });
        } catch (err) {
            setException(true);
        }

        MapController(map.current);

        map.current.on("load", () => {
            map.current.resize();
            // ChangeLayer;
            map.current.flyTo({
                center: [106.85508306716277, 16.722048835190567],
                zoom: 4.8, // starting zoom
                bearing: 0,
                speed: 1,
            });
            return () => map.current.remove();
        });

    }, []);

    return (
        <>
            <HomeLoading />
            <NavigationBar />
            <div className='map-container w-screen z-10' ref={mapContainerRef} />
            <Greeting />
            <ChangeLayer map={map} />
            <BoxChat map={map} />
        </>
    );
};

export default Home;