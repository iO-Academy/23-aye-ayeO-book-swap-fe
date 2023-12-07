import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='w-full bg-rose-400 flex flex-row justify-center'>
            <div className='flex justify-between text-slate-800 w-full max-w-7xl m-auto min-[500px]:flex-row flex-col px-4 sm:py-2 pb-2'>
                <div className='w-full border-b-2 m-2'>
                    <div className='block sm:hidde align-middle pt-2 px-4'>
                        <span className='text-3xl font-semibold justify-center'>
                            <Link to='/' className='flex flex-row gap-1 text-[#37424b]'>
                                <svg
                                    width='35'
                                    zoomAndPan='magnify'
                                    viewBox='0 0 144 143.999998'
                                    height='35'
                                    preserveAspectRatio='xMidYMid meet'
                                    version='1.0'
                                >
                                    <path
                                        fill='#37424b'
                                        d='M 123.800781 24.941406 L 54.007812 24.941406 C 41.820312 24.117188 31.417969 33.914062 31.355469 45.8125 C 31.289062 57.800781 41.734375 67.742188 54.007812 66.917969 L 123.800781 66.917969 C 122.085938 64.757812 116.441406 57.109375 116.480469 45.8125 C 116.519531 34.660156 122.074219 27.113281 123.800781 24.941406 Z M 123.800781 24.941406 '
                                        fillOpacity='1'
                                        fillRule='nonzero'
                                    />
                                    <path
                                        fill='#37424b'
                                        d='M 27.609375 125.074219 L 97.402344 125.074219 C 109.589844 125.894531 119.996094 116.136719 120.054688 104.277344 C 120.121094 92.328125 109.675781 82.421875 97.402344 83.246094 L 27.609375 83.246094 C 29.324219 85.394531 34.972656 93.019531 34.933594 104.277344 C 34.894531 115.390625 29.335938 122.910156 27.609375 125.074219 Z M 27.609375 125.074219 '
                                        fillOpacity='1'
                                        fillRule='nonzero'
                                    />
                                </svg>
                                swapp
                            </Link>
                        </span>
                        <div>
                            <Link to=''>Available</Link>
                            <Link to=''>Claimed</Link>
                            <Link to=''>Add book</Link>
                        </div>
                    </div>
                    <hr className='my-4 border-[#37424b]' />
                    <p className='text-[#37424b]'>©2023 Copyright: Aye-Aye-O's</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
