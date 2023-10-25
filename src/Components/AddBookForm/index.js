import React, { useState } from 'react';
import GenresSelector from '../Bookshelf/GenresSelector/';
import { Link } from 'react-router-dom';

function AddBookForm() {
    // AddBookForm Fields States
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [pageCount, setPageCount] = useState('');
    const [year, setYear] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [blurb, setBlurb] = useState('');

    // Error States
    const [titleError, setTitleError] = useState(false);
    const [authorError, setAuthorError] = useState(false);
    const [genreError, setGenreError] = useState(false);
    const [pageCountError, setPageCountError] = useState(false);
    const [yearError, setYearError] = useState(false);
    const [imageUrlError, setImageUrlError] = useState(false);
    const [blurbError, setBlurbError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    // State setters for form values + form reset
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
            setTitleError('Title is required');
        } else {
            setTitleError(false);
            titleError = false;
        }

        // author
        if (author.length <= 0 || author.length > 255) {
            setAuthorError('Author is required');
        } else {
            setAuthorError(false);
            authorError = false;
        }

        // genre
        if (genre <= 0 || isNaN(genre)) {
            setGenreError('Genre selection is required');
        } else {
            setGenreError(false);
            genreError = false;
        }

        // year
        if (year && !/^(?!0{1,2})\d{3,4}$/.test(year)) {
            setYearError('Incorrect year format');
        } else {
            setYearError(false);
            yearError = false;
        }

        // page count
        if (pageCount && (isNaN(pageCount) || pageCount <= 0)) {
            setPageCountError('Page count has to be more than 0');
        } else {
            setPageCountError(false);
            pageCountError = false;
        }

        // image url
        if (
            imageUrl &&
            !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(imageUrl)
        ) {
            setImageUrlError('Invalid URL');
        } else {
            setImageUrlError(false);
            imageUrlError = false;
        }

        // blurb
        if (blurb && blurb.length > 255) {
            setBlurbError('Must be less than 255 characters');
        } else {
            setBlurbError(false);
            blurbError = false;
        }

        // If no errors...
        if (
            !titleError &&
            !authorError &&
            !yearError &&
            !pageCountError &&
            !imageUrlError &&
            !blurbError &&
            !genreError
        ) {
            handleSubmit(e);
        }
    }

    // On SUBMIT form
    function handleSubmit() {
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
            `https://via.placeholder.com/600x840.png/efefef?text=${title}`;

        if (year) {
            requestBody.year = year;
        }

        fetch('http://localhost:8000/api/books', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Book created') {
                    setSuccessMessage(true);
                } else {
                    alert('oops');
                }
            });
    }

    function resetForm() {
        successMessage && setSuccessMessage(false);

        setTitle('');
        setAuthor('');
        setGenre('');
        setYear('');
        setPageCount('');
        setImageUrl('');
        setBlurb('');
    }

    // Render error messages
    function displayErrorMessage(error) {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: `<p class=${
                        error ? 'error' : 'hidden'
                    }>${error}</p>`,
                }}
            />
        );
    }

    return (
        <div className='form-container'>
            {successMessage ? (
                <div>
                    <p>Book added.</p>
                    <Link to='/books/add' onClick={resetForm}>
                        Add a New Book?
                    </Link>
                </div>
            ) : (
                <form onSubmit={validateForm}>
                    <div>
                        <label htmlFor='title'>Title (required)</label>
                        <br />
                        <input
                            type='text'
                            id='title'
                            name='title'
                            placeholder='Title'
                            value={title}
                            onChange={changeTitle}
                            className={titleError ? 'input-error' : ''}
                        />
                        {displayErrorMessage(titleError)}
                    </div>

                    <div>
                        <label htmlFor='author'>Author (required)</label>
                        <br />

                        <input
                            type='text'
                            id='author'
                            name='author'
                            placeholder='Author'
                            value={author}
                            onChange={changeAuthor}
                            className={authorError ? 'input-error' : ''}
                        />
                        {displayErrorMessage(authorError)}
                    </div>

                    <div>
                        <GenresSelector
                            onGenreChangeID={changeGenre}
                            className={genreError ? 'select-error' : 'null'}
                            label='Genre (required):'
                        />
                        {displayErrorMessage(genreError)}
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
                            className={pageCountError ? 'input-error' : ''}
                        />
                        {displayErrorMessage(pageCountError)}
                    </div>

                    <div>
                        <label htmlFor='year'>Year</label>
                        <br />
                        <input
                            type='number'
                            id='year'
                            name='year'
                            placeholder='Year'
                            value={year}
                            onChange={changeYear}
                            className={yearError ? 'input-error' : ''}
                        />
                        {displayErrorMessage(yearError)}
                    </div>

                    <div>
                        <label htmlFor='image'>Image URL</label>
                        <br />
                        <input
                            type='text'
                            id='image'
                            name='image'
                            placeholder='Image URL'
                            value={imageUrl}
                            onChange={changeImageUrl}
                            className={imageUrlError ? 'input-error' : ''}
                        />
                        {displayErrorMessage(imageUrlError)}
                    </div>

                    <div>
                        <label htmlFor='blurb'>Blurb</label>
                        <br />
                        <textarea
                            id='blurb'
                            rows='5'
                            maxLength='255'
                            placeholder='Blurb'
                            value={blurb}
                            onChange={changeBlurb}
                            className={blurbError ? 'input-error' : ''}
                        ></textarea>
                        {displayErrorMessage(blurbError)}
                    </div>

                    <input type='submit' value='Add book' />
                </form>
            )}
        </div>
    );
}

export default AddBookForm;
