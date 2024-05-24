import React, { useRef, useEffect, useState } from "react";
import "./MapToolTip.scss";
import AddLayer from "./AddLayer";
import DistanceTool from "./DistanceTool";

const MapToolTip = ({ map, distanceContainer }) => {
    return (
        <div>
            <div className=" rounded-md left-[90px] shadow-md flex justify-between z-50">
                <AddLayer map={map} />
                <DistanceTool map={map} distanceContainer={distanceContainer} />
                <DistanceTool map={map} distanceContainer={distanceContainer} />
            </div>
        </div>
    );
};

export default MapToolTip;