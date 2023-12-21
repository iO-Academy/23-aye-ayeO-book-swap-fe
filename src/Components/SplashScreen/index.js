import React from 'react';
import { useEffect, useState } from 'react';
import './splashscreen.css';

function SplashScreen() {
    const [loading, setLoading] = useState(true);
    document.body.style.overflow = loading ? 'hidden' : 'visible';

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2100);

        return () => clearTimeout(timeout);
    }, []);

    return (
        // Render splash only when loading is true
        loading && (
            <div className='fade-out fixed z-50 flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#343450]'>
                <svg
                    width='100vw'
                    zoomAndPan='magnify'
                    viewBox='0 0 60 37.5'
                    height='15vh'
                    preserveAspectRatio='xMidYMid meet'
                    version='1.0'
                >
                    <path
                        fill='#ef9b9b'
                        stroke='#ef9b9b'
                        strokeWidth='0.1'
                        d='M 15.605469 20.003906 C 16.742188 21.4375 17.464844 23.527344 17.464844 25.867188 C 17.464844 28.199219 16.742188 30.289062 15.605469 31.726562 L 33.714844 31.726562 C 37.105469 31.695312 39.753906 30.078125 40.734375 27.8125 C 40.984375 27.21875 41.148438 26.53125 41.148438 25.859375 C 41.148438 25.183594 41.003906 24.539062 40.753906 23.953125 C 40.746094 23.941406 40.746094 23.921875 40.734375 23.914062 C 39.734375 21.679688 37.074219 20.03125 33.722656 20.003906 Z M 15.605469 20.003906 '
                        fillOpacity='0.1'
                        fillRule='nonzero'
                        className='book1'
                    />

                    <path
                        fill='#f87171'
                        strokeWidth='0.1'
                        stroke='#f87171'
                        d='M 44.394531 5.28125 C 43.257812 6.714844 42.535156 8.808594 42.535156 11.148438 C 42.535156 13.480469 43.257812 15.574219 44.394531 17.007812 L 26.277344 17.007812 C 22.886719 16.980469 20.234375 15.359375 19.253906 13.097656 C 19 12.5 18.839844 11.816406 18.839844 11.140625 C 18.839844 10.464844 18.984375 9.820312 19.234375 9.230469 C 19.242188 9.222656 19.242188 9.203125 19.253906 9.191406 C 20.253906 6.957031 22.914062 5.308594 26.269531 5.28125 Z M 44.394531 5.28125 '
                        fillOpacity='0.1'
                        fillRule='nonzero'
                        className='book2'
                    />
                </svg>
            </div>
        )
    );
}

export default SplashScreen;
