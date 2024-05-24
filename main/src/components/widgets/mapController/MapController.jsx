import React from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "./MapController.scss";

export const MapController = (map) => {
    //   if (map === null) {
    //     return null;
    //   }
    // Add full screen function
    styles: [
        // ACTIVE (being drawn)
        // line stroke
        {
            id: "gl-draw-line",
            type: "line",
            filter: ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
            layout: {
                "line-cap": "round",
                "line-join": "round",
            },
            paint: {
                "line-color": "#D20C0C",
                "line-dasharray": [0.2, 2],
                "line-width": 4,
                "line-opacity": 0.7,
            },
        },
        // polygon fill
        {
            id: "gl-draw-polygon-fill",
            type: "fill",
            filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
            paint: {
                "fill-color": "#D20C0C",
                "fill-opacity": 0.1,
            },
        },
        // polygon outline stroke
        // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
        {
            id: "gl-draw-polygon-stroke-active",
            type: "line",
            filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
            layout: {
                "line-cap": "round",
                "line-join": "round",
            },
            paint: {
                "line-color": "#D20C0C",
                "line-dasharray": [0.2, 2],
                "line-width": 4,
                "line-opacity": 0.7,
            },
        },
        // vertex point halos
        {
            id: "gl-draw-polygon-and-line-vertex-halo-active",
            type: "circle",
            filter: [
                "all",
                ["==", "meta", "vertex"],
                ["==", "$type", "Point"],
                ["!=", "mode", "static"],
            ],
            paint: {
                "circle-radius": 12,
                "circle-color": "#FFF",
            },
        },
        // vertex points
        {
            id: "gl-draw-polygon-and-line-vertex-active",
            type: "circle",
            filter: [
                "all",
                ["==", "meta", "vertex"],
                ["==", "$type", "Point"],
                ["!=", "mode", "static"],
            ],
            paint: {
                "circle-radius": 8,
                "circle-color": "black",
            },
        },
        // INACTIVE (static, already drawn)
        // line stroke
        {
            id: "gl-draw-line-static",
            type: "line",
            filter: ["all", ["==", "$type", "LineString"], ["==", "mode", "static"]],
            layout: {
                "line-cap": "round",
                "line-join": "round",
            },
            paint: {
                "line-color": "#000",
                "line-width": 3,
            },
        },
        // polygon fill
        {
            id: "gl-draw-polygon-fill-static",
            type: "fill",
            filter: ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
            paint: {
                "fill-color": "black",
                "fill-opacity": 0.3,
            },
        },
        // polygon outline
        {
            id: "gl-draw-polygon-stroke-static",
            type: "line",
            filter: ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
            layout: {
                "line-cap": "round",
                "line-join": "round",
            },
            paint: {
                "line-color": "#000",
                "line-width": 3,
            },
        },
    ];
    map.addControl(
        new mapboxgl.FullscreenControl({
            container: document.querySelector("body"),
        }),
        "bottom-left"
    );
    // Add device location
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true,
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true,
        }),
        "bottom-left"
    );

    // Add our navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-left");

    // Add draw pragon function
    const Draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
            point: true,
            line_string: true,
            polygon: true,
            trash: true,
        },
        styles: [
            // Style for drawn points
            {
                id: "point",
                type: "circle",
                paint: {
                    "circle-radius": 6,
                    "circle-color": "#ff0000", // Red color
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#ffffff", // White color
                },
                filter: ["in", "$type", "Point"],
            },
            // Style for drawn lines
            {
                id: "line",
                type: "line",
                paint: {
                    "line-color": "#00ff00", // Green color
                    "line-width": 2,
                },
                filter: ["in", "$type", "LineString"],
            },
            // Style for drawn polygons
            {
                id: "polygon",
                type: "fill",
                paint: {
                    "fill-color": "#0000ff", // Blue color
                    "fill-opacity": 0.5,
                },
                filter: ["in", "$type", "Polygon"],
            },
        ],
    });

    map.addControl(Draw, "bottom-left");
    // Add a scale control to the map
    // map.addControl(new mapboxgl.ScaleControl(), "bottom-left");
};