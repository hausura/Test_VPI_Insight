import React from 'react'

export default function Message({ message, type }) {
    return (
        <>
            {type == "bot" && (
                <>
                    <div className='w-full'>
                        <div className=" flex items-end space-x-2 justify-start w-full mb-2">
                            <h1 className=" p-3 rounded-[25px] text-[#23689B] bg-[#D9EFFF] text-[14.5px] break-words"
                                style={{ maxWidth: "70%" }}>{message}</h1>
                        </div>
                    </div>
                </>
            )} 
            {type == "user" && (
                <>
                    <div className="w-full">
                        <div className="flex flex-col items-end w-full mb-2 space-x-2">
                            <h1 className="p-3 text-white bg-[#23689B] text-[14.5px] break-words" style={{ maxWidth: "60%", borderRadius: "25px 25px 10px 25px "}}>{message}</h1>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
