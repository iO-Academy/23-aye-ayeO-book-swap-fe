import React, { useEffect, useState } from 'react';
import './bookshelf.css';
import BookCard from '../BookCard';
import GenresSelector from './GenresSelector';

function Bookshelf({ claimed }) {
    const [bookCollection, setBookCollection] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState(''); // State to hold the selected genre

    useEffect(() => {
        fetch(
            `http://localhost:8000/api/books?claimed=${claimed}&genre=${selectedGenreId}`
        )
            .then((res) => res.json())
            .then((books) => {
                setBookCollection(books.data);
            });
    }, [claimed, selectedGenreId]);

    // Function to handle changes in the selected genre
    const handleGenreChange = (genre) => {
        setSelectedGenreId(genre);
    };

    return (
        <div>
            <GenresSelector onGenreChangeID={handleGenreChange} />{' '}
            {/* Pass the function to update selectedGenre state */}
            <div className='bookshelf'>
                {bookCollection == null && <p>No Books Found</p>}
                {bookCollection?.map((book) => {
                    return (
                        <BookCard
                            id={book.id}
                            bookCover={book.image}
                            title={book.title}
                            author={book.author}
                            genre={book.genre.name}
                            key={book.title}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Bookshelf;
