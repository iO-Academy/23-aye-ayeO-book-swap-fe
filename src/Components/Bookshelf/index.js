import React, { useEffect, useState } from 'react';
import './bookshelf.css';
import BookCard from '../BookCard';
import GenresSelector from './GenresSelector';
import SearchCollection from './SearchCollection';

function Bookshelf({ claimed, scrollPosition, setScrollPosition }) {
    const [bookCollection, setBookCollection] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState('');
    const [searchedString, setSearchedString] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState('-translate-y-full');
    const [genre, setGenre] = useState('');

    // Restore scroll position from state in App.js
    window.scrollTo(0, scrollPosition);

    // Preserve scroll position when bookcard is clicked
    function saveScroll() {
        setScrollPosition(window.scrollY);
    }

    useEffect(() => {
        // selectedGenreId === 0 && setSelectedGenreId("");
        fetch(
            `${process.env.REACT_APP_API_URI}/books?claimed=${claimed}&genre=${selectedGenreId}&search=${searchedString}`
        )
            .then((res) => res.json())
            .then((books) => {
                setBookCollection(books.data);
            });
    }, [claimed, selectedGenreId, searchedString]);

    const handleGenreChange = (genre) => {
        setSelectedGenreId(genre);
    };

    console.log('Genre: ' + genre);
    console.log('GenreID: ' + selectedGenreId);

    const handleSearchChange = (string) => {
        setSearchedString(string);
    };

    function showFilter() {
        setScrollPosition(0);
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
                <svg
                    onClick={showFilter}
                    xmlns='http://www.w3.org/2000/svg'
                    height='24'
                    viewBox='0 -960 960 960'
                    width='24'
                    fill='currentColor'
                >
                    <path d='M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z' />
                </svg>
                {' Filter'}
            </div>
            <div
                className={`bg-zinc-200 sm:pt-[68px] sm:flex transition absolute sm:relative transform w-full rounded-b-lg ${isFilterVisible} sm:translate-y-0`}
                id='filter'
            >
                <div className='flex p-4 gap-3  justify-between items-center m-auto w-full max-w-7xl flex-col sm:flex-row '>
                    <GenresSelector
                        onGenreChangeID={handleGenreChange}
                        label='Filter by genre'
                        setGenreId={setSelectedGenreId}
                        // selectedGenre={genre}
                    />
                    {/* <GenresSelector
                                    onGenreChangeID={changeGenre}
                                    className={genreError ? 'select-error' : null}
                                    defaultString='Select'
                                    isDisabled={true}
                                    selectedGenre={genre}
                                    setGenreId={setGenreId}
                                /> */}

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
                            onClick={saveScroll}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default Bookshelf;
