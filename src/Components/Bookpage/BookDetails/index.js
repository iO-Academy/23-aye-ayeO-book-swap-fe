import Review from './Review';
import ClaimForm from './ClaimForm';
import ReturnForm from './ReturnForm';
import ReviewForm from './ReviewForm';
import './bookdetails.css';
import { useState } from 'react';
import StarRating from './StarRating';
import ScrollToTop from '../../ScrollToTop';
import LazyImgLoader from '../../LazyImgLoader';

function BookDetails({
    image,
    title,
    author,
    year,
    pageCount,
    genre,
    blurb,
    reviews,
    claimed,
    getBookData,
    refreshReviewsList,
}) {
    const totalScore = reviews?.reduce((ratingSum, review) => ratingSum + review.rating, 0);

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

    return (
        <>
            <ScrollToTop />
            <div className='w-full min-h-screen overflow-hidden max-w-7xl m-auto bg-zinc-100'>
                <div className='book-details w-full m-auto p-5 sm:p-20 pt-16 sm:pt-32 flex flex-col lg:flex-row justify-center lg:gap-24 gap-10'>
                    <div className='w-[400px] flex justify-center max-lg:self-center'>
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
                                rounded='rounded-md'
                            />
                            <div className='w-full mx-auto mt-3 text-sm'>
                                {claimed === null ? (
                                    <div className='flex justify-center items-center text-zinc-600 h-12'>
                                        <svg
                                            className='animate-spin h-5 w-5 text-slate-400 align-middle'
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                        >
                                            <circle
                                                className='opacity-25'
                                                cx='12'
                                                cy='12'
                                                r='10'
                                                stroke='currentColor'
                                                strokeWidth='4'
                                            ></circle>
                                            <path
                                                className='opacity-75'
                                                fill='currentColor'
                                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                            ></path>
                                        </svg>
                                        {/* &nbsp;Checking status... */}
                                    </div>
                                ) : claimed ? (
                                    <>
                                        <p className='text-xs text-zinc-600'>
                                            Claimed by: <span className='italic'>{claimed}</span>
                                        </p>
                                        <button
                                            data-element='return'
                                            onClick={toggleReturn}
                                            className='underline text-center text-md text-rose-400 font-bold'
                                        >
                                            Return Book
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        data-element='claim'
                                        onClick={toggleClaim}
                                        className='button py-2 w-full'
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
                    <div className='flex flex-col w-full gap-2 lg:max-w-2xl'>
                        <h1 className='text-center lg:text-left p-0 sm:text-5xl text-[7vw] leading-tight'>
                            {title}
                        </h1>
                        <p className='text-center lg:text-left'>{author}</p>
                        <div className='flex gap-2 items-baseline m-2 self-center lg:self-start pb-4 lg:pb-0'>
                            <p className='text-2xl'>{avgScore.toFixed(1)}</p>
                            <StarRating rating={avgScore} />
                            <a href='#reviews' className='underline text-zinc-600'>
                                {reviews?.length} reviews
                            </a>
                        </div>
                        <p>{blurb}</p>
                        <br />
                        <p>Genre: {genre.name}</p>
                        <p>{year}</p>

                        {pageCount && <p>{pageCount} pages</p>}
                        <div className='mt-6 border-zinc-300'>
                            <h2
                                className='border-t border-zinc-200 text-center lg:text-left'
                                id='reviews'
                            >
                                Reviews
                            </h2>
                            {reviews?.map((review) => (
                                <Review review={review} key={review.id} />
                            ))}
                            <ReviewForm refreshReviewsList={refreshReviewsList} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookDetails;
