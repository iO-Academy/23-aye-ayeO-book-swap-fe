import React, { useEffect, useState } from 'react';
import './bookshelf.css';
import BookCard from '../BookCard';
import GenresSelector from './GenresSelector';
import SearchCollection from './SearchCollection';

function Bookshelf({ claimed }) {
    const [bookCollection, setBookCollection] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState('');
    const [searchedString, setSearchedString] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState('-translate-y-full');

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

    function showFilter() {
        isFilterVisible === '-translate-y-full'
            ? setIsFilterVisible('translate-y-0')
            : setIsFilterVisible('-translate-y-full');
    }

    return (
        <>
            <div
                onClick={showFilter}
                className='sm:hidden text-center bg-rose-100 py-4 cursor-pointer text-zinc-600 font-semibold text-sm flex justify-center items-center gap-1 z-20 relative'
            >
                <span className='material-symbols-outlined'>filter_list</span>
                {' Filter'}
            </div>
            <div
                className={`bg-zinc-200 sm:pt-[68px] sm:flex transition absolute sm:relative transform w-full rounded-b-lg ${isFilterVisible} sm:translate-y-0`}
                id='filter'
            >
                <div className='flex p-4 gap-3  justify-between items-center m-auto w-full max-w-7xl flex-col sm:flex-row '>
                    <GenresSelector onGenreChangeID={handleGenreChange} label='Filter by genre ' />
                    <SearchCollection onSearchChange={handleSearchChange} />
                </div>
            </div>
            <h1>{claimed ? 'Claimed Books' : 'Available Books'}</h1>
            <div className='bookshelf w-full max-w-7xl m-auto flex flex-row flex-wrap sm:gap-4 gap-2 p-1 justify-center sm:p-0'>
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
