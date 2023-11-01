import Review from "./Review";
import ClaimForm from "./ClaimForm";
import ReturnForm from "./ReturnForm";
import ReviewForm from "./ReviewForm";
import "./bookdetails.css";
import { useState } from "react";
import ImgLoader from "../../ImgLoader";

function BookDetails({ image, title, author, year, pageCount, genre, blurb, reviews, claimed, getBookData, refreshReviewsList }) {
    const totalScore = reviews?.reduce((ratingSum, review) => ratingSum + review.rating, 0);

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
        <>
            <div className="book-details w-1/2 m-auto flex flex-col md:flex-row">
                <ImgLoader src={image} alt={"Cover of " + title} w="60" h="96" />

                <div className="">
                    <h2 className="text-3xl font-bold underline">{title}</h2>
                    <p>{author}</p>
                    <p>{year}</p>
                    {pageCount && <p>{pageCount} pages</p>}
                    <p>Genre: {genre.name}</p>
                    <p>
                        <a href="#reviews">{reviews?.length} reviews</a> - {avgScore.toFixed(1)} / 5 stars
                    </p>
                    {claimed && <p>Claimed by {claimed}</p>}
                    {claimed ? (
                        <button data-element="return" onClick={toggleReturn}>
                            Return
                        </button>
                    ) : (
                        <button data-element="claim" onClick={toggleClaim}>
                            Claim
                        </button>
                    )}

                    {openReturn && claimed && (
                        <ReturnForm getBookData={getBookData} claimed={claimed} open={openReturn} visibilityToggle={toggleReturn} />
                    )}

                    {openClaim && !claimed && <ClaimForm getBookData={getBookData} open={openClaim} visibilityToggle={toggleClaim} />}

                    <p>{blurb}</p>
                </div>
            </div>
            <div>
                <h3 id="reviews">Reviews</h3>
                <ReviewForm refreshReviewsList={refreshReviewsList} />
                {reviews?.map((review) => (
                    <Review review={review} key={review.id} />
                ))}
            </div>
        </>
    );
}

export default BookDetails;
