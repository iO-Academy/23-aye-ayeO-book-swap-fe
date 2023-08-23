import "./bookcard.css"
import { Link } from "react-router-dom"

function BookCard({ id, bookCover, title, author, genre }) {
    return (
        <Link to={"/book/" + id}>
            <div className="bookcard">
                <img src={bookCover} alt={title + " cover"} />
                <h2>{title}</h2>
                <p>{author}</p>
                <p>{genre}</p>
            </div>
        </Link>
    )
}

export default BookCard
