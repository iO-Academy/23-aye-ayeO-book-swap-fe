import Reviews from "./Reviews"
import "./bookdetails.css"

function BookDetails({ image, title, author, year, pageCount, genre, blurb, reviews }) {
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
                <p>{blurb}</p>
                <Reviews reviews={reviews} />
            </div>
        </div>
    )
}

export default BookDetails
