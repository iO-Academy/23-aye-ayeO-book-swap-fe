import { useState } from "react"
import Reviews from "./Reviews"
import "./bookdetails.css"

function BookDetails({ image, title, author, year, pageCount, genre, blurb, reviews }) {
    const totalScore = reviews.reduce((ratingSum, review) => ratingSum + review.rating, 0)
    const avgScore = totalScore / reviews.length

    return (
        <div className="book-details">
            <div className="book-image">
                <img src={image} alt={"Cover of " + title} />
            </div>
            <div className="">
                <h2>{title}</h2>
                <p>{author}</p>
                <p>{year}</p>
                <p>{pageCount} pages</p>
                <p>Genre: {genre.name}</p>
                <p>
                    <a href="#reviews">{reviews.length} reviews</a> - {avgScore.toFixed(1)} / 5 stars
                </p>
                <p>{blurb}</p>
                <h3 id="reviews">Reviews</h3>
                {reviews.map((review) => (
                    <Reviews review={review} />
                ))}
            </div>
        </div>
    )
}

export default BookDetails
