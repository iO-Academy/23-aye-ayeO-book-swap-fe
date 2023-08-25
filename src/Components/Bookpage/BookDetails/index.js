import ClaimForm from './ClaimForm'
import ReturnForm from './ReturnForm'
import ReviewForm from './ReviewForm'
import './bookdetails.css'

function BookDetails({
    image,
    title,
    author,
    year,
    pageCount,
    genre,
    blurb,
    claimed,
    getBookData,
}) {
    return (
        <div className='book-details'>
            <div className='book-image'>
                <img src={image} alt={'Cover of ' + title} />
            </div>
            <div className=''>
                <h2>{title}</h2>
                <p>{author}</p>
                <p>{year}</p>
                <p>{pageCount} pages</p>
                <p>Genre: {genre.name}</p>
                {claimed && <p>Claimed by {claimed}</p>}
                {claimed ? (
                    <ReturnForm getBookData={getBookData} claimed={claimed} />
                ) : (
                    <ClaimForm getBookData={getBookData} />
                )}
                <p>{blurb}</p>
                <ReviewForm />
            </div>
        </div>
    )
}

export default BookDetails
