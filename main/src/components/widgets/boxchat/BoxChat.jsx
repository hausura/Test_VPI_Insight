import React, { useEffect, useRef, useState } from 'react';
import Styles from './BoxChat.module.scss';
import mapboxgl from 'mapbox-gl';

import logo from '../../../assets/images/box_chat_image.png';
import fullsize_btn from '../../../assets/images/full-size.png';
import reject_btn from '../../../assets/images/reject.png';
import send_btn from '../../../assets/images/send_color.png';
import smallbox_btn from '../../../assets/images/screen.png';
import Message from '../message/Message';

export default function BoxChat({ map }) {

    const ref = useRef();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [markers, setMarkers] = useState([]);
    const [popups, setPopups] = useState([]);
    const [excuting, setExcuting] = useState(false);
    const [isFullBox, setIsFullBox] = useState(false);

    // Voice
    const synth = window.speechSynthesis;

    const handleInput = (e) => {

        setMessage(e.target.value);
    }

    function voiceControl(string) {
        let u = new SpeechSynthesisUtterance(string);
        u.text = string;
        u.lang = "en-aus";
        u.volume = 1;
        u.rate = 1;
        u.pitch = 1;
        synth.speak(u);
    }

    //Search address
    function geocodeAddress(address) {
        var geocoderUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
            '.json?access_token=' + "pk.eyJ1IjoiaGF1c3VyYSIsImEiOiJjbHZ1cmNvZW8xbzZ2MmptZzc1aWhmOHcwIn0.cdeEUNXMyKRO73ILEEuUsQ";

        fetch(geocoderUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var result = data.features[0];
                var coordinates = result.center;

                // Di chuyển bản đồ đến tọa độ
                map.current.flyTo({
                    center: coordinates,
                    zoom: 12
                });

                // Tạo marker
                var marker = new mapboxgl.Marker()
                    .setLngLat(coordinates)
                    .addTo(map.current);

                const markerHeight = 50;
                const markerRadius = 10;
                const linearOffset = 25;
                const popupOffsets = {
                    'top': [0, 0],
                    'top-left': [0, 0],
                    'top-right': [0, 0],
                    'bottom': [0, -markerHeight],
                    'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                    'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                    'left': [markerRadius, (markerHeight - markerRadius) * -1],
                    'right': [-markerRadius, (markerHeight - markerRadius) * -1]
                };
                const popup = new mapboxgl.Popup({ offset: popupOffsets, className: 'my-class' })
                    .setLngLat(coordinates)
                    .setHTML(`
                        <h1 className="text-lg">${result.place_name}</h1>
                    `)
                    .setMaxWidth("300px")
                    .addTo(map.current);
                setPopups(prev => prev = [...prev, popup]);

                // Thiết lập popup cho marker
                marker.setPopup(popup);

                // Mở popup khi marker được nhấp
                marker.getElement().addEventListener('click', function () {
                    marker.togglePopup();
                });

                // markers.push(marker);
                setMarkers(prev => prev = [...prev, marker]);
                if (localStorage.getItem("voice") && localStorage.getItem("voice") == "true") {
                    voiceControl(result.place_name);
                }

                var divItem = document.createElement('div');
                divItem.className = 'w-full';
                divItem.innerHTML = `
                    <div class='w-full'>
                        <div class=" flex items-end space-x-2 justify-start w-full mb-2">
                            <h1 class=" p-3 rounded-2xl text-[#23689B] bg-[#D9EFFF] text-[14.5px] break-words"
                                style="max-width: 70%">${result.place_name}</h1>
                        </div>
                    </div>
                `;
                document.getElementById('list_message').appendChild(divItem);
                var messageContainer = document.getElementById('list_message');
                messageContainer.scrollTop = messageContainer.scrollHeight;
            })
            .catch(function (error) {
                console.log('Error:', error);
            });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (excuting == false) {
            if (message.trim() != "") {
                setExcuting(true);
                var divItem = document.createElement('div');
                divItem.className = 'w-full';
                divItem.innerHTML = `
                <div class="w-full">
                    <div class="flex flex-col items-end w-full mb-2 space-x-2">
                        <h1 class="p-3 rounded-3xl text-white bg-[#23689B] text-[14.5px] break-words" style={{ maxWidth: "60%" }}>${message.trim()}</h1>
                    </div>
                </div>
              `;
                document.getElementById('list_message').appendChild(divItem);
                geocodeAddress(message);
                ref.current.focus();
                setMessage("");
                setExcuting(false);
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setOpen(true)
        }, 10000);
    }, []);

    if (!map) return null;

    return (
        <>
            <div className={`${open ? 'z-40' : ' duration-500 z-0'} fixed flex items-center justify-end space-x-2 ${(isFullBox && open == true) ? 'w-[88%] h-screen py-[30px] bottom-0 right-[20px] max-md:py-0 max-md:right-0' : 'bottom-5 right-[20px]'} max-md:right-1 max-md:w-full `}>
                <div
                    id="box-chat"
                    className={`${Styles.box} ${!open ? Styles.hide : Styles.open} ${(isFullBox && open == true) ? `${Styles.fullbox} w-full h-full max-sm:w-full max-sm:h-full bg-[#f5f5f5]` : 'w-[420px] h-[600px] bg-[#FFFFFF]'} bottom-0 right-0 rounded-3xl p-3 relative`}
                >
                    <div className={`${isFullBox ? 'flex items-start justify-between w-full h-full divide-x divide-[#C0BABA]' : 'w-full h-full'}`}>
                        <div className={`${isFullBox ? 'w-[75%] h-full' : 'w-full h-full'}`}>
                            <div className="h-[80px] flex items-center justify-between p-0.5 w-full">
                                <div className="flex items-center w-11/12 p-0.5 rounded-lg">
                                    <img alt="avatar" src={logo}
                                        className=" rounded-full object-cover w-20 h-20 p-1" />
                                    <div className=" w-9/12 ">
                                        <h1 className=" break-words font-bold text-[#23689B] text-[18px] text-ellipsis whitespace-nowrap overflow-hidden w-full"
                                            title="Box chat tương tác">VPI INSIGHT BOT</h1>
                                        <h1 className=" text-[14px] w-full text-[#23689B]">Trợ lý ảo đồng hành cùng bạn</h1>
                                    </div>
                                </div>
                                <div className={`flex items-center justify-end w-4/12 space-x-1 p-0.5 ${isFullBox && 'hidden'}`}>
                                    {isFullBox ? (
                                        <button id="full-box" onClick={() => setIsFullBox(false)}
                                            className=" w-10 h-10 p-[5px] hover:bg-gray-200 cursor-pointer flex justify-center items-center fill-gray-500 rounded-full ">
                                            <img src={smallbox_btn} className='w-10 h-10 object-cover' />
                                        </button>
                                    ) : (
                                        <button id="full-box" onClick={() => setIsFullBox(true)}
                                            className=" w-10 h-10 p-[5px] hover:bg-gray-200 cursor-pointer flex justify-center items-center fill-gray-500 rounded-full ">
                                            <img src={fullsize_btn} className='w-6' />
                                        </button>
                                    )}
                                    <button id="hide-box" onClick={() => {
                                        setOpen(false)
                                    }}
                                        className=" w-10 h-10 p-[5px] hover:bg-gray-200 cursor-pointer flex justify-center items-center fill-gray-500 rounded-full ">
                                        <img src={reject_btn} className='h-10 w-10 object-cover' />
                                    </button>
                                </div>
                            </div>
                            {open && (
                                <div className={`${isFullBox ? 'm-3 w-full h-[88%] border border-[#C0BABA] rounded-3xl p-2 bg-white' : ' w-[400px] h-[420px]'}`}>
                                    <div id="message_container" className={`${Styles.message_container} ${isFullBox ? 'w-full h-[90%] rounded-3xl' : ' w-[400px] h-[420px]'} overflow-x-hidden overflow-y-auto bg-white`}>
                                        <div className=" overflow-x-hidden w-full p-2 " style={{ minHeight: "410px" }} id='list_message'>
                                            <Message message={"Xin chào mừng bạn đến với VPI Insight, tôi là trợ lý ảo sẽ đồng hành cùng bạn"} type={"bot"} />
                                            <Message message={"Bạn đang cần khám phá điều gì?"} type={"bot"} />
                                            <div className="w-full h-full overflow-y-auto" id="list_message">
                                                <Message message={"Tôi đang cần tìm thông tin chi tiết về số AAA"} type={"user"} />
                                                {/* {[12, 3, 4, 3, 2, 2].map(() => (
                                                    <>
                                                        <div className='w-full'>
                                                            <div className=" flex items-end space-x-2 justify-start w-full mb-2">
                                                                <h1 className=" p-3 rounded-3xl text-[#23689B] bg-[#D9EFFF] text-[14.5px] break-words"
                                                                    style={{ maxWidth: "70%" }}>Xin chào mừng bạn đến với VPI Insight, tôi là trợ lý ảo sẽ đồng hành cùng bạn</h1>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end w-full mb-2 space-x-2">
                                                            <h1 className="p-3 rounded-3xl text-white bg-[#23689B] text-[14.5px] break-words" style={{ maxWidth: "60%" }}>Tôi đang cần tìm thông tin chi tiết về số AAA</h1>
                                                        </div>
                                                    </>
                                                ))} */}
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={onSubmit} id="form_chat" className={`w-full h-[70px] p-2 py-4 flex items-center justify-center space-x-2 ${isFullBox ? 'bg-white rounded-3xl' : ''}`}>
                                        <div className={` flex ${isFullBox ? 'w-full h-[60px]' : 'w-[383px] h-[54px]'} p-3 border-2 border-[#23689B] items-center rounded-3xl`}>
                                            <input ref={ref} value={message} autoFocus autoComplete='off' onChange={handleInput} id='search' className='w-full h-full p-3 border-none bg-transparent outline-none placeholder:text-[#23689B] placeholder:text-[15px] text-[#23689B]' placeholder='Bạn đang muốn nói điều gì?' />
                                            <button disabled={excuting} type="submit" form="form_chat" value="Submit" id="btn_sendMessage">
                                                <img src={send_btn} className='w-[26px] h-[26px] fill-[#23689B]' />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                        {isFullBox && (
                            <div className={`${isFullBox ? 'w-[23%] font-barlow flex flex-col items-end h-full' : 'w-0'}`}>
                                <div className={`flex items-center justify-end w-full space-x-1 px-4`}>
                                    <button id="full-box" onClick={() => setIsFullBox(false)}
                                        className=" w-10 h-10 p-[5px] hover:bg-gray-200 cursor-pointer flex justify-center items-center fill-gray-500 rounded-full ">
                                        <img src={smallbox_btn} className='w-9 h-9 object-cover' />
                                    </button>

                                    <button id="hide-box" onClick={() => {
                                        setOpen(false);
                                    }}
                                        className=" w-10 h-10 p-[5px] hover:bg-gray-200 cursor-pointer flex justify-center items-center fill-gray-500 rounded-full ">
                                        <img src={reject_btn} className='h-10 w-10 object-cover' />
                                    </button>
                                </div>
                                <div className='text-[#23689B] pt-5 w-full '>
                                    <div className='hover:bg-[#D9EFFF] flex items-center justify-start cursor-pointer rounded-xl p-3 w-full h-[75px] text-3xl font-bold'>
                                        <h1>VPI Insight Bot</h1>
                                    </div>
                                    <div className='hover:bg-[#D9EFFF] flex items-center justify-start text-[25px] max-xl:text-[20px] cursor-pointer rounded-xl p-3 w-full h-[75px]'>
                                        <h1>Hỏi đáp Tài liệu E&P</h1>
                                    </div>
                                    <div className='hover:bg-[#D9EFFF] flex items-center justify-start text-[25px] max-xl:text-[20px] cursor-pointer rounded-xl p-3 w-full h-[75px]'>
                                        <h1>Hướng dẫn sử dụng</h1>
                                    </div>
                                    <div className='hover:bg-[#D9EFFF] flex items-center justify-start text-[25px] max-xl:text-[20px] cursor-pointer rounded-xl p-3 w-full h-[75px]'>
                                        <h1>Tra cứu Tạp chí Dầu khí</h1>
                                    </div>
                                    <div className='hover:bg-[#D9EFFF] flex items-center justify-start text-[25px] max-xl:text-[20px] cursor-pointer rounded-xl p-3 w-full h-[75px]'>
                                        <h1>Hỏi đáp Sổ tay văn hóa</h1>
                                    </div>
                                    <div className='hover:bg-[#D9EFFF] flex items-center justify-start text-[25px] max-xl:text-[20px] cursor-pointer rounded-xl p-3 w-full h-[75px]'>
                                        <h1>Liên hệ</h1>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {!open && (
                <div id="open-btn" className="absolute bottom-5 right-[20px] z-40 cursor-pointer max-md:right-1" onClick={() => {
                    setOpen(true)
                }}>
                    <div className=' w-full h-full relative'>
                        <img className="w-[75px] h-[75px] rounded-full object-cover bg-white  shadow-lg"
                            src={logo} />
                        <div className='w-4 h-4 shadow-xl bg-[#05FF00] border-[1px] border-white absolute bottom-0 right-2 rounded-full'></div>
                    </div>
                </div>
            )}
        </>
    );
}