import React from 'react';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className='h-screen flex items-center sm:justify-center flex-col sm:p-8 pt-20'>
            <img src={logo} alt='Swapp logo' width='100px' />
            <h1>
                404
                <br />
                <br />
                Page-Turner Not Found
            </h1>
            <p className=' text-center text-lg max-w-[600px]'>
                Sorry, this page wasn't a real page-turner.
                <br />
                Let's find you a better story on the{' '}
                <Link to='/' className='font-semibold underline'>
                    homepage
                </Link>
                .
            </p>
        </div>
    );
}

export default NotFound;
