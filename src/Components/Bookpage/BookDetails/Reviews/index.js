import "./reviews.css"

function Reviews({ review }) {
    return (
        <div>
            <h4>{review.name}</h4>
            <p>{review.rating}/5 stars</p>
            <p>{review.review}</p>
        </div>
    )
}

export default Reviews
