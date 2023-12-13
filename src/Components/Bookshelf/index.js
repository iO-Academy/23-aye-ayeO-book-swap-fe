import React, { useEffect, useState } from 'react';
import './bookshelf.css';
import BookCard from '../BookCard';
import GenresSelector from './GenresSelector';
import SearchCollection from './SearchCollection';
import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Bookshelf({ claimed, scrollPosition, setScrollPosition }) {
    const [bookCollection, setBookCollection] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState('');
    const [searchedString, setSearchedString] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState('-translate-y-full');
    const [pageData, setPageData] = useState('');

    const navigate = useNavigate();

    const updatePageQueryParam = (newPageValue) => {
        const currentPage = window.location.search;
        const paramsPage = new URLSearchParams(currentPage);
        // Update or set the value of the "page" parameter
        paramsPage.set('page', newPageValue);

        // Replace the current URL with the updated query parameters
        navigate({
            pathname: window.location.pathname,
            search: `?${paramsPage.toString()}`,
        });
    };
    // Use URL query params to fetch page
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    let pageNumber = params.get('page');

    // Restore scroll position from state in App.js
    window.scrollTo(0, scrollPosition);

    // Preserve scroll position when bookcard is clicked
    function saveScroll() {
        setScrollPosition(window.scrollY);
    }

    async function getBookData(claimed, selectedGenreId, searchedString, page) {
        try {
            const bookData = await fetch(
                `${process.env.REACT_APP_API_URI}/books?claimed=${claimed}&genre=${selectedGenreId}&search=${searchedString}&page=${pageNumber}`,
            );
            const books = await bookData.json();
            setBookCollection(books.data?.data);
            setPageData(books.data);
            if (books.message === 'Books successfully retrieved') {
            }
        } catch (error) {}
    }

    useEffect(() => {
        getBookData(claimed, selectedGenreId, searchedString, pageNumber);
    }, [claimed, selectedGenreId, searchedString, pageNumber]);

    useEffect(() => {
        // Reset page to start results from page 1 instead
        if (params.get('page') > 1) {
            updatePageQueryParam('');
        }
    }, [selectedGenreId]);

    const handleSearchChange = (string) => {
        setSearchedString(string);
        string.length > 2 && pageNumber > 1 && updatePageQueryParam('');
    };

    function showFilter() {
        setScrollPosition(0);
        isFilterVisible === '-translate-y-full'
            ? setIsFilterVisible('translate-y-0')
            : setIsFilterVisible('-translate-y-full');
    }

    function getPageFromURL(url) {
        const pageLink = new URLSearchParams(new URL(url).search);
        return pageLink.get('page');
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
                        updateGenre={setSelectedGenreId}
                        isControlled={false}
                        defaultString='Show all categories'
                    />

                    <SearchCollection onSearchChange={handleSearchChange} />
                </div>
            </div>
            <h1 className='pb-3'>{claimed ? 'Claimed' : 'Available'}</h1>
            {pageData && (
                <p className='text-center mb-12 text-sm'>
                    {pageData?.from} - {pageData?.to} of {pageData?.total} books
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
                            key={book.id + book.title}
                            onClick={saveScroll}
                        />
                    );
                })}
            </div>
            {pageData && (
                <div className='flex flex-row justify-center gap-4 my-10 items-center'>
                    {pageData.total / pageData.per_page > 1 &&
                        pageData?.links.map((link) => {
                            return (
                                <Link
                                    to={
                                        link.url &&
                                        `?page=${getPageFromURL(link.url)}`
                                    }
                                    className={`justify-center items-center flex p-1 text-[#343450] ${
                                        link.active ? 'active-page-button' : ''
                                    } ${
                                        !link.url &&
                                        'disabled !text-zinc-400 drop-shadow-xl'
                                    }`}
                                    key={uuidv4()}
                                >
                                    {link.label
                                        .replace(/&raquo;/g, '\u00BB')
                                        .replace(/&laquo;/g, '\u00AB')}
                                </Link>
                            );
                        })}
                </div>
            )}
        </div>
    );
}

export default Bookshelf;
