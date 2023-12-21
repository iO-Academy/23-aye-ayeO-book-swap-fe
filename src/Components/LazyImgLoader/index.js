import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const LazyImgLoader = ({ src, alt, dimensions, srcsetSizes, rounded }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [ref, inView] = useInView({
        triggerOnce: true,
        // rootMargin pushes the bottom margin to 400px below the viewport
        rootMargin: '0px 0px 400px 0px',
    });
    let srcset = '';

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    function isAmazonImage(url) {
        return url.includes('https://m.media-amazon.com/');
    }

    function getAmazonLink(url, width) {
        return url.slice(0, -4) + '._FMwebp_SX' + width + '.jpg';
    }

    if (isAmazonImage(src)) {
        srcset = `
        ${getAmazonLink(src, '120')} 120w,
        ${getAmazonLink(src, '220')} 220w,
        ${getAmazonLink(src, '320')} 320w,
        ${getAmazonLink(src, '480')} 480w,
        ${getAmazonLink(src, '640')} 640w,
        ${getAmazonLink(src, '800')} 800w,
        ${getAmazonLink(src, '960')} 960w,
        ${getAmazonLink(src, '1120')} 1120w,
        ${getAmazonLink(src, '1280')} 1280w,
        ${getAmazonLink(src, '1440')} 1440w,
        ${getAmazonLink(src, '1600')} 1600w,
        ${getAmazonLink(src, '2000')} 2000w`;
    }

    return (
        <div className={`relative ${dimensions} ${rounded}`}>
            <div
                role='status'
                className={`absolute inset-0 flex items-center justify-center bg-zinc-300 dark:bg-zinc-200 ${dimensions} ${rounded} ${
                    isImageLoaded ? 'animate-none' : 'animate-pulse'
                }`}
                style={{
                    display: isImageLoaded ? 'none' : 'flex',
                }}
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

            <img
                ref={ref}
                src={inView ? src : ''}
                srcSet={inView ? srcset : ''}
                sizes={srcsetSizes}
                alt={alt}
                onLoad={handleImageLoad}
                className={`object-cover object-top ${dimensions} ${rounded}`}
                style={{
                    opacity: isImageLoaded || !inView ? 1 : 0,
                    visibility: isImageLoaded || !inView ? 'visible' : 'hidden',
                    transition: 'opacity 0.5s ease-in-out',
                }}
                loading={inView ? 'auto' : 'lazy'}
            />
        </div>
    );
};

export default LazyImgLoader;
