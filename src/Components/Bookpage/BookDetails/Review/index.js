import { useState } from 'react';
import StarRating from '../StarRating';

function Review({ review }) {
    const [openReview, setOpenReview] = useState(false);

    function toggleReview() {
        setOpenReview(!openReview);
    }

    return (
        <div
            className='
            border
            border-zinc-100
        bg-white
        rounded-lg
        w-full
        my-4
        md:flex
        lg:flex-col
        xl:flex-row
        overflow-hidden'
        >
            <div
                className='
            bg-zinc-50
            rounded-l-lg
            flex-shrink-0
            flex
            justify-start
            flex-col
            sm:flex-row
            md:flex-col
            lg:flex-row
            xl:flex-col
            gap-2
            p-5
            w-full
            md:w-48
            lg:w-full
            xl:w-48'
            >
                <StarRating rating={review.rating} />
                <h3
                    className='
                font-bold
                !text-lg
                py-0
                '
                >
                    {review.name}
                </h3>
            </div>
            <div
                className='flex-grow
            p-5
            border-slate-200
            min-w-0
            max-w-full'
            >
                <p
                    className={
                        openReview || review.review.length < 320
                            ? 'break-words'
                            : 'fade max-h-36 break-words'
                    }
                >
                    {review.review}
                </p>
                {review.review.length >= 320 && (
                    <button
                        className='font-bold flex flex-row self-center z-10 py-2'
                        onClick={toggleReview}
                    >
                        {openReview ? 'Show less' : 'Show more '}
                        <svg height='25' width='25' viewBox='0 0 24 24'>
                            <path
                                d='M8.70710678,9.27397892 C8.31658249,8.90867369 7.68341751,8.90867369 7.29289322,9.27397892 C6.90236893,9.63928415 6.90236893,10.2315609 7.29289322,10.5968662 L12,15 L16.7071068,10.5968662 C17.0976311,10.2315609 17.0976311,9.63928415 16.7071068,9.27397892 C16.3165825,8.90867369 15.6834175,8.90867369 15.2928932,9.27397892 L12,12.3542255 L8.70710678,9.27397892 Z'
                                transform={
                                    openReview
                                        ? 'rotate(180 12 12)'
                                        : 'rotate(0 12 12)'
                                }
                            ></path>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Review;
