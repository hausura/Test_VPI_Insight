import React, { useEffect, useState } from "react";
import * as turf from "@turf/turf";

const DistanceTool = ({ map, distanceContainer }) => {
    if (!map) return null;

    const [mouseActive, setMouseActive] = useState(false);

    useEffect(() => {
        if (!map.current) return;

        console.log("check tooltip mouse active>> ", mouseActive);
        const geojson = {
            type: "FeatureCollection",
            features: [],
        };

        const linestring = {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [],
            },
        };

        const handleClick = (e) => {
            const features = map.current.queryRenderedFeatures(e.point, {
                layers: ["measure-points"],
            });

            if (geojson.features.length > 1) geojson.features.pop();

            distanceContainer.current.innerHTML = "";

            if (features.length) {
                const id = features[0].properties.id;
                geojson.features = geojson.features.filter(
                    (point) => point.properties.id !== id
                );
            } else {
                const point = {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [e.lngLat.lng, e.lngLat.lat],
                    },
                    properties: {
                        id: String(new Date().getTime()),
                    },
                };

                geojson.features.push(point);
            }

            if (geojson.features.length > 1) {
                linestring.geometry.coordinates = geojson.features.map(
                    (point) => point.geometry.coordinates
                );

                geojson.features.push(linestring);

                const value = document.createElement("pre");
                const distance = turf.length(linestring);
                value.textContent = `Total distance: ${distance.toLocaleString()} km`;
                distanceContainer.current.appendChild(value);
            }

            map.current.getSource("geojson").setData(geojson);
        };

        const handleMouseMove = (e) => {
            const features = map.current.queryRenderedFeatures(e.point, {
                layers: ["measure-points"],
            });
            map.current.getCanvas().style.cursor = features.length
                ? "pointer"
                : "crosshair";
        };

        if (mouseActive) {
            if (!map.current.getSource("geojson")) {
                map.current.addSource("geojson", {
                    type: "geojson",
                    data: geojson,
                });
            }

            if (!map.current.getLayer("measure-points")) {
                map.current.addLayer({
                    id: "measure-points",
                    type: "circle",
                    source: "geojson",
                    paint: {
                        "circle-radius": 5,
                        "circle-color": "#000",
                    },
                    filter: ["in", "$type", "Point"],
                });
            }

            if (!map.current.getLayer("measure-lines")) {
                map.current.addLayer({
                    id: "measure-lines",
                    type: "line",
                    source: "geojson",
                    layout: {
                        "line-cap": "round",
                        "line-join": "round",
                    },
                    paint: {
                        "line-color": "#000",
                        "line-width": 2.5,
                    },
                    filter: ["in", "$type", "LineString"],
                });
            }

            map.current.on("click", handleClick);
            map.current.on("mousemove", handleMouseMove);
        } else {
            distanceContainer.current.innerHTML = "";
            map.current.getCanvas().style.cursor = "";
            geojson.features = [];
            if (map.current.getSource("geojson")) {
                map.current.getSource("geojson").setData(geojson);
            }
            if (map.current.getLayer("measure-points")) {
                map.current.removeLayer("measure-points");
            }
            if (map.current.getLayer("measure-lines")) {
                map.current.removeLayer("measure-lines");
            }
            if (map.current.getSource("geojson")) {
                map.current.removeSource("geojson");
            }
            map.current.off("click", handleClick);
            map.current.off("mousemove", handleMouseMove);
        }

        return () => {
            if (map.current) {
                map.current.off("click", handleClick);
                map.current.off("mousemove", handleMouseMove);
            }
        };
    }, [map, mouseActive]);
    const handleActiveDistance = () => {
        setMouseActive(!mouseActive); // Toggle mousemove activation status
    };
    return (
        <>
            <div className="bg-white rounded-md p-3 flex-grow-0 h-[85px] w-[75px]">
                <div
                    className="w-[50px] h-[50px] flex-shrink-0 block bg-yellow-300 rounded-md"
                    onClick={handleActiveDistance}
                    style={{
                        border: `1px solid ${mouseActive ? "blue" : "white"}`,
                    }}
                ></div>
                <p>Distance</p>
            </div>
        </>
    );
};
export default DistanceTool;