import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookDetails from "./BookDetails";

function Bookpage() {
    const { id } = useParams();
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [pageCount, setPageCount] = useState("");
    const [genre, setGenre] = useState("");
    const [blurb, setBlurb] = useState("");
    const [error, setError] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [claimed, setClaimed] = useState(null);
    const [refreshReviews, setRefreshReviews] = useState(false);

    async function getBookData() {
        try {
            const response = await fetch("http://localhost:8000/api/books/" + id);
            const book = await response.json();

            if (book.message === "Book successfully found") {
                setImage(book.data.image);
                setTitle(book.data.title);
                setAuthor(book.data.author);
                setYear(book.data.year);
                setPageCount(book.data.page_count);
                setGenre(book.data.genre);
                setBlurb(book.data.blurb);
                setReviews(book.data.reviews);
                setClaimed(book.data.claimed_by_name);
            } else {
                throw new Error(book.message);
            }
        } catch (error) {
            console.error("Error fetching book data:", error.message);
            setError(error.message);
        }
    }

    useEffect(() => {
        getBookData();
    }, [refreshReviews]);

    // Triggered in ReviewForm (through BookDetails)
    // Upon new review created > success msg (from the server)
    function refreshReviewsList() {
        setRefreshReviews(true);
    }

    return (
        <div className="page">
            {error ? (
                <p>{error}</p>
            ) : (
                <BookDetails
                    image={image}
                    title={title}
                    author={author}
                    year={year}
                    pageCount={pageCount}
                    genre={genre}
                    blurb={blurb}
                    reviews={reviews.slice().reverse()}
                    claimed={claimed}
                    getBookData={getBookData}
                    refreshReviewsList={refreshReviewsList}
                />
            )}
        </div>
    );
}

export default Bookpage;
