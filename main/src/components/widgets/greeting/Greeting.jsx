import React, { useEffect, useState } from 'react';
import MovingComponent from 'react-moving-text'

export default function Greeting() {

    const [show, setShow] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 10000);
    }, []);

    return (
        <>
            {(show) && (
                <div className=' absolute z-20 right-[20px] top-1/3 text-[40px] max-xl:text-[35px] max-lg:text-[30px]' style={{ fontWeight: "500" }}>
                    <MovingComponent
                        type="slideOutToRight"
                        duration="5000ms"
                        delay="8s"
                        direction="normal"
                        timing="ease"
                        iteration="1"
                        fillMode="none"
                        className=" flex flex-col items-end"
                    >
                        <h1>Hãy khám phá VPI Insight</h1>
                        <h1>cùng Trợ lý ảo</h1>
                    </MovingComponent>
                </div>
            )}
        </>
    )
}
