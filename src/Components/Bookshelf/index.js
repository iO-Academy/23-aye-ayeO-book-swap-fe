import React, { useContext, useEffect, useState } from 'react';
import './bookshelf.css';
import BookCard from '../BookCard';
import SearchCollection from './SearchCollection';
import { v4 as uuidv4 } from 'uuid';
import { scrollToTop } from '../../utilities.js';
import GenresSelector from './GenresSelector/index.js';
import { Context } from '../../Context.js';

function Bookshelf({ claimed }) {
    const [bookCollection, setBookCollection] = useState([]);
    const [isFilterVisible, setIsFilterVisible] = useState('-translate-y-full');
    const [pageData, setPageData] = useState('');

    const {
        params,
        navigate,
        setPaginationState,
        paginationState,
        genreId,
        searchInput,
    } = useContext(Context);

    const searchString = paginationState.search;
    const catSelection = paginationState.category;

    useEffect(() => {
        // Update the URL query parameters
        paginationState.page > 1
            ? params.set('page', paginationState.page)
            : params.delete('page');
        paginationState.search
            ? params.set('search', paginationState.search)
            : params.delete('search');
        paginationState.category > 0
            ? params.set('category', paginationState.category)
            : params.delete('category');

        navigate(`?${params.toString()}`);
        getBookData(claimed, paginationState.category, paginationState.search);
    }, [paginationState, claimed]);

    async function getBookData(claimed, selectedGenreId, searchedString) {
        try {
            const bookData = await fetch(
                `${process.env.REACT_APP_API_URI}/books?claimed=${claimed}&genre=${selectedGenreId}&search=${searchedString}&page=${paginationState.page}`,
            );
            const books = await bookData.json();
            setBookCollection(books.data?.data);
            setPageData(books.data);
            scrollToTop();
        } catch (error) {}
    }

    const handleCategoryChange = (newCategory) => {
        setPaginationState({
            ...paginationState,
            page: 1,
            category: newCategory,
        });
    };

    const handleSearchChange = (string) => {
        setPaginationState({
            ...paginationState,
            page: 1,
            search: string,
        });
    };

    function getPageFromURL(url) {
        const pageLink = new URLSearchParams(new URL(url).search);
        return pageLink.get('page');
    }

    function showFilter() {
        isFilterVisible === '-translate-y-full'
            ? setIsFilterVisible('translate-y-0')
            : setIsFilterVisible('-translate-y-full');
    }

    return (
        <div className='bg-white min-h-[100vh] pb-10 relative z-10'>
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
                    <path d='M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z' />
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
                        updateGenre={handleCategoryChange}
                        isControlled={false}
                        defaultString='Show all categories'
                        ref={genreId}
                        catSelection={catSelection}
                    />

                    <SearchCollection
                        onSearchChange={handleSearchChange}
                        ref={searchInput}
                        searchString={searchString}
                    />
                </div>
            </div>
            <h1 className='pb-3'>{claimed ? 'Claimed' : 'Available'}</h1>
            {pageData && (
                <p className='text-center mb-12 text-sm'>
                    {pageData?.from} - {pageData?.to} of {pageData?.total} books
                </p>
            )}
            <div className='bookshelf m-auto flex w-full max-w-7xl flex-row flex-wrap justify-center gap-2 p-1 sm:gap-4 sm:p-0'>
                {bookCollection == null && (
                    <p className='text-center text-xl text-zinc-700'>
                        No books found
                    </p>
                )}
                {bookCollection?.map((book) => {
                    return (
                        <BookCard
                            id={book.id}
                            bookCover={book.image}
                            title={book.title}
                            author={book.author}
                            genre={book.genre.name}
                            key={book.id + book.title}
                        />
                    );
                })}
            </div>
            {pageData && (
                <div className='flex flex-row justify-center gap-4 my-10 items-center'>
                    {pageData.total / pageData.per_page > 1 &&
                        pageData?.links.map((link) => {
                            return (
                                <div
                                    tabIndex={link.url && 0}
                                    className={`justify-center items-center flex p-1 text-[#343450] cursor-pointer ${
                                        link.active ? 'active-page-button' : ''
                                    } ${
                                        !link.url &&
                                        'disabled !text-zinc-500 drop-shadow-xl'
                                    }`}
                                    key={uuidv4()}
                                    onClick={() => {
                                        setPaginationState({
                                            ...paginationState,
                                            page: getPageFromURL(link.url),
                                        });
                                        navigate(
                                            `?page=${getPageFromURL(link.url)}`,
                                        );
                                    }}
                                >
                                    {link.label
                                        .replace(/&raquo;/g, '\u00BB')
                                        .replace(/&laquo;/g, '\u00AB')}
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
}

export default Bookshelf;
