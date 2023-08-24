import "./reviews.css"

function Reviews({ review }) {
    return (
        <>
            <div>
                <p className="reviewer">{review.name}</p>
                <p>{review.rating}/5 stars</p>
                <p>{review.review}</p>
            </div>
        </>
    )
}

export default Reviews
