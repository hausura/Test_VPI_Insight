import React from "react";

const AddLayer = ({ map }) => {
    const toggleLayer = (layerId, addLayerFn) => {
        if (map.current.getLayer(layerId)) {
            map.current.removeLayer(layerId);
            map.current.removeSource(layerId);
        } else {
            addLayerFn();
        }
    };

    const addLayerRoad = () => {
        map.current.addLayer({
            id: "traffic",
            type: "line",
            source: {
                type: "vector",
                url: "mapbox://mapbox.mapbox-traffic-v1",
            },
            "source-layer": "traffic",
            paint: {
                "line-color": [
                    "case",
                    ["==", ["get", "congestion"], "low"],
                    "#0F9D58",
                    ["==", ["get", "congestion"], "moderate"],
                    "#FBBB05",
                    ["==", ["get", "congestion"], "heavy"],
                    "orange",
                    ["==", ["get", "congestion"], "severe"],
                    "red",
                    "gray",
                ],
                "line-opacity": 0.8,
                "line-width": 5,
            },
        });
    };

    const addLayerTransit = () => {
        map.current.addLayer({
            id: "transit",
            type: "symbol",
            source: {
                type: "vector",
                url: "mapbox://mapbox.mapbox-streets-v8",
            },
            "source-layer": "transit_stop_label",
            layout: {
                "icon-image": "bus-15",
                "icon-size": 1.5,
                "icon-allow-overlap": true,
                "text-field": ["get", "name"],
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 0.6],
                "text-anchor": "top",
            },
            paint: {
                "text-color": "#ff0000",
                "text-halo-color": "#ffffff",
                "text-halo-width": 2,
            },
        });
    };

    return (
        <div className="bg-white flex rounded-md">
            <div className="bg-white rounded-md p-3 flex-grow-0 h-[85px]">
                <div
                    className="w-[50px] h-[50px] flex-shrink-0 block bg-blue-500 rounded-md"
                    onClick={() => toggleLayer("traffic", addLayerRoad)}
                ></div>
                <p>Road</p>
            </div>
            <div className="bg-white rounded-md p-3 flex-grow-0 h-[85px]">
                <div
                    className="w-[50px] h-[50px] flex-shrink-0 block bg-blue-500 rounded-md"
                    onClick={() => toggleLayer("transit", addLayerTransit)}
                ></div>
                <p>Transit</p>
            </div>
        </div>
    );
};

export default AddLayer;