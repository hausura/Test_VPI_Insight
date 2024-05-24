import React, { useEffect, useState } from 'react';
import Styles from './HomeLoading.module.scss';
import ReactCurvedText from 'react-curved-text';

import cloud1 from '../../../assets/Clouds/1.png';
import cloud2 from '../../../assets/Clouds/2.png';
import cloud3 from '../../../assets/Clouds/3.png';
import cloud4 from '../../../assets/Clouds/4.png';
import cloud5 from '../../../assets/Clouds/5.png';
import cloud6 from '../../../assets/Clouds/6.png';
import fullCloud from '../../../assets/Clouds/image.png';

export default function HomeLoading() {

    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [background, setBackground] = useState(true);
    const [ending, setEnding] = useState(false);
    const [show, setShow] = useState(true);

    const simulateLoading = () => {
        let percentage = 0;
        const interval = setInterval(() => {
            percentage += 5;
            if (percentage >= 95) {
                percentage = 100;
                clearInterval(interval);
            }
            setProgress(prev => prev = percentage);
        }, 280);
    };

    const setUpAnimation = async () => {
        simulateLoading();
        setTimeout(() => {
            setLoading(false);
        }, 8000)

        setTimeout(() => {
            setEnding(true);
        }, 4000)

        setTimeout(() => {
            setShow(false);
        }, 7000)
    }

    useEffect(() => {
        setUpAnimation();
    }, [])

    return (
        <>
            {show && (
                <div draggable='false' className={`${Styles.modal_content} absolute z-50 top-0 left-0 w-screen h-screen overflow-hidden ${progress == 100 ? ' bg-transparent' : 'bg-white'}`}>
                    <div className=' w-full h-full flex items-center justify-center relative'>
                        <>
                            {loading && (
                                <>
                                    {background && (
                                        <>
                                            <div className=' absolute z-40'>
                                                <div className={`${Styles.circle} font-barlow`}>
                                                    <div className={`${Styles.percentage}`}>
                                                        {progress}%
                                                    </div>
                                                    <ReactCurvedText width='600'
                                                        height='600'
                                                        cx='300'
                                                        cy='300'
                                                        rx='190'
                                                        ry='190'
                                                        startOffset={0}
                                                        reversed={true}
                                                        text='Đang kết nối VPI Insight...Đang kết nối VPI Insight...Đang kết nối VPI Insight...Đang kết nối VPI Insight...'
                                                        textProps={{ "style": { "fontSize": "26.5" } }}
                                                        textPathProps={{ "fill": "#ffffff" }}
                                                        tspanProps={null}
                                                        ellipseProps={null}
                                                        svgProps={{ "className": "rotating-curved-text" }} />
                                                </div>
                                            </div>
                                            <div className=' w-full h-full z-30'>
                                                {/* <img alt='cloud' src={fullCloud} className='w-full h-full object-cover' /> */}
                                                <img src={cloud1} className={`w-[1600px] transition-all ease-linear duration-1000 object-cover absolute top-[0px] -left-[800px] z-50 max-2xl:top-[50px] max-2xl:-left-[600px] ${progress == 100 && ' delay-500 -translate-x-full'}`} />
                                                <img src={cloud2} className={`w-[1600px] transition-all ease-linear duration-1000 object-cover absolute -top-[100px] right-0 z-40 ${progress == 100 && ' delay-500 translate-x-full'}`} />
                                                <img src={cloud3} className={`w-[2000px] transition-all ease-linear duration-1000 object-cover  absolute -top-[300px] -right-[500px] z-30 max-2xl:-top-[200px] ${progress == 100 && ' delay-500 translate-x-full'}`} />
                                                <img src={cloud4} className={`w-[2000px] transition-all ease-linear duration-1000 object-cover  absolute -bottom-[300px] -left-[500px] z-20 max-2xl: ${progress == 100 && ' delay-500 -translate-x-full'}`} />
                                                <img src={cloud5} className={`w-[2000px] transition-all ease-linear duration-1000 object-cover absolute -bottom-[400px] -right-[600px] z-10 max-2xl:-bottom-[200px] max-2xl:-right-[400px]  max-2xl:w-[2000px] ${progress == 100 && ' delay-500 translate-x-full'}`} />
                                                <img src={cloud6} className={`w-[2000px] transition-all ease-linear duration-1000 object-cover  absolute  -top-[300px] -left-[600px]  z-0 max-2xl: ${progress == 100 && ' delay-500 -translate-x-full'}`} />
                                            </div>
                                        </>
                                    )}
                                    {/* {(progress == 100 && !ending) && (
                                        <div className={`${Styles.end_loading} absolute rounded-full w-10 h-10 z-50`}></div>
                                    )} */}
                                </>
                            )}
                        </>
                        {/* {ending && (
                            <div className={` border-white border-[4000px] rounded-full absolute z-50`}>
                                <div className={`${Styles.ending} w-10 h-10 rounded-full`}></div>
                            </div>
                        )} */}
                    </div>
                </div>
            )}
        </>
    )
}
