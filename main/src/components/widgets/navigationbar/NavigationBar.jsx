import React, { useState } from 'react';
import Styles from './NavigationBar.module.scss';
import { IoMoon, IoSunny } from 'react-icons/io5';
import logo from '../../../assets/images/pvi_logo.png';
import whiteLogo from '../../../assets/images/pvi_white_logo.png';
import menu_btn from '../../../assets/images/menu.png';
import { Turn as Hamburger } from 'hamburger-react'

function NavigationBar() {

    const [isFullMenu, setIsFullMenu] = useState(false);
    const [option, setOption] = useState();
    const [toggled, setToggled] = useState(false);

    const handleToggle = (e) => {
        if (e) {
            setToggled(true);
            setIsFullMenu(true)
        } else {
            setToggled(false);
            setIsFullMenu(false)
        }
    }

    return (
        <nav
            className={`transition font-barlow min-h-[120px] ${option === "aboutUs" && ' h-[200px]'} ${option === "contact" && ' h-[180px]'} duration-500 ease-in-out fixed top-0 left-0 z-30 w-screen pt-[20px] pb-10 px-[10px] max-md:px-1 max-md:pt-5 ${isFullMenu ? ' bg-white' : ''}`}
            style={{ borderBottomLeftRadius: "50px", borderBottomRightRadius: "50px" }
            }
            onMouseLeave={() => {
                if (toggled) setToggled(false);
                setIsFullMenu(false);
            }}
            onMouseEnter={() => {
                setIsFullMenu(true);
            }}
        >
            <div
                className={`flex justify-between items-start relative max-xl:flex-col max-xl:justify-start`}
            >
                <div className='flex h-full items-center justify-start space-x-10 max-md:space-x-7 w-1/2 pl-[10px] max-xl:w-full max-sm:flex-col max-sm:items-start'>
                    <div className=' flex items-center space-x-10 max-md:space-x-7 '>
                        <img className="w-[53px] h-[54px] leading-none cursor-pointer " src={logo} />
                        <h1 className={`text-[28px] font-barlow font-bold ${isFullMenu ? 'text-[#23689B]' : 'text-[#23689B]'}`}>VPI Insight</h1>
                    </div>
                    <div onClick={() => setIsFullMenu(true)} className={`flex w-[350px] h-[35px] p-3 border-2 border-[#23689B] items-center rounded-3xl cursor-pointer max-md:w-6/12 ${isFullMenu ? 'max-sm:w-9/12 items-start' : 'max-sm:hidden'} max-sm:${toggled ? 'block' : 'hidden'}`}>
                        <input
                            autoComplete='off'
                            id='search' placeholder='Tìm kiếm trên bản đồ dầu khí Việt Nam'
                            className={`w-full h-full p-3 border-none bg-transparent outline-none text-[#23689B] placeholder:text-[#23689B]`}
                        />
                        <svg aria-label='search' className={`w-[19px] h-[19px] fill-[#23689B]`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>
                    </div>
                </div>

                <div className=' absolute top-0 right-0 h-full w-fit flex items-start xl:hidden'>
                    <Hamburger onToggle={handleToggle} toggled={toggled} color='#23689B' />
                </div>

                <div
                    className={`flex h-full justify-end items-center text-[20px] w-1/2 space-x-10 max-xl:space-x-0 max-xl:flex-col 
                    ${toggled ? 'max-xl:block' : 'max-xl:hidden'} max-xl:w-full max-xl:items-start max-xl:pt-10 max-sm:pt-0`}
                >
                    <div
                        className={`font-sans font-bold p-2 rounded-2xl `}
                        onMouseEnter={(e) => {
                            setOption("aboutUs")
                        }}
                        onMouseLeave={() => setOption()}
                    >
                        <h1 className={`${Styles.hover_underline} cursor-pointer  text-[#23689B]`}>Giới thiệu</h1>
                        <div className={`${option === "aboutUs" ? ' block' : 'hidden'} fixed w-full pt-10 left-0 flex flex-col items-end`}>
                            <ul className=' w-5/12 max-xl:w-full grid grid-cols-3 gap-6 text-base font-sans font-medium text-[#23689B]'>
                                <li className='hover:text-[#23689B] hover:underline hover:underline-offset-2 cursor-pointer duration-200'>Overview</li>
                                <li className='hover:text-[#23689B] hover:underline hover:underline-offset-2 cursor-pointer duration-200'>Overview</li>
                                <li className='hover:text-[#23689B] hover:underline hover:underline-offset-2 cursor-pointer duration-200'>Overview</li>
                                <li className='hover:text-[#23689B] hover:underline hover:underline-offset-2 cursor-pointer duration-200'>Overview</li>
                                <li className='hover:text-[#23689B] hover:underline hover:underline-offset-2 cursor-pointer duration-200'>Overview</li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className={`font-sans font-bold p-2 rounded-2xl`}
                        onClick={(e) => {
                            setOption("instruction")
                        }}
                        onMouseLeave={() => setOption()}
                    >
                        <h1 className={`${Styles.hover_underline} cursor-pointer  text-[#23689B]`}>Hướng dẫn</h1>
                    </div>

                    <div
                        className={`font-sans font-bold p-2 rounded-2xl`}
                        onMouseEnter={(e) => {
                            setOption("contact")
                        }}
                        onMouseLeave={() => setOption()}
                    >
                        <h1 className={`${Styles.hover_underline} cursor-pointer  text-[#23689B]`}>Liên hệ</h1>
                        <div className={`${option === "contact" ? ' block' : 'hidden'} fixed w-full pt-10 left-0 flex flex-col items-end`}>
                            <ul className=' w-5/12 max-xl:w-full grid grid-cols-3 gap-6 text-base font-sans font-medium text-[#23689B]'>
                                <li className='hover:text-[#23689B] hover:underline hover:underline-offset-2 cursor-pointer duration-200'>Overview</li>
                                <li className='hover:text-[#23689B] hover:underline hover:underline-offset-2 cursor-pointer duration-200'>Overview</li>
                                <li className='hover:text-[#23689B] hover:underline hover:underline-offset-2 cursor-pointer duration-200'>Overview</li>
                            </ul>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className=" h-9 lg:ml-auto lg:mr-[10px] py-1 px-4 bg-[#23689B] text-[white] hover:bg-[#3d7096] font-bold text-[19px]
                            rounded-3xl transition duration-200 ease-out dark:bg-white dark:text-black active:bg-blue-600 active:text-white"
                        >Đăng nhập</button>
                    </div>
                </div>
            </div>
        </nav >
    );
}

export default NavigationBar;