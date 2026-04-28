import React, { useEffect, useRef, useState } from 'react'
import ChevronLeft from "../Icons/ChevronLeft"
import ChevronRight from "../Icons/ChevronRight"

const Carousel = ({ images = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const timerRef = useRef(null);

    if (!images || images.length === 0) {
        return <div>Loading...</div>;
    }

    function handleLeft() {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    }

    function handleRight() {
        setActiveIndex((prev) => (prev + 1) % images.length);
    }

    function clearTimer() {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    }

    function addTimer() {
        timerRef.current = setInterval(() => {
            //console.log("timmer ");
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, 2000);
    }

    function handleEnter() {
        clearTimer();
    }

    function handleLeave() {
        addTimer();
    }

    useEffect(() => {
        clearTimer();
        addTimer();
        return clearTimer;
    }, [images]);

    return (
        <div
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className='relative'
        >
            {/* Left Button */}
            <div
                onClick={handleLeft}
                className='bg-white h-10 w-8 left-0 absolute flex justify-center items-center top-[25vh] cursor-pointer'
            >
                <ChevronLeft />
            </div>

            {/* Right Button */}
            <div
                onClick={handleRight}
                className='bg-white h-10 w-8 right-0 absolute flex justify-center items-center top-[25vh] cursor-pointer'
            >
                <ChevronRight />
            </div>

            {/* Image */}
            <div className='h-full w-full'>
                <img
                    className='h-90 w-full object-cover'
                    src={images[activeIndex]}
                    alt='carousel'
                />
            </div>
        </div>
    )
}

export default Carousel