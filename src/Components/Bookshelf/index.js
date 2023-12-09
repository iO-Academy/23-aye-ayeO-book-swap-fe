import React, { useEffect, useState } from 'react';
import './bookshelf.css';
import BookCard from '../BookCard';
import GenresSelector from './GenresSelector';
import SearchCollection from './SearchCollection';
import { v4 as uuidv4 } from 'uuid';

function Bookshelf({ claimed, scrollPosition, setScrollPosition }) {
    const [bookCollection, setBookCollection] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState('');
    const [searchedString, setSearchedString] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState('-translate-y-full');
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState('');

    // Restore scroll position from state in App.js
    window.scrollTo(0, scrollPosition);

    // Preserve scroll position when bookcard is clicked
    function saveScroll() {
        setScrollPosition(window.scrollY);
    }

    async function getBookData(claimed, selectedGenreId, searchedString, page) {
        try {
            const bookData = await fetch(
                `${process.env.REACT_APP_API_URI}/books?claimed=${claimed}&genre=${selectedGenreId}&search=${searchedString}&page=${page}`,
            );
            const books = await bookData.json();
            setBookCollection(books.data?.data);
            setPageData(books.data);
            if (books.message === 'Books successfully retrieved') {
            }
        } catch (error) {}
    }

    useEffect(() => {
        // fetch(
        //   `${process.env.REACT_APP_API_URI}/books?claimed=${claimed}&genre=${selectedGenreId}&search=${searchedString}`,
        // )
        //   .then((res) => res.json())
        //   .then((books) => {
        //     setBookCollection(books.data?.data);
        //   });

        getBookData(claimed, selectedGenreId, searchedString, page);
    }, [claimed, selectedGenreId, searchedString, currentPage, page]);

    const handleSearchChange = (string) => {
        setSearchedString(string);
        setCurrentPage(1);
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
                className='relative z-20 flex cursor-pointer items-center justify-center gap-1 bg-[#545470] py-4 text-center text-sm font-semibold text-white sm:hidden sm:text-zinc-600'
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
                className={`absolute w-full transform bg-zinc-200 transition sm:relative sm:flex sm:pt-[76px] ${isFilterVisible} sm:translate-y-0`}
                id='filter'
            >
                <div className='m-auto flex w-full max-w-7xl flex-col items-center  justify-between gap-3 p-4 sm:flex-row'>
                    <GenresSelector
                        label='Filter by genre'
                        updateGenre={setSelectedGenreId}
                        isControlled={false}
                        defaultString='Show all categories'
                    />

                    <SearchCollection onSearchChange={handleSearchChange} />
                </div>
            </div>
            <h1>{claimed ? 'Claimed Books' : 'Available Books'}</h1>
            {pageData && (
                <p className='text-center mb-6'>
                    Showing {pageData?.from} - {pageData?.to} out of{' '}
                    {pageData?.total}
                </p>
            )}

            <div className='bookshelf m-auto flex w-full max-w-7xl flex-row flex-wrap justify-center gap-2 p-1 sm:gap-4 sm:p-0'>
                {bookCollection == null && <p>No Books Found</p>}
                {bookCollection?.map((book) => {
                    return (
                        <BookCard
                            id={book.id}
                            bookCover={book.image}
                            title={book.title}
                            author={book.author}
                            genre={book.genre.name}
                            key={uuidv4()}
                            onClick={saveScroll}
                        />
                    );
                })}
            </div>
            {pageData && (
                <div className='flex flex-row justify-center gap-4 my-10'>
                    {/* <button onClick={() => setPage(pageData?.current_page - 1)}>
            Previous
          </button>
          <p>Current page: {pageData?.current_page}</p>
          <button onClick={() => setPage(pageData?.current_page + 1)}>
            Next
          </button> */}
                    {pageData?.links.map((link) => {
                        let page;
                        // page =
                        //     link.label === 'Next &raquo;'
                        //         ? link.label + 1
                        //         : link.label === '&laquo; Previous'
                        //           ? link.label - 1
                        //           : link.label;
                        // console.log(page);

                        if (link.label === 'Next &raquo;') {
                            page = pageData.current_page + 1;
                        } else if (link.label === '&laquo; Previous') {
                            page = pageData.current_page - 1;
                        } else {
                            page = link.label;
                        }

                        return (
                            <button
                                className={`${
                                    link.active ? 'active-pagge-button' : ''
                                }`}
                                key={uuidv4()}
                                onClick={() => setPage(page)}
                            >
                                {link.label
                                    .replace(/&raquo;/g, '\u00BB')
                                    .replace(/&laquo;/g, '\u00AB')}
                            </button>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default Bookshelf;
