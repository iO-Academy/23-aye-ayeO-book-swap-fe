import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const LazyImgLoader = ({ src, alt, dimensions, rounded }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    return (
        <div className={`flex justify-center items-center ${dimensions} ${rounded}`}>
            <div
                role='status'
                className={`flex items-center justify-center bg-gray-300 dark:bg-gray-200 ${dimensions} ${rounded} ${
                    isImageLoaded ? 'animate-none' : 'animate-pulse'
                }`}
                style={{
                    display: isImageLoaded || !inView ? 'none' : 'flex',
                    width: dimensions,
                    height: dimensions,
                }}
            >
                <svg
                    className='w-10 h-10 text-zinc-300 dark:text-zinc-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 18'
                    style={{ display: isImageLoaded || !inView ? 'none' : 'block' }}
                >
                    <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
                </svg>
            </div>

            <img
                ref={ref}
                src={inView ? src : ''}
                alt={alt}
                onLoad={handleImageLoad}
                className={`object-cover object-top ${dimensions} ${rounded}`}
                style={{ display: isImageLoaded || !inView ? 'block' : 'none' }}
                loading={inView ? 'auto' : 'lazy'}
            />
        </div>
    );
};

export default LazyImgLoader;
