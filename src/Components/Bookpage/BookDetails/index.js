import Review from './Review';
import ClaimForm from './ClaimForm';
import ReturnForm from './ReturnForm';
import ReviewForm from './ReviewForm';
import { useEffect, useRef, useState } from 'react';
import StarRating from './StarRating';
import LazyImgLoader from '../../LazyImgLoader';
import Spinner from '../../Spinner';
import { renderWithLineBreaks, scrollToTop } from '../../../utilities';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

function BookDetails({
    image,
    title,
    author,
    isbn10,
    isbn13,
    year,
    pageCount,
    genre,
    blurb,
    reviews,
    claimed,
    getBookData,
    refreshReviewsList,
}) {
    const [openBlurb, setOpenBlurb] = useState(false);
    const h1Ref = useRef(null);

    const scrollToElement = () => {
        if (h1Ref.current) {
            h1Ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToTop();
    }, []);

    const totalScore = reviews?.reduce(
        (ratingSum, review) => ratingSum + review.rating,
        0,
    );

    const avgScore = totalScore ? totalScore / reviews?.length : 0;

    const [openClaim, setOpenClaim] = useState(false);
    const [openReturn, setOpenReturn] = useState(false);

    function toggleClaim() {
        openClaim ? setOpenClaim(false) : setOpenClaim(true);
        document.body.style.overflow = !openClaim ? 'hidden' : 'auto';
    }

    function toggleReturn() {
        openReturn ? setOpenReturn(false) : setOpenReturn(true);
        document.body.style.overflow = !openReturn ? 'hidden' : 'auto';
    }

    function toggleBlurb() {
        setOpenBlurb(!openBlurb);
        openBlurb && scrollToElement();
    }

    return (
        <>
            <div className='m-auto min-h-screen w-full max-w-7xl'>
                <div className='m-auto flex w-full flex-col justify-center gap-10 pt-16 sm:p-20 sm:pt-32 lg:flex-row lg:gap-24'>
                    <div className='flex sm:w-[400px]  justify-center max-lg:self-center'>
                        <div className='lg:fixed lg:z-40'>
                            <LazyImgLoader
                                src={image}
                                alt={'Cover of ' + title}
                                dimensions='
                            h-[96vw]
                            w-[60vw]

                            sm:h-[70vw]
                            sm:w-[44vw]

                            lg:h-[500px]
                            lg:w-[312.5px]
                            '
                                srcsetSizes='
                                    (max-width: 399px) 55vw,
                                    (max-width: 640px) 50vw,
                                    (max-width: 1084px) 33vw,
                                    (max-width: 1280px) 20vw,
                                    360px'
                                rounded='rounded-md'
                            />
                            <div className='mx-auto mt-3 w-full text-sm'>
                                {claimed === null ? (
                                    <Spinner />
                                ) : claimed ? (
                                    <>
                                        <p className='text-xs text-zinc-600'>
                                            Claimed by:{' '}
                                            <span className='italic'>
                                                {claimed}
                                            </span>
                                        </p>
                                        <button
                                            data-element='return'
                                            onClick={toggleReturn}
                                            className='text-md text-center font-bold text-rose-400 underline'
                                        >
                                            Return Book
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        data-element='claim'
                                        onClick={toggleClaim}
                                        className='button w-full py-2'
                                    >
                                        Claim Book
                                    </button>
                                )}
                                {openReturn && claimed && (
                                    <ReturnForm
                                        getBookData={getBookData}
                                        claimed={claimed}
                                        open={openReturn}
                                        visibilityToggle={toggleReturn}
                                        bookTitle={title}
                                    />
                                )}
                                {openClaim && !claimed && (
                                    <ClaimForm
                                        getBookData={getBookData}
                                        open={openClaim}
                                        visibilityToggle={toggleClaim}
                                        bookTitle={title}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full flex-col gap-2 transition lg:max-w-2xl'>
                        <h1
                            className='px-5 sm:p-0 py-0 text-center text-[7vw] leading-tight sm:text-4xl lg:text-left'
                            ref={h1Ref}
                        >
                            {title}
                        </h1>
                        <p className='px-5 sm:px-0 text-center lg:text-left'>
                            {author}
                        </p>
                        <div className='m-2 flex items-baseline gap-2 self-center pb-4 px-5 sm:px-0 lg:self-start lg:pb-0'>
                            <p className='text-2xl'>{avgScore.toFixed(1)}</p>
                            <StarRating rating={avgScore} />
                            <Link
                                to='#reviews'
                                className='text-zinc-600 underline'
                                onClick={(e) => {
                                    e.preventDefault();
                                    document
                                        .getElementById('reviews')
                                        .scrollIntoView({
                                            behavior: 'smooth',
                                        });
                                }}
                            >
                                {reviews?.length} reviews
                            </Link>
                        </div>
                        <div
                            className={`px-5 sm:px-0 ${
                                openBlurb || blurb.length < 600
                                    ? null
                                    : 'fade max-h-60'
                            }`}
                        >
                            <p className='break-words'>
                                {renderWithLineBreaks(blurb)}
                            </p>
                        </div>
                        {blurb.length > 600 && (
                            <button
                                className='z-10 flex flex-row self-center font-bold'
                                onClick={toggleBlurb}
                            >
                                {openBlurb ? 'Show less' : 'Show more '}
                                <svg height='25' width='25' viewBox='0 0 24 24'>
                                    <path
                                        d='M8.70710678,9.27397892 C8.31658249,8.90867369 7.68341751,8.90867369 7.29289322,9.27397892 C6.90236893,9.63928415 6.90236893,10.2315609 7.29289322,10.5968662 L12,15 L16.7071068,10.5968662 C17.0976311,10.2315609 17.0976311,9.63928415 16.7071068,9.27397892 C16.3165825,8.90867369 15.6834175,8.90867369 15.2928932,9.27397892 L12,12.3542255 L8.70710678,9.27397892 Z'
                                        transform={
                                            openBlurb
                                                ? 'rotate(180 12 12)'
                                                : 'rotate(0 12 12)'
                                        }
                                    ></path>
                                </svg>
                            </button>
                        )}
                        <br />
                        <div>
                            <div className='px-5 sm:px-0 grid grid-cols-4 gap-3 text-sm sm:grid-cols-6'>
                                {genre.name && (
                                    <>
                                        <p className='col-span-1 text-zinc-500'>
                                            Category
                                        </p>{' '}
                                        <p className='col-span-3 sm:col-span-5'>
                                            {genre.name}
                                        </p>
                                    </>
                                )}
                                {isbn13 && (
                                    <>
                                        <p className='col-span-1 text-zinc-500'>
                                            ISBN
                                        </p>
                                        <p className='col-span-3 sm:col-span-5'>
                                            {isbn13}
                                            <span className='text-zinc-500'>{` (ISBN10: ${isbn10})`}</span>
                                        </p>
                                    </>
                                )}
                                {year && (
                                    <>
                                        <p className='col-span-1 text-zinc-500'>
                                            Year
                                        </p>{' '}
                                        <p className='col-span-3 sm:col-span-5'>
                                            {year}{' '}
                                        </p>
                                    </>
                                )}
                                {pageCount && (
                                    <>
                                        <p className='col-span-1 text-zinc-500'>
                                            Pages
                                        </p>{' '}
                                        <p className='col-span-3 sm:col-span-5'>
                                            {pageCount}{' '}
                                        </p>
                                    </>
                                )}
                                <div className='mt-6 border-zinc-300'></div>
                            </div>
                            <h2
                                className='border-t border-zinc-200 text-center lg:text-left'
                                id='reviews'
                            >
                                Reviews
                            </h2>
                            {reviews?.map((review) => (
                                <Review review={review} key={uuidv4()} />
                            ))}
                            <ReviewForm
                                refreshReviewsList={refreshReviewsList}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookDetails;
