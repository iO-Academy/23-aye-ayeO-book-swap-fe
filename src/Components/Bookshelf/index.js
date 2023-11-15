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
            <div className='bg-zinc-200 pt-20'>
                <div className='flex p-4 gap-3  justify-between items-center m-auto w-full max-w-7xl'>
                    <GenresSelector
                        onGenreChangeID={handleGenreChange}
                        label='Filter by genre '
                    />
                    <SearchCollection onSearchChange={handleSearchChange} />
                </div>
            </div>
            <h1>{claimed ? 'Claimed Books' : 'Available Books'}</h1>
            <div className='bookshelf w-full max-w-7xl m-auto flex flex-row flex-wrap sm:gap-4 gap-2  p-4 justify-center sm:p-0'>
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
