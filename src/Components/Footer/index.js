import React from 'react';
import { scrollToTop } from '../../utilities';
import Logo from '../Logo';

function Footer() {
    return (
        <>
            <div className='w-full bg-zinc-700 fixed bottom-0 -z-10'>
                <div className='w-full justify-center bg-zinc-600/50 hover:bg-zinc-600/90 transition'>
                    <button
                        className='text-zinc-200 p-4 w-full'
                        onClick={scrollToTop}
                    >
                        Back to top
                    </button>
                </div>
                <div className='max-w-7xl mx-auto py-4 w-max'>
                    <Logo />
                    <p className='text-zinc-300 text-center text-xs p-2'>
                        © 2023 Swapee. All rights reserved.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Footer;
