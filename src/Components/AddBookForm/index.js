import React, { useContext, useState } from 'react';
import GenresSelector from '../Bookshelf/GenresSelector/';
import { Context } from '../../Context';
import {
    displayErrorMessage,
    isValidUrl,
    isValidYear,
    isValidISBN,
    capitaliseTitle,
    removeQuotes,
    extractYear,
    limitString,
    scrollToTop,
} from '../../utilities';

function AddBookForm() {
    // AddBookForm Fields States
    const [remoteSuccess, setRemoteSuccess] = useState(false);
    const [isbn, setISBN] = useState('');
    const [goodreadsLink, setGoodreadsLink] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [pageCount, setPageCount] = useState('');
    const [year, setYear] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [blurb, setBlurb] = useState('');

    // Error States
    const [isbnError, setIsbnError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [authorError, setAuthorError] = useState('');
    const [genreError, setGenreError] = useState('');
    const [pageCountError, setPageCountError] = useState(false);
    const [yearError, setYearError] = useState(false);
    const [imageUrlError, setImageUrlError] = useState(false);
    const [blurbError, setBlurbError] = useState(false);

    const { setAlert } = useContext(Context);

    // State setters for form values + form reset
    function changeISBN(e) {
        resetForm();
        setISBN(e.target.value);
        setIsbnError('');
        setRemoteSuccess(false);
        const isbn = e.target.value;
        isValidISBN(isbn) && getBookData(isbn);
    }
    function changeTitle(e) {
        setTitle(e.target.value);
        setTitleError(false);
    }
    function changeAuthor(e) {
        setAuthor(e.target.value);
        setAuthorError(false);
    }

    function changeGenre(string) {
        setGenre(string);
        setGenreError(false);
    }

    function changePageCount(e) {
        setPageCount(e.target.value);
        setPageCountError(false);
    }

    function changeYear(e) {
        setYear(e.target.value);
        setYearError(false);
    }

    function changeImageUrl(e) {
        setImageUrl(e.target.value);
        setImageUrlError(false);
    }

    function changeBlurb(e) {
        setBlurb(e.target.value);
        setBlurbError(false);
    }

    // Validate form
    function validateForm(e) {
        e.preventDefault();

        let titleError = true; // Error!
        let authorError = true;
        let genreError = true;
        let yearError = true;
        let pageCountError = true;
        let imageUrlError = true;
        let blurbError = true;

        // Validation Rules
        // title
        if (title.length <= 0 || title.length > 255) {
            setTitleError(true);
        } else {
            setTitleError(false);
            titleError = false;
        }

        // author
        if (author.length <= 0 || author.length > 255) {
            setAuthorError(true);
        } else {
            setAuthorError(false);
            authorError = false;
        }

        // genre
        if (genre <= 0 || isNaN(genre)) {
            setGenreError(true);
            setGenre(0);
        } else {
            setGenreError(false);
            genreError = false;
        }

        // year
        if (year && !isValidYear(year)) {
            setYearError(true);
        } else {
            setYearError(false);
            yearError = false;
        }

        // page count
        if (pageCount && (isNaN(pageCount) || pageCount <= 0)) {
            setPageCountError(true);
        } else {
            setPageCountError(false);
            pageCountError = false;
        }

        // image url
        if (imageUrl && !isValidUrl(imageUrl)) {
            setImageUrlError(true);
        } else {
            setImageUrlError(false);
            imageUrlError = false;
        }

        // blurb
        if (blurb && blurb.length > 255) {
            setBlurbError(true);
        } else {
            setBlurbError(false);
            blurbError = false;
        }

        // If no errors...
        if (
            !titleError &&
            !authorError &&
            !genreError &&
            !pageCountError &&
            !yearError &&
            !imageUrlError &&
            !blurbError
        ) {
            handleSubmit(e);
            scrollToTop();
        } else {
            scrollToTop();
        }
    }

    // Fetch bookData  from Open Library
    async function getBookData(isbn) {
        console.log(`isbn: ${isbn}`);
        try {
            const isbnRes = await fetch(
                `https://openlibrary.org/isbn/${isbn}.json`
            );

            if (!isbnRes.ok) {
                throw new Error('Network response was not ok.');
            }

            const book = await isbnRes.json();

            const workRes = await fetch(
                `https://openlibrary.org${book.works[0].key}.json`
            );

            if (!workRes.ok) {
                throw new Error('Network response was not ok.');
            }

            const work = await workRes.json();

            const authorRes = await fetch(
                `https://openlibrary.org${work.authors[0].author.key}.json`
            );
            if (!authorRes.ok) {
                throw new Error('Network response was not ok.');
            }

            const author = await authorRes.json();

            if (author && author.name) setAuthor(author.name.trim());

            if (book) {
                setRemoteSuccess(true);

                if (
                    book.identifiers &&
                    book.identifiers.goodreads &&
                    book.identifiers.goodreads[0]
                )
                    setGoodreadsLink(
                        `https://www.goodreads.com/book/show/${book.identifiers.goodreads[0]}`
                    );

                const bookCovers = book.covers || [];
                const workCovers = work.covers || [];

                const cover =
                    (bookCovers.length > 0 && bookCovers[0]) ||
                    (workCovers.length > 0 && workCovers[0]);

                if (cover) {
                    setImageUrl(
                        `https://covers.openlibrary.org/b/id/${cover}-L.jpg`
                    );
                }

                work.title && setTitle(capitaliseTitle(work.title));

                book.publish_date && setYear(extractYear(book.publish_date));
                work.first_publish_date &&
                    setYear(extractYear(work.first_publish_date));

                book.pagination && setPageCount(book.pagination);
                book.number_of_pages && setPageCount(book.number_of_pages);

                if (work.description && work.description.value) {
                    setBlurb(
                        limitString(removeQuotes(work.description.value), 255)
                    );
                } else if (work.description) {
                    setBlurb(limitString(removeQuotes(work.description), 255));
                } else if (book.description && book.description.value) {
                    setBlurb(
                        limitString(removeQuotes(book.description.value), 255)
                    );
                }
            }
        } catch (error) {
            setIsbnError('No book found');
            console.error('Error fetching book data: ' + error);
        }
    }

    async function handleSubmit() {
        try {
            const requestBody = {};

            // Required values
            requestBody.title = title;
            requestBody.author = author;
            requestBody.genre_id = genre;

            // Optional values
            if (blurb) {
                requestBody.blurb = blurb;
            }

            requestBody.image =
                imageUrl ||
                `https://via.placeholder.com/600x840.png/efefef?text=Book+Cover+Coming+Soon`;

            if (year) {
                requestBody.year = year;
            }

            const res = await fetch('http://localhost:8000/api/books', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await res.json();

            if (res.ok) {
                setAlert(`"${title}" added`);
                resetForm();
            } else {
                const errorContainer =
                    document.getElementById('error-container');
                errorContainer.innerHTML = Object.keys(data.errors)
                    .map((error) => {
                        const serverError = data.errors[error][0];
                        return `${serverError}`;
                    })
                    .join('<br>');
                throw new Error(data.message);
            }
        } catch (error) {
            // Log errors
        }
    }

    function resetForm() {
        setISBN('');
        setGoodreadsLink('');
        setRemoteSuccess(false);
        setTitle('');
        setAuthor('');
        setGenre('');
        setYear('');
        setPageCount('');
        setImageUrl('');
        setBlurb('');
        setIsbnError('');
    }

    return (
        <div className='pt-24'>
            <div className='form-container md:w-2/3 lg:w-1/2 !pt-5 !mt-0 relative'>
                <form
                    onSubmit={validateForm}
                    className='flex flex-col gap-4 w-3/4 '
                >
                    <h1>Add New Book</h1>
                    <div
                        className={`p-8 rounded-2xl border-4 
                    ${
                        isValidISBN(isbn) &&
                        !remoteSuccess &&
                        !isbnError &&
                        'bg-gradient-to-r from-orange-100 via-rose-300 to-orange-100 background-animate'
                    }
                    ${remoteSuccess && 'success-isbn'}
                    ${
                        isbnError
                            ? 'bg-rose-200 border-rose-300'
                            : 'border-zinc-300'
                    }`}
                    >
                        <label htmlFor='title' className='text-center'>
                            Search by ISBN
                        </label>
                        <input
                            type='text'
                            id='isbn'
                            className='form-text'
                            value={isbn}
                            onChange={changeISBN}
                        ></input>
                        {isbnError &&
                            !title &&
                            displayErrorMessage(
                                'Oops, book not found. Please fill in the form below manually.'
                            )}
                        {goodreadsLink && (
                            <a
                                href={goodreadsLink}
                                target='_blank'
                                rel='noreferrer'
                                className=' text-xs text-green-800'
                            >
                                Check "{title}" on{' '}
                                <span className='font-bold'>Goodreads</span>
                            </a>
                        )}
                    </div>
                    <div>
                        <label htmlFor='title'>
                            Title <span className='text-rose-700'>*</span>
                        </label>
                        <br />
                        <input
                            type='text'
                            id='title'
                            name='title'
                            value={title}
                            onChange={changeTitle}
                            className={
                                titleError
                                    ? 'input-error form-text'
                                    : 'form-text'
                            }
                        />
                        {titleError && displayErrorMessage('Title is required')}
                    </div>

                    <div>
                        <label htmlFor='author'>
                            Author <span className='text-rose-700'>*</span>
                        </label>
                        <br />

                        <input
                            type='text'
                            id='author'
                            name='author'
                            value={author}
                            onChange={changeAuthor}
                            className={
                                authorError
                                    ? 'input-error form-text'
                                    : ' form-text'
                            }
                        />
                        {authorError &&
                            displayErrorMessage('Author is required')}
                    </div>

                    <div>
                        <label htmlFor='genreId'>
                            Genre <span className='text-rose-700'>*</span>
                        </label>
                        <GenresSelector
                            onGenreChangeID={changeGenre}
                            className={genreError ? 'select-error' : 'null'}
                            defaultString='Select'
                            isDisabled={true}
                        />
                        {genreError &&
                            displayErrorMessage('Genre selection is required')}
                    </div>

                    <div>
                        <label htmlFor='pageCount'>Page count</label>
                        <br />
                        <input
                            type='number'
                            id='pageCount'
                            name='pageCount'
                            value={pageCount}
                            onChange={changePageCount}
                            className={
                                pageCountError
                                    ? 'input-error form-text'
                                    : 'form-text'
                            }
                        />
                        {pageCountError &&
                            displayErrorMessage(
                                'Page count has to be more than 0'
                            )}
                    </div>

                    <div>
                        <label htmlFor='year'>Year</label>
                        <br />
                        <input
                            type='number'
                            id='year'
                            name='year'
                            value={year}
                            onChange={changeYear}
                            className={
                                yearError
                                    ? 'input-error form-text'
                                    : ' form-text'
                            }
                        />
                        {yearError &&
                            displayErrorMessage('Incorrect year format')}
                    </div>
                    {imageUrl && (
                        <div>
                            <img
                                src={imageUrl}
                                alt={`${title} cover`}
                                width='200px'
                                className='mx-auto rounded-md'
                            ></img>
                        </div>
                    )}
                    <div>
                        <label htmlFor='image'>Image URL</label>
                        <br />
                        <input
                            type='text'
                            id='image'
                            name='image'
                            value={imageUrl}
                            onChange={changeImageUrl}
                            className={
                                imageUrlError
                                    ? 'input-error form-text'
                                    : 'form-text'
                            }
                        />
                        {imageUrlError && displayErrorMessage('Invalid URL')}
                    </div>

                    <div>
                        <label htmlFor='blurb'>Blurb</label>
                        <br />
                        <textarea
                            id='blurb'
                            rows='5'
                            maxLength='255'
                            value={blurb}
                            onChange={changeBlurb}
                            className={
                                blurbError
                                    ? 'input-error form-text'
                                    : 'form-text'
                            }
                        ></textarea>
                        {blurbError &&
                            displayErrorMessage(
                                'Must be less than 255 characters'
                            )}
                    </div>
                    <div id='error-container' className='error'></div>
                    <input
                        type='submit'
                        value='Add Book'
                        className='button py-3'
                    />
                </form>
            </div>
        </div>
    );
}

export default AddBookForm;
