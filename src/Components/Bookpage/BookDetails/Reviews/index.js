import './reviews.css'

function Reviews( {reviews} ) {
    return (
        <>
            <h3>Reviews</h3>
            <div>
                {reviews.map((review) =>
                <div>
                    <p className="reviewer">{review.name}</p>
                    <p>{review.rating}/5 stars</p>
                    <p>{review.review}</p>
                </div>
                )}
            </div>
        </>
    )
}

export default Reviews