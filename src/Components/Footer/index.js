import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='w-full bg-zinc-700 sticky bottom-0'>
            <div className='w-full max-w-7xl m-auto px-4 sm:py-2 pb-2'>
                <div className='block pt-2 px-4'>
                    <span className='self-left text-3xl font-semibold'>
                        <Link
                            to='/'
                            className='group flex translate-x-0 flex-row items-center justify-center text-[#ededed] sm:-translate-x-3'
                        >
                            <svg
                                width='60'
                                zoomAndPan='magnify'
                                viewBox='0 0 60 37.5'
                                height='60'
                                preserveAspectRatio='xMidYMid meet'
                                version='1.0'
                            >
                                <path
                                    fill='#cdcdcd'
                                    d='M 15.605469 20.003906 C 16.742188 21.4375 17.464844 23.527344 17.464844 25.867188 C 17.464844 28.199219 16.742188 30.289062 15.605469 31.726562 L 33.714844 31.726562 C 37.105469 31.695312 39.753906 30.078125 40.734375 27.8125 C 40.984375 27.21875 41.148438 26.53125 41.148438 25.859375 C 41.148438 25.183594 41.003906 24.539062 40.753906 23.953125 C 40.746094 23.941406 40.746094 23.921875 40.734375 23.914062 C 39.734375 21.679688 37.074219 20.03125 33.722656 20.003906 Z M 15.605469 20.003906 '
                                    fillOpacity='1'
                                    fillRule='nonzero'
                                    className='translate-x-0 transition-all  ease-in-out group-hover:translate-x-1 group-hover:fill-[#ef9b9b]'
                                />

                                <path
                                    fill='#fff'
                                    d='M 44.394531 5.28125 C 43.257812 6.714844 42.535156 8.808594 42.535156 11.148438 C 42.535156 13.480469 43.257812 15.574219 44.394531 17.007812 L 26.277344 17.007812 C 22.886719 16.980469 20.234375 15.359375 19.253906 13.097656 C 19 12.5 18.839844 11.816406 18.839844 11.140625 C 18.839844 10.464844 18.984375 9.820312 19.234375 9.230469 C 19.242188 9.222656 19.242188 9.203125 19.253906 9.191406 C 20.253906 6.957031 22.914062 5.308594 26.269531 5.28125 Z M 44.394531 5.28125 '
                                    fillOpacity='1'
                                    fillRule='nonzero'
                                    className='translate-x-0 transition-all ease-in-out group-hover:-translate-x-1 group-hover:fill-[#f87171]'
                                />
                            </svg>
                            <span className='-translate-x-2 '>swapp</span>
                        </Link>
                    </span>
                    {/* <div>
                        <Link to='/'>Available</Link>
                        <Link to='/claimed'>Claimed</Link>
                        <Link to='/books/add'>Add book</Link>
                    </div> */}
                </div>
                <hr className='my-4 border-[#37424b]' />
                <p className='text-[#ededed]'>©2023 Copyright: Aye-Aye-O's</p>
            </div>
        </div>
    );
}

export default Footer;
