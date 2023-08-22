import './bookcard.css';

function BookCard({ bookCover, title, author, genre }) {
    return (
        <div className='bookcard'>
            <img src={bookCover} alt='' />
            <h2>{title}</h2>
            <p>{author}</p>
            <p>{genre}</p>
        </div>
    );
}

export default BookCard;
