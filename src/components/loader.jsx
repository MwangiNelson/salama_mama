import React from 'react'

function Loader() {
    return (
        <div className="flex ps-14  items-start gap-2.5 my-3">
           
            <div className="flex py-5 flex-col w-full max-w-[10vw] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 ">
                <div className="loader">
                    <div className="circle">
                        <div className="dot"></div>
                        <div className="outline"></div>
                    </div>
                    <div className="circle">
                        <div className="dot"></div>
                        <div className="outline"></div>
                    </div>
                    <div className="circle">
                        <div className="dot"></div>
                        <div className="outline"></div>
                    </div>
                    <div className="circle">
                        <div className="dot"></div>
                        <div className="outline"></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Loader