import React, { useRef, useEffect, useState } from "react";
import MonoIcon from "../../../assets/MapVersion/Mono.png";
import OutdoorsIcon from "../../../assets/MapVersion/Outdoors.png";
import StreetsIcon from "../../../assets/MapVersion/Streets.png";
import SatelliteIcon from "../../../assets/MapVersion/Satellite.png";
import MoreIcon from "../../../assets/images/more.png";
import MapToolTip from "../mapToolTip/MapToolTip";

// Define available layers
const layers = {
    satellite: "mapbox://styles/mapbox/satellite-v9",
    streets: "mapbox://styles/mapbox/streets-v11",
    terrain: "mapbox://styles/mapbox/outdoors-v11",
    traffic: "mapbox://styles/mapbox/traffic-night-v2",
    transit: "mapbox://styles/mapbox/navigation-preview-day-v4",
    // list VPI map background
    StreetsMap: "mapbox://styles/vpimaps/clid7yxpl002501qv09p4g48q",
    OutdoorsMap: "mapbox://styles/vpimaps/clidvmlz6000201pggtuua6zq",
    MonoMap: "mapbox://styles/vpimaps/clicpykux000n01r0gpia4pxh",
};

const ChangeLayer = ({ map }) => {
    const [popupVisibility, setPopupVisibility] = useState(false);
    const [timeoutId, setTimeoutId] = useState(0);
    const [currentBg, setCurrentBg] = useState(OutdoorsIcon);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const distanceContainer = useRef(null);

    useEffect(() => {
        console.log(">> check current back: ", currentBg);
    }, [currentBg]);
    const changeMapLayer = (layer) => {
        if (!map) return;

        map.current.setStyle(layers[layer]);
        setPopupVisibility(false);
    };
    const handleMouseEnter = () => {
        setPopupVisibility(true);
        clearTimeout(timeoutId);
    };
    const handleMouseLeave = () => {
        setTimeoutId(
            setTimeout(() => {
                setPopupVisibility(false);
            }, 2000)
        ); // Adjust the timeout duration as needed (2 seconds = 2000 milliseconds)
    };

    const handleMoreIconClick = () => {
        setTooltipVisible(!tooltipVisible);
    };

    return (
        <div className="pl-[70px] max-md:pl-12">
            <div
                className=" w-[85px] h-[85px] rounded-md absolute bottom-[30px] bg-white cursor-pointer z-10"
                style={{
                    backgroundImage: `url(${currentBg})`,
                    backgroundSize:
                        "contain" /* Ensures the image fits within the button */,
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    // style={{ display: mouseActive ? "block" : "none" }}
                    ref={distanceContainer}
                    id="distance"
                    className={`absolute z-10 bottom-[300px] `}
                />
                <div
                    className="relative bottom-0"
                    style={{ display: popupVisibility ? "block" : "none" }}
                >
                    {tooltipVisible && (
                        <div className="absolute z-50 rounded-md bottom-[90px] left-[90px] bg-white">
                            {/* Content of the tooltip */}
                            <p>MapTooltips</p>
                            <MapToolTip map={map} distanceContainer={distanceContainer} />
                        </div>
                    )}
                    <div
                        className="bg-white rounded-md h-[85px]"
                        style={{
                            backgroundImage: `url(${currentBg})`,
                            backgroundSize:
                                "contain" /* Ensures the image fits within the button */,
                        }}
                    >
                        <div className=" rounded-md left-[90px] shadow-md flex justify-between ">
                            <div className="text-sm font-medium w-[90px] flex-shrink-0 rounded-md left "></div>
                            <div
                                className="bg-white flex rounded-md" /*show list backGround*/
                            >
                                <div className="bg-white rounded-md p-3 flex-grow-0 h-[85px] w-[75px]">
                                    <div
                                        className="w-[50px] h-[50px] flex-shrink-0 block bg-yellow-300 rounded-md"
                                        style={{
                                            backgroundImage: `url(${StreetsIcon})` /* Set Streets Background*/,
                                            backgroundSize:
                                                "contain" /* Ensures the image fits within the button */,
                                        }}
                                        onClick={() => {
                                            changeMapLayer("StreetsMap");
                                            setCurrentBg(StreetsIcon);
                                        }}
                                    ></div>
                                    <p>Streets</p>
                                </div>
                                <div className="bg-white rounded-md p-3 flex-grow-0 h-[85px] w-[75px]">
                                    <div
                                        className="w-[50px] h-[50px] flex-shrink-0 block bg-yellow-300 rounded-md"
                                        style={{
                                            backgroundImage: `url(${OutdoorsIcon})` /* Set Outdoors Background*/,
                                            backgroundSize:
                                                "contain" /* Ensures the image fits within the button */,
                                        }}
                                        onClick={() => {
                                            changeMapLayer("OutdoorsMap");
                                            setCurrentBg(OutdoorsIcon);
                                        }}
                                    ></div>
                                    <p>Outdoor</p>
                                </div>
                                <div className="bg-white rounded-md p-3 flex-grow-0 h-[85px] w-[75px]">
                                    <div
                                        className="w-[50px] h-[50px] flex-shrink-0 block bg-yellow-300 rounded-md"
                                        style={{
                                            backgroundImage: `url(${MonoIcon})` /* Set Mono Background*/,
                                            backgroundSize:
                                                "contain" /* Ensures the image fits within the button */,
                                        }}
                                        onClick={() => {
                                            changeMapLayer("MonoMap");
                                            setCurrentBg(MonoIcon);
                                        }}
                                    ></div>
                                    <p>Mono</p>
                                </div>
                                <div className="bg-white rounded-md p-3 flex-grow-0 h-[85px] w-[75px]">
                                    <div
                                        className="w-[50px] h-[50px] flex-shrink-0 block bg-gray-200 rounded-md"
                                        onClick={handleMoreIconClick}
                                    >
                                        {" "}
                                        <img
                                            src={MoreIcon}
                                            alt="More"
                                            className="w-full h-full cursor-pointer mx-auto my-auto top-6 p-2"
                                            onClick={handleMoreIconClick}
                                        />
                                    </div>
                                    <p>More</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeLayer;