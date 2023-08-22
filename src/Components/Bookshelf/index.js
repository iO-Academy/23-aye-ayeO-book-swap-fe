import React, { useEffect, useState } from 'react';
import './bookshelf.css';
import BookCard from '../BookCard';

function Bookshelf() {
    const [bookCollection, setBookCollection] = useState([]);

    useEffect(() => {
        fetch('https://book-swap-api.dev.io-academy.uk/api/books')
            .then((res) => res.json())
            .then((books) => {
                setBookCollection(books.data);
            });
    }, []);

    return (
        <div className='bookshelf'>
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
