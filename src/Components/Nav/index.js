import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import './nav.css';

function Nav() {
    return (
        <div className='w-full bg-[#343450] sm:fixed relative z-40 nav'>
            <nav className='px-4 sm:py-2 pb-2 flex justify-between text-slate-800 w-full max-w-7xl m-auto min-[500px]:flex-row flex-col gap-3'>
                <span className='text-3xl font-semibold py-2 justify-center'>
                    <Link
                        to='/'
                        className='flex flex-row gap-2 justify-center  text-[#ededed] group'
                    >
                        <svg
                            width='35'
                            zoomAndPan='magnify'
                            viewBox='0 0 144 143.999998'
                            height='35'
                            preserveAspectRatio='xMidYMid meet'
                            version='1.0'
                        >
                            <path
                                fill='#ededed'
                                d='M 123.800781 24.941406 L 54.007812 24.941406 C 41.820312 24.117188 31.417969 33.914062 31.355469 45.8125 C 31.289062 57.800781 41.734375 67.742188 54.007812 66.917969 L 123.800781 66.917969 C 122.085938 64.757812 116.441406 57.109375 116.480469 45.8125 C 116.519531 34.660156 122.074219 27.113281 123.800781 24.941406 Z M 123.800781 24.941406 '
                                fillOpacity='1'
                                fillRule='nonzero'
                                className='translate-x-3 group-hover:translate-x-0  transition-all ease-in-out group-hover:fill-[#f87171]'
                            />
                            <path
                                fill='#ededed'
                                d='M 27.609375 125.074219 L 97.402344 125.074219 C 109.589844 125.894531 119.996094 116.136719 120.054688 104.277344 C 120.121094 92.328125 109.675781 82.421875 97.402344 83.246094 L 27.609375 83.246094 C 29.324219 85.394531 34.972656 93.019531 34.933594 104.277344 C 34.894531 115.390625 29.335938 122.910156 27.609375 125.074219 Z M 27.609375 125.074219 '
                                fillOpacity='1'
                                fillRule='nonzero'
                                className='-translate-x-3 group-hover:translate-x-0 transition-all ease-in-out group-hover:fill-[#ef9b9b]'
                            />
                        </svg>
                        swapp
                    </Link>
                </span>
                <div className='flex gap-6 sm:justified-end justify-center transition items-center text-md text-white'>
                    <NavLink to='/' className='transition-font duration-2000'>
                        Available
                    </NavLink>

                    <NavLink to='/claimed'>Claimed</NavLink>
                    {/* <NavLink
                        to='/books/add'
                        className={
                            'py-2 px-4 rounded-md text-base bg-[#f9e784]  border-slate-700  hover:bg-[#f9e784]/90 text-slate-800 transition hover:transform'
                        }
                    >
                        Add&nbsp;book
                    </NavLink> */}
                    <NavLink to='/books/add'>
                        <button className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-[#343450] background-animate-slow'>
                            <span className='relative py-2 px-4 transition-all ease-in duration-100 bg-white dark:bg-[#343450] rounded-md group-hover:bg-opacity-0 flex flex-row gap-1 items-center'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    height='20'
                                    viewBox='0 -960 960 960'
                                    width='20'
                                    fill='currentColor'
                                >
                                    <path d='M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z' />
                                </svg>
                                Add book
                            </span>
                        </button>
                    </NavLink>
                </div>
            </nav>
        </div>
    );
}

export default Nav;
