import Review from './Review';
import ClaimForm from './ClaimForm';
import ReturnForm from './ReturnForm';
import ReviewForm from './ReviewForm';
import './bookdetails.css';
import { useState } from 'react';
import ImgLoader from '../../ImgLoader';
import StarRating from './StarRating';

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
        <div className='w-full min-h-screen overflow-hidden max-w-7xl m-auto bg-zinc-100'>
            <div className='book-details w-full m-auto p-5 sm:p-20 pt-16 sm:pt-32 flex flex-col lg:flex-row justify-center lg:gap-24 gap-10'>
                <div className='w-[800px] flex justify-center max-lg:self-center'>
                    {/* <div className='lg:fixed w-[15vw] left-[7.5%]'> */}

                    {/* min-w-[1000px]:w-[15vw]
                    max-w-[1200px]:w-[15vw]
                    min-w-[1000px]:left-[7.5%]
                    max-w-[1200px]:left-[7.5%] */}
                    <div className='lg:fixed lg:z-40'>
                        <ImgLoader src={image} alt={'Cover of ' + title} w='72' h='[400px]' />
                        <div className='w-full mx-auto mt-3 text-sm'>
                            {claimed && (
                                <p className='text-xs text-zinc-600'>Claimed by {claimed}</p>
                            )}

                            {claimed ? (
                                <button
                                    data-element='return'
                                    onClick={toggleReturn}
                                    // className='button py-2 w-full'
                                    className='underline text-center text-md text-rose-400 font-bold'
                                >
                                    Return Book
                                </button>
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
                <div className='flex flex-col w-full gap-2 md:max-w-[1000px]'>
                    <h1 className='text-center lg:text-left p-0 text-5xl '>{title}</h1>
                    <p className='text-center lg:text-left'>{author}</p>
                    <div className='flex gap-2 items-baseline m-2 self-center lg:self-start pb-4 lg:pb-0'>
                        <p className='text-2xl'>{avgScore.toFixed(1)}</p>
                        <StarRating rating={avgScore} />
                        <a href='#reviews' className='underline text-zinc-500'>
                            {reviews?.length} reviews
                        </a>
                    </div>
                    <p>{blurb}</p>
                    <br />
                    <p>Genre: {genre.name}</p>
                    <p>{year}</p>

                    {pageCount && <p>{pageCount} pages</p>}
                    <div className='mt-6 border-zinc-300'>
                        <h2 className='border-t border-zinc-200' id='reviews'>
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
    );
}

export default BookDetails;
