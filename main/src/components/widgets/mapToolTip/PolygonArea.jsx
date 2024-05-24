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

        const handleClick = (e) => {
            map.current.addControl(draw);

            map.current.on("draw.create", updateArea);
            map.current.on("draw.delete", updateArea);
            map.current.on("draw.update", updateArea);

            const updateArea = (e) => {
                const data = draw.getAll();
                const answer = document.getElementById("calculated-area");
                if (data.features.length > 0) {
                    const area = turf.area(data);
                    // Restrict the area to 2 decimal points.
                    const rounded_area = Math.round(area * 100) / 100;
                    answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
                } else {
                    answer.innerHTML = "";
                    if (e.type !== "draw.delete")
                        alert("Click the map to draw a polygon.");
                }
            };

            if (mouseActive) {
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
        };
    });

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