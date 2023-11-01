import React, { useEffect, useState } from 'react';
import './bookshelf.css';
import BookCard from '../BookCard';
import GenresSelector from './GenresSelector';
import SearchCollection from './SearchCollection';

function Bookshelf({ claimed }) {
    const [bookCollection, setBookCollection] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState('');
    const [searchedString, setSearchedString] = useState('');

    useEffect(() => {
        // selectedGenreId === 0 && setSelectedGenreId("");
        fetch(
            `http://localhost:8000/api/books?claimed=${claimed}&genre=${selectedGenreId}&search=${searchedString}`
        )
            .then((res) => res.json())
            .then((books) => {
                setBookCollection(books.data);
            });
    }, [claimed, selectedGenreId, searchedString]);

    const handleGenreChange = (genre) => {
        setSelectedGenreId(genre);
    };

    const handleSearchChange = (string) => {
        setSearchedString(string);
    };

    return (
        <>
            <div className='flex p-4 gap-3 bg-slate-200 justify-between items-center'>
                <GenresSelector
                    onGenreChangeID={handleGenreChange}
                    label='Filter by genre '
                />
                <SearchCollection onSearchChange={handleSearchChange} />
            </div>
            <div className='bookshelf flex flex-row flex-wrap gap-4 p-4 justify-center'>
                {bookCollection == null && <p>No Books Found</p>}
                {bookCollection?.map((book) => {
                    return (
                        <BookCard
                            id={book.id}
                            bookCover={book.image}
                            title={book.title}
                            author={book.author}
                            genre={book.genre.name}
                            key={book.title + book.id}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default Bookshelf;
