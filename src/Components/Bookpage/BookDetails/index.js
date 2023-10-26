import Review from "./Review";
import ClaimForm from "./ClaimForm";
import ReturnForm from "./ReturnForm";
import ReviewForm from "./ReviewForm";
import "./bookdetails.css";

function BookDetails({ image, title, author, year, pageCount, genre, blurb, reviews, claimed, getBookData, refreshReviewsList }) {
    const totalScore = reviews?.reduce((ratingSum, review) => ratingSum + review.rating, 0);
    const avgScore = totalScore ? totalScore / reviews?.length : 0;

    return (
        <div className="book-details">
            <div className="book-image">
                <img src={image} alt={"Cover of " + title} />
            </div>
            <div className="">
                <h2>{title}</h2>
                <p>{author}</p>
                <p>{year}</p>
                {pageCount && <p>{pageCount} pages</p>}
                <p>Genre: {genre.name}</p>
                <p>
                    <a href="#reviews">{reviews?.length} reviews</a> - {avgScore.toFixed(1)} / 5 stars
                </p>
                {claimed && <p>Claimed by {claimed}</p>}
                {claimed ? <ReturnForm getBookData={getBookData} claimed={claimed} /> : <ClaimForm getBookData={getBookData} />}
                <p>{blurb}</p>
                <h3 id="reviews">Reviews</h3>
                <ReviewForm refreshReviewsList={refreshReviewsList} />
                {reviews?.map((review) => (
                    <Review review={review} key={review.id} />
                ))}
            </div>
        </div>
    );
}

export default BookDetails;
