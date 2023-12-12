import React, { useContext, useEffect, useState } from 'react';
import GenresSelector from '../Bookshelf/GenresSelector/';
import ScrollToTop from '../ScrollToTop';
import { Context } from '../../Context';
import { Html5Qrcode } from 'html5-qrcode';
import {
    displayErrorMessage,
    isValidUrl,
    isValidYear,
    isValidISBN,
    removeQuotes,
    limitString,
    getYearFromDateString,
    playSound,
    removeHtmlTags,
    removeEdgeCurl,
} from '../../utilities';

import scanSound from '../../sounds/click.mp3';

function AddBookForm() {
    const [isbn, setISBN] = useState('');
    const [language, setLanguage] = useState('');

    const [cameraPermission, setCameraPermission] = useState(null);
    const [scanner, setScanner] = useState('');
    const [isScannerOn, setIsScannerOn] = useState(false);

    const requestCameraPermission = async () => {
        try {
            // Request camera permission
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });

            // Permission granted
            // console.log('Camera permission granted');
            setCameraPermission(true);

            // Don't forget to stop the stream after checking permission
            stream.getTracks().forEach((track) => track.stop());
        } catch (error) {
            // Permission denied or error
            // console.error('Error requesting camera permission:', error);
            setCameraPermission(false);
        }
    };

    const config = {
        fps: 60,
        qrbox: { width: 450, height: 255 },
        aspectRatio: 1.777778, // 16:9
    };

    useEffect(() => {
        const newScanner = new Html5Qrcode('scanner');
        setScanner(newScanner);
    }, []);

    function closeScanner() {
        if (scanner) {
            scanner
                .stop()
                .then(() => {
                    console.log('Scanner stopped. ');
                })
                .catch((err) => {
                    console.warn(err);
                });
            setIsScannerOn(false);
        }
    }

    const qrCodeSuccessCallback = (result) => {
        try {
            if (isValidISBN(result)) {
                playSound(scanSound);
                resetForm();
                setIsbnError('');
                setRemoteSuccess(false);
                setISBN(result);
                checkIfIsbnExists(result);
                closeScanner();
            }
        } catch (error) {
            console.error('Error in qrCodeSuccessCallback:', error);
        }
    };

    function handleStartScanner() {
        if (!cameraPermission) {
        }

        try {
            if (scanner && !isScannerOn) {
                requestCameraPermission();
                !cameraPermission && requestCameraPermission();
                scanner.start(
                    { facingMode: 'environment' },
                    config,
                    qrCodeSuccessCallback,
                );
                setIsScannerOn(true);
            } else {
                closeScanner();
            }
        } catch (error) {
            console.error('Scanner error:', error);
        }
    }

    // AddBookForm Fields States
    const [remoteSuccess, setRemoteSuccess] = useState(false);
    const [goodreadsLink, setGoodreadsLink] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [genreId, setGenreId] = useState('');
    const [isbn10, setISBN10] = useState('');
    const [isbn13, setISBN13] = useState('');
    const [pageCount, setPageCount] = useState('');
    const [year, setYear] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [blurb, setBlurb] = useState('');

    // Error States
    const [isbnError, setIsbnError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [authorError, setAuthorError] = useState('');
    const [genreError, setGenreError] = useState('');
    const [isbn10Error, setISBN10Error] = useState('');
    const [isbn13Error, setISBN13Error] = useState('');
    const [pageCountError, setPageCountError] = useState(false);
    const [yearError, setYearError] = useState(false);
    const [imageUrlError, setImageUrlError] = useState(false);
    const [blurbError, setBlurbError] = useState(false);

    const { setAlert } = useContext(Context);

    // State setters for form values + form reset
    function changeISBN(e) {
        resetForm();
        setISBN(e.target.value);
        setISBN10('');
        setISBN13('');
        setIsbnError('');
        setRemoteSuccess(false);
        const isbn = e.target.value;
        isValidISBN(isbn) && checkIfIsbnExists(isbn);
    }

    function changeTitle(e) {
        setTitle(e.target.value);
        setTitleError(false);
    }

    function changeAuthor(e) {
        setAuthor(e.target.value);
        setAuthorError(false);
    }

    function updateGenre(passedGenreId) {
        setGenre(passedGenreId);
        setGenreId(passedGenreId);
    }

    function changeISBN10(e) {
        setISBN10(e.target.value);
        setISBN10Error(false);
    }

    function changeISBN13(e) {
        setISBN13(e.target.value);
        setISBN13Error(false);
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

        let titleError = true;
        let authorError = true;
        let genreError = true;
        let isbn10Error = true;
        let isbn13Error = true;
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
        if (!author || author.length <= 0 || author.length > 255) {
            setAuthorError(true);
        } else {
            setAuthorError(false);
            authorError = false;
        }

        // genre
        if (!genre || genreId <= 0) {
            setGenreError(true);
            setGenre(0);
        } else {
            setGenreError(false);
            genreError = false;
        }

        // isbn10
        if (!isbn10 || !isValidISBN(isbn10) || isbn10.length !== 10) {
            setISBN10Error(true);
        } else {
            setISBN10Error(false);
            isbn10Error = false;
        }

        // isbn-13
        if (!isbn13 || !isValidISBN(isbn13) || isbn13.length !== 13) {
            setISBN13Error(true);
        } else {
            setISBN13Error(false);
            isbn13Error = false;
        }

        // year
        if (!isValidYear(year)) {
            setYearError(true);
        } else {
            setYearError(false);
            yearError = false;
        }

        // page count
        if (isNaN(pageCount) || pageCount <= 0) {
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
        if (!blurb || blurb.length < 10 || blurb.length > 10000) {
            setBlurbError(true);
        } else {
            setBlurbError(false);
            blurbError = false;
        }

        function scrollToFirstError() {
            const firstErrorElement = document.querySelector('.input-error');

            // Offset sticky nav
            if (firstErrorElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const scrollPosition = firstErrorElement.offsetTop - navHeight;

                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth',
                });
            }
        }

        // If no errors...
        if (
            !titleError &&
            !authorError &&
            !blurbError &&
            !isbn10Error &&
            !isbn13Error &&
            !genreError &&
            !pageCountError &&
            !yearError &&
            !imageUrlError
        ) {
            handleSubmit(e);
        } else {
            scrollToFirstError();
        }
    }

    async function checkIfIsbnExists(isbn) {
        // Check if ISBN exists in Swapp DB

        const cleanIsbn = isbn?.replace(/[- ]/g, '') || '';

        try {
            const swappRes = await fetch(
                `${process.env.REACT_APP_API_URI}/books/check-isbn/${cleanIsbn}`,
            );
            const isbnCheck = await swappRes.json();

            isbnCheck.exists
                ? setIsbnError(
                      `<span><a href="/books/${isbnCheck.id}" className="font-black underline decoration-dotted decoration-red-500 decoration-[1px] underline-offset-2">${isbnCheck.title}</a> is already on Swapp</span>`,
                  )
                : getBookData(isbn);
        } catch (error) {
            //error
        }
    }

    async function getBookData(isbn) {
        let google;
        let openLibrary;

        try {
            google = await fetchGoogleBookData(isbn);
        } catch (googleError) {}

        try {
            openLibrary = await fetchOpenLibraryBookData(isbn);
        } catch (openLibraryError) {}

        if (google || openLibrary) {
            handleSuccess(google, openLibrary);
        } else {
            setIsbnError(
                "Sorry, we couldn't find this book. Please fill in the form below manually.",
            );
        }
    }

    async function fetchGoogleBookData(isbn) {
        const google = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
        );
        const googleRes = await google.json();

        // Secondary fetch for missing data in googleRes
        const googleSelfLink = await fetch(`${googleRes.items[0].selfLink}`);
        const googleSelfLinkRes = await googleSelfLink.json();

        return { googleRes, googleSelfLinkRes };
    }

    async function fetchOpenLibraryBookData(isbn) {
        const openLibraryRes = await fetch(
            `https://openlibrary.org/isbn/${isbn}.json`,
        );
        const book = await openLibraryRes.json();

        const workRes = await fetch(
            `https://openlibrary.org${book.works[0].key}.json`,
        );
        const work = await workRes.json();

        const authorRes = await fetch(
            `https://openlibrary.org${work.authors[0].author.key}.json`,
        );
        const author = await authorRes.json();

        return { book, work, author };
    }

    function handleSuccess(g, ol) {
        setRemoteSuccess(true);

        // Open Library API
        const bk = ol?.book ?? {};
        const wk = ol?.work ?? {};
        const au = ol?.author ?? {};

        let isbn10OL;
        let isbn13OL;
        let titleOL;
        let authorOL;
        let pageCountOL;
        let yearOL;
        let coverOL;
        let blurbOL;
        let goodreadsOL;
        // let languageOL;

        // Google Books API
        const g1 = g?.googleRes ?? {};
        const g2 = g?.googleSelfLinkRes ?? {};

        let isbn10G;
        let isbn13G;
        let titleG;
        let authorG;
        let categoryG;
        let pageCountG;
        let yearG;
        let coverG;
        let blurbG;
        let languageG;

        ////////////////// OPEN LIBRARY //////////////////////

        // GOODREADS
        if (
            bk.identifiers &&
            bk.identifiers.goodreads &&
            bk.identifiers.goodreads[0]
        ) {
            goodreadsOL = bk.identifiers.goodreads[0];
        }

        // ISBN10
        bk.isbn_10 && (isbn10OL = bk.isbn_10[0]);

        // ISBN13
        bk.isbn_13 && (isbn13OL = bk.isbn_13[0]);

        // TITLE
        bk.title && (titleOL = bk.title);

        // AUTHOR
        au && au.name && (authorOL = au.name.trim());

        // PAGES
        bk.pagination && (pageCountOL = bk.pagination);
        bk.number_of_pages && (pageCountOL = bk.number_of_pages);

        // YEAR
        wk.first_publish_date &&
            (yearOL = getYearFromDateString(wk.first_publish_date));
        bk.publish_date && (yearOL = getYearFromDateString(bk.publish_date));

        // COVER
        const bookCover = bk.covers && bk.covers[0];
        const workCover = wk.covers && wk.covers[0];

        if (bookCover || workCover) {
            if (bookCover !== -1 && workCover !== -1) {
                coverOL = bookCover || workCover;
            }
        }

        if (coverOL) {
            coverOL = `https://covers.openlibrary.org/b/id/${coverOL}-L.jpg`;
        } else {
            coverOL = '';
        }

        // BLURB
        if (wk.description && wk.description.value) {
            blurbOL = limitString(removeQuotes(wk.description.value), 10000);
        } else if (wk.description) {
            blurbOL = limitString(removeQuotes(wk.description), 10000);
        } else if (bk.description && bk.description.value) {
            blurbOL = limitString(removeQuotes(bk.description.value), 10000);
        }

        // LANGUAGE
        setLanguage('es');

        ////////////////// GOOGLE //////////////////////

        // TITLE
        g1.items && (titleG = g1.items[0].volumeInfo?.title);

        // AUTHOR
        g1.items && (authorG = g1.items[0]?.volumeInfo?.authors?.[0]);

        // CATEGORY
        g1.items && (categoryG = g1.items[0]?.volumeInfo?.categories?.[0]);

        // PAGES
        g1.items && (pageCountG = g1.items[0]?.volumeInfo?.pageCount);

        // BLURB
        g2.volumeInfo && (blurbG = removeHtmlTags(g2.volumeInfo.description));

        // COVER
        g1.items &&
            (coverG = removeEdgeCurl(
                g1.items[0]?.volumeInfo?.imageLinks?.thumbnail,
            ));

        // YEAR
        g1.items &&
            (yearG = getYearFromDateString(
                g1.items[0].volumeInfo.publishedDate,
            ));

        // ISBN
        if (g2?.volumeInfo?.industryIdentifiers) {
            if (g2.volumeInfo.industryIdentifiers[0].type === 'ISBN_10') {
                isbn10G = g2.volumeInfo?.industryIdentifiers[0]?.identifier;
                isbn13G = g2.volumeInfo?.industryIdentifiers[1]?.identifier;
            } else {
                isbn10G = g2.volumeInfo?.industryIdentifiers[1]?.identifier;
                isbn13G = g2.volumeInfo?.industryIdentifiers[0]?.identifier;
            }
        }

        // LANGUAGE
        g1.items && (languageG = g1.items[0]?.volumeInfo?.language);

        /////////////////  SETTING STATE  ///////////////////

        // GOODREADS
        setGoodreadsLink(goodreadsOL);

        // TITLE
        titleG ? setTitle(titleG) : setTitle(titleOL);

        // AUTHOR
        authorG ? setAuthor(authorG) : setAuthor(authorOL);

        // ISBN10
        isbn10G ? setISBN10(isbn10G) : setISBN10(isbn10OL);

        // ISBN13
        isbn13G ? setISBN13(isbn13G) : setISBN13(isbn13OL);

        // LANGUAGE
        languageG && setLanguage(languageG);

        // CATEGORY
        categoryG && setGenre(categoryG);

        // PAGES
        pageCountG > 0 ? setPageCount(pageCountG) : setPageCount(pageCountOL);

        // YEAR
        yearG > 0 ? setYear(yearG) : setYear(yearOL);

        // COVER
        coverOL ? setImageUrl(coverOL) : setImageUrl(coverG);

        // BLURB
        blurbG && blurbG.length > 0 ? setBlurb(blurbG) : setBlurb(blurbOL);
    }

    ////////////////////// RESET VALIDATION ERRORS ON FETCH FILL ////////////////////////////

    useEffect(() => {
        title && setTitleError(false);
    }, [title]);

    useEffect(() => {
        author && setAuthorError(false);
    }, [author]);

    useEffect(() => {
        isbn10 && setISBN10Error(false);
    }, [isbn10]);

    useEffect(() => {
        isbn13 && setISBN13Error(false);
    }, [isbn13]);

    useEffect(() => {
        pageCount && setPageCountError(false);
    }, [pageCount]);

    useEffect(() => {
        year && setYearError(false);
    }, [year]);

    useEffect(() => {
        imageUrl && setImageUrlError(false);
    }, [imageUrl]);

    useEffect(() => {
        blurb && setBlurbError(false);
    }, [blurb]);

    useEffect(() => {
        setTitleError(false);
        setAuthorError(false);
        setGenreError(false);
        setISBN10Error(false);
        setISBN13Error(false);
        setPageCountError(false);
        setYearError(false);
        setImageUrlError(false);
        setBlurbError(false);
    }, [isbnError]);

    //////////////////////////////////////////////////////////////////////////////////////////////
    async function handleSubmit() {
        try {
            const requestBody = {
                title,
                author,
                genre_id: genreId,
                isbn10,
                isbn13,
                language,
                page_count: pageCount,
                year,
                blurb,
                image:
                    imageUrl ||
                    'https://vladistanchev.co.uk/images/cover-coming-soon.webp',
            };

            console.log(requestBody.image);
            const res = await fetch(`${process.env.REACT_APP_API_URI}/books`, {
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
                setAlert(['Book added']);

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
            console.log(error);
        }
    }

    function resetForm() {
        setISBN('');
        setISBN10('');
        setISBN13('');
        setGoodreadsLink('');
        setRemoteSuccess(false);
        setTitle('');
        setAuthor('');
        setGenre('');
        setGenreId('');
        setYear('');
        setPageCount('');
        setImageUrl('');
        setBlurb('');
        setIsbnError('');
        document.getElementById('error-container').innerHTML = '';
    }

    return (
        <>
            <ScrollToTop />
            <div className='sm:pt-24'>
                <h1 className='py-8 sm:py-12'>Add new book</h1>
                <div className='m-auto mb-5 max-w-[750px] bg-[#34345020] px-6 pb-8 pt-2 text-slate-600 ring-inset ring-orange-100 transition sm:rounded-lg  sm:p-16 sm:ring-8'>
                    <div
                        id='scanner'
                        className='overflow-hidden rounded-xl'
                    ></div>
                    <br />
                    <label htmlFor='isbn' className='sr-only'>
                        Search by ISBN
                    </label>
                    <div
                        className={`overflow-hidden rounded-md bg-slate-300 pb-2
                        ${
                            isValidISBN(isbn) &&
                            !remoteSuccess &&
                            !isbnError &&
                            'background-animate rounded-t border-none bg-gradient-to-r from-amber-200 via-[#ef9b9b90] to-amber-200'
                        }
                        ${remoteSuccess && 'success-isbn border-none'}
                        ${isbnError ? '!bg-rose-200' : 'border-zinc-300'}

                        `}
                    >
                        <div className='flex flex-row items-center rounded-t-md border-slate-300 bg-zinc-100 text-zinc-600'>
                            <input
                                type='text'
                                id='isbn'
                                className='h-full w-full p-5 align-middle text-xl focus:outline-none'
                                value={isbn}
                                onInput={changeISBN}
                                placeholder='Search by ISBN'
                                aria-placeholder='Search by ISBN'
                            ></input>
                            <div
                                role='button'
                                tabIndex={0}
                                className='flex h-[65px] cursor-pointer items-center justify-center p-3 pt-5 text-center text-zinc-400 transition-colors hover:text-zinc-500'
                                onClick={handleStartScanner}
                                title='Start ISBN barcode scanner'
                                aria-label='Start ISBN barcode scanner'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    height='35'
                                    viewBox='0 -960 960 960'
                                    width='35'
                                    fill='currentColor'
                                    className='align-middle'
                                >
                                    <path d='M40-120v-200h80v120h120v80H40Zm680 0v-80h120v-120h80v200H720ZM160-240v-480h80v480h-80Zm120 0v-480h40v480h-40Zm120 0v-480h80v480h-80Zm120 0v-480h120v480H520Zm160 0v-480h40v480h-40Zm80 0v-480h40v480h-40ZM40-640v-200h200v80H120v120H40Zm800 0v-120H720v-80h200v200h-80Z' />
                                </svg>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-3 py-2 pb-0 text-slate-600'>
                            {!isValidISBN(isbn) &&
                                !remoteSuccess &&
                                !isbnError && (
                                    <>
                                        <div className='w-8 px-3 sm:w-0'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                height='18'
                                                viewBox='0 -960 960 960'
                                                width='18'
                                                fill='currentColor'
                                                className='align-middle'
                                            >
                                                <path d='M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z' />
                                            </svg>
                                        </div>
                                        <p className='align-middle text-xs'>
                                            <a
                                                href='https://en.wikipedia.org/wiki/ISBN'
                                                target='_blank'
                                                rel='noreferrer'
                                                className='font-bold underline decoration-slate-400 decoration-dotted decoration-[1px] underline-offset-2'
                                            >
                                                ISBN
                                            </a>{' '}
                                            is either 10 or 13 digits, usually
                                            printed alongside a barcode on the
                                            back of books
                                        </p>
                                    </>
                                )}

                            {isbnError && !title && (
                                <div className='px-4'>
                                    {' '}
                                    {displayErrorMessage(isbnError)}
                                </div>
                            )}

                            <div className='px-2 text-xs text-green-800'>
                                {' '}
                                {goodreadsLink && (
                                    <a
                                        href={`https://goodreads.com/book/show/${goodreadsLink}`}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        Check "{title}" on{' '}
                                        <span className='font-bold'>
                                            Goodreads
                                        </span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='form-container relative !my-0 !px-6 sm:my-5 sm:px-0 sm:pt-5 md:max-w-[750px]'>
                    <form
                        onSubmit={validateForm}
                        className='flex  w-full flex-col gap-4 sm:w-3/4'
                    >
                        <div>
                            <label htmlFor='title'>
                                Title{' '}
                                <span className='text-rose-400 drop-shadow-xl'>
                                    *
                                </span>
                            </label>
                            <br />
                            <input
                                type='text'
                                id='title'
                                name='title'
                                aria-required='true'
                                value={title}
                                onChange={changeTitle}
                                className={
                                    titleError
                                        ? 'input-error form-text'
                                        : 'form-text'
                                }
                            />
                            {titleError &&
                                displayErrorMessage('Title is required')}
                        </div>

                        <div>
                            <label htmlFor='author'>
                                Author{' '}
                                <span className='text-rose-400 drop-shadow-xl'>
                                    *
                                </span>
                            </label>
                            <br />

                            <input
                                type='text'
                                id='author'
                                name='author'
                                aria-required='true'
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
                                Category{' '}
                                <span className='text-rose-400 drop-shadow-xl'>
                                    *
                                </span>
                            </label>
                            <div className='flex flex-col-reverse items-start gap-1 sm:flex-row sm:items-center'>
                                {}
                                <GenresSelector
                                    updateGenre={updateGenre}
                                    className={
                                        genreError ? 'select-error' : null
                                    }
                                    defaultString='Select'
                                    isDisabled={true}
                                    selectedGenre={genre}
                                    isControlled={true}
                                    aria-required='true'
                                    setGenreError={setGenreError}
                                />
                                <div className='tooltip w-8 px-0 text-slate-500 sm:w-0'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        height='20'
                                        viewBox='0 -960 960 960'
                                        width='20'
                                        fill='currentColor'
                                        className='align-middle'
                                    >
                                        <path d='M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z' />
                                    </svg>
                                    <span className='tooltiptext'>
                                        BISAC Subject Headings
                                    </span>
                                </div>
                            </div>

                            {genreError &&
                                displayErrorMessage(
                                    'Category selection is required',
                                )}
                        </div>
                        <div className='flex flex-col justify-between gap-3 sm:flex-row'>
                            {' '}
                            {/* ISBN-13 */}
                            <div className='sm:w-1/2'>
                                <label htmlFor='isbn13'>
                                    ISBN-13{' '}
                                    <span className='text-rose-400 drop-shadow-xl'>
                                        *
                                    </span>
                                </label>

                                <br />
                                <input
                                    type='text'
                                    id='isbn13'
                                    name='isbn13'
                                    aria-required='true'
                                    value={isbn13}
                                    onChange={changeISBN13}
                                    className={
                                        isbn13Error
                                            ? 'input-error form-text'
                                            : 'form-text'
                                    }
                                />
                                {isbn13Error &&
                                    displayErrorMessage('ISBN-13 is required')}
                            </div>
                            <div className='sm:w-1/2'>
                                <label htmlFor='isbn10'>
                                    ISBN-10{' '}
                                    <span className='text-rose-400 drop-shadow-xl'>
                                        *
                                    </span>
                                </label>

                                <br />
                                <input
                                    type='text'
                                    id='isbn10'
                                    name='isbn10'
                                    aria-required='true'
                                    value={isbn10}
                                    onChange={changeISBN10}
                                    className={
                                        isbn10Error
                                            ? 'input-error form-text'
                                            : 'form-text'
                                    }
                                />
                                {isbn10Error &&
                                    displayErrorMessage('ISBN-10 is required')}
                            </div>
                        </div>

                        <div>
                            <label htmlFor='pageCount'>
                                Pages{' '}
                                <span className='text-rose-400 drop-shadow-xl'>
                                    *
                                </span>
                            </label>
                            <br />
                            <input
                                type='number'
                                id='pageCount'
                                name='pageCount'
                                aria-required='true'
                                value={pageCount}
                                onChange={changePageCount}
                                className={
                                    pageCountError
                                        ? 'input-error form-text'
                                        : 'form-text'
                                }
                            />
                            {pageCountError &&
                                displayErrorMessage('Page count is required')}
                        </div>

                        <div>
                            <label htmlFor='year'>
                                Year{' '}
                                <span className='text-rose-400 drop-shadow-xl'>
                                    *
                                </span>
                            </label>
                            <br />
                            <input
                                type='text'
                                id='year'
                                name='year'
                                aria-required='true'
                                value={year}
                                onChange={changeYear}
                                className={
                                    yearError
                                        ? 'input-error form-text'
                                        : ' form-text'
                                }
                            />
                            {yearError &&
                                displayErrorMessage(
                                    'Year is required (e.g. 1997)',
                                )}
                        </div>

                        {isValidUrl(imageUrl) && (
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
                                aria-required='true'
                                value={imageUrl}
                                onChange={changeImageUrl}
                                className={
                                    imageUrlError
                                        ? 'input-error form-text'
                                        : 'form-text'
                                }
                            />
                            {imageUrlError &&
                                displayErrorMessage(
                                    'Valid cover URL is required',
                                )}
                        </div>

                        <div>
                            <label htmlFor='blurb'>
                                Blurb{' '}
                                <span className='text-[#f87171] drop-shadow-xl'>
                                    *
                                </span>
                            </label>
                            <br />
                            <textarea
                                id='blurb'
                                aria-required='true'
                                rows='8'
                                maxLength='10000'
                                value={blurb}
                                onChange={changeBlurb}
                                className={`form-text h-max  w-full !p-3 !text-sm ${
                                    blurbError && 'input-error'
                                }`}
                            ></textarea>

                            {blurbError &&
                                displayErrorMessage(
                                    'The blurb must be between 10 and 10,000 characters',
                                )}
                        </div>
                        <div id='error-container' className='error'></div>
                        <input
                            type='submit'
                            value='Add book'
                            className='button py-3'
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddBookForm;
