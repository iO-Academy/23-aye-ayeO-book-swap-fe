import React, { useEffect, useState } from 'react';
import './bookshelf.css';
import BookCard from '../BookCard';

function Bookshelf({ claimed }) {
    const [bookCollection, setBookCollection] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/books?claimed=' + claimed)
            .then((res) => res.json())
            .then((books) => {
                setBookCollection(books.data);
            });
    }, [claimed]);

    return (
        <div className='bookshelf'>
            {bookCollection.length < 1 && <p>No Books Found</p>}
            {bookCollection.map((book) => {
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
    );
}

export default Bookshelf;
