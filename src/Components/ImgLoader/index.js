import React, { useState } from 'react';

function ImgLoader({ src, alt, w, h }) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const dimensionClasses = `w-${w} h-${h}`;

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    return (
        <>
            {!isImageLoaded && (
                <div
                    role='status'
                    className='space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center m-auto'
                >
                    <div
                        className={`object-cover flex items-center justify-center bg-gray-300 rounded dark:bg-gray-200  ${dimensionClasses}`}
                    >
                        <svg
                            className='w-10 h-10 text-zinc-300 dark:text-zinc-400'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 20 18'
                        >
                            <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
                        </svg>
                    </div>

                    <span className='sr-only'>Loading...</span>
                </div>
            )}

            <img
                src={src}
                alt={alt}
                className={`rounded object-cover ${dimensionClasses}`}
                onLoad={handleImageLoad}
                style={{ display: isImageLoaded ? 'block' : 'none' }}
            />
        </>
    );
}

export default ImgLoader;
