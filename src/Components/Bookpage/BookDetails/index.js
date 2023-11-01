import Review from './Review';
import ClaimForm from './ClaimForm';
import ReturnForm from './ReturnForm';
import ReviewForm from './ReviewForm';
import './bookdetails.css';
import { useState } from 'react';
import ImgLoader from '../../ImgLoader';

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
    const totalScore = reviews?.reduce(
        (ratingSum, review) => ratingSum + review.rating,
        0
    );

    const avgScore = totalScore ? totalScore / reviews?.length : 0;

    const [openClaim, setOpenClaim] = useState(false);
    const [openReturn, setOpenReturn] = useState(false);

    function toggleClaim() {
        openClaim ? setOpenClaim(false) : setOpenClaim(true);
    }

    function toggleReturn() {
        openReturn ? setOpenReturn(false) : setOpenReturn(true);
    }

    return (
        <div className='w-full max-w-7xl m-auto bg-zinc-100'>
            <div className='book-details w-full m-auto p-4 flex flex-col md:flex-row justify-center gap-4'>
                <div>
                    <ImgLoader
                        src={image}
                        alt={'Cover of ' + title}
                        w='60'
                        h='96'
                    />
                </div>
                <div className='w-[600px] p-2 flex flex-col gap-2'>
                    <h1 className='text-left p-0'>{title}</h1>
                    <p>{author}</p>
                    <p>
                        <a href='#reviews'>{reviews?.length} reviews</a> -{' '}
                        {avgScore.toFixed(1)} / 5 stars
                    </p>
                    <p>{year}</p>
                    {pageCount && <p>{pageCount} pages</p>}
                    <p>Genre: {genre.name}</p>
                    {claimed && <p>Claimed by {claimed}</p>}
                    {claimed ? (
                        <button
                            data-element='return'
                            onClick={toggleReturn}
                            className='button py-2 w-max'
                        >
                            Return
                        </button>
                    ) : (
                        <button
                            data-element='claim'
                            onClick={toggleClaim}
                            className='button py-2 w-max'
                        >
                            Claim
                        </button>
                    )}

                    {openReturn && claimed && (
                        <ReturnForm
                            getBookData={getBookData}
                            claimed={claimed}
                            open={openReturn}
                            visibilityToggle={toggleReturn}
                        />
                    )}

                    {openClaim && !claimed && (
                        <ClaimForm
                            getBookData={getBookData}
                            open={openClaim}
                            visibilityToggle={toggleClaim}
                        />
                    )}

                    <p>{blurb}</p>
                </div>
            </div>
            <div className='w-1/2 m-auto'>
                <h2 className='text-center' id='reviews'>
                    Reviews
                </h2>
                {reviews?.map((review) => (
                    <Review review={review} key={review.id} />
                ))}
                <ReviewForm refreshReviewsList={refreshReviewsList} />
            </div>
        </div>
    );
}

export default BookDetails;
