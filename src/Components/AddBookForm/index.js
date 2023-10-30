import React, { useContext, useState } from "react";
import GenresSelector from "../Bookshelf/GenresSelector/";
import { Context } from "../../Context";
import { displayErrorMessage, isValidUrl, isValidYear } from "../../utilities";

function AddBookForm() {
    // AddBookForm Fields States
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [pageCount, setPageCount] = useState("");
    const [year, setYear] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [blurb, setBlurb] = useState("");

    // Error States
    const [titleError, setTitleError] = useState("");
    const [authorError, setAuthorError] = useState("");
    const [genreError, setGenreError] = useState("");
    const [pageCountError, setPageCountError] = useState(false);
    const [yearError, setYearError] = useState(false);
    const [imageUrlError, setImageUrlError] = useState(false);
    const [blurbError, setBlurbError] = useState(false);

    const { setAlert } = useContext(Context);

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
        if (!titleError && !authorError && !genreError && !pageCountError && !yearError && !imageUrlError && !blurbError) {
            handleSubmit(e);
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

            requestBody.image = imageUrl || `https://via.placeholder.com/600x840.png/efefef?text=Book+Cover+Coming+Soon`;

            if (year) {
                requestBody.year = year;
            }

            const res = await fetch("http://localhost:8000/api/books", {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await res.json();

            if (res.ok) {
                resetForm();
                setAlert("Book added");
            } else {
                const errorContainer = document.getElementById("error-container");
                errorContainer.innerHTML = Object.keys(data.errors)
                    .map((error) => {
                        const serverError = data.errors[error][0];
                        return `${serverError}`;
                    })
                    .join("<br>");
                throw new Error(data.message);
            }
        } catch (error) {
            // Log errors
        }
    }

    function resetForm() {
        setTitle("");
        setAuthor("");
        setGenre("");
        setYear("");
        setPageCount("");
        setImageUrl("");
        setBlurb("");
    }

    return (
        <div className="form-container">
            <form onSubmit={validateForm}>
                <h1>Add New Book</h1>

                <div>
                    <label htmlFor="title">Title (required)</label>
                    <br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={changeTitle}
                        className={titleError ? "input-error" : ""}
                    />
                    {titleError && displayErrorMessage("Title is required")}
                </div>

                <div>
                    <label htmlFor="author">Author (required)</label>
                    <br />

                    <input
                        type="text"
                        id="author"
                        name="author"
                        placeholder="Author"
                        value={author}
                        onChange={changeAuthor}
                        className={authorError ? "input-error" : ""}
                    />
                    {authorError && displayErrorMessage("Author is required")}
                </div>

                <div>
                    <GenresSelector
                        onGenreChangeID={changeGenre}
                        className={genreError ? "select-error" : "null"}
                        label="Genre (required):"
                        defaultString="Select"
                        isDisabled={true}
                    />
                    {genreError && displayErrorMessage("Genre selection is required")}
                </div>

                <div>
                    <label htmlFor="pageCount">Page count</label>
                    <br />
                    <input
                        type="number"
                        id="pageCount"
                        name="pageCount"
                        value={pageCount}
                        onChange={changePageCount}
                        className={pageCountError ? "input-error" : ""}
                    />
                    {pageCountError && displayErrorMessage("Page count has to be more than 0")}
                </div>

                <div>
                    <label htmlFor="year">Year</label>
                    <br />
                    <input
                        type="number"
                        id="year"
                        name="year"
                        placeholder="Year"
                        value={year}
                        onChange={changeYear}
                        className={yearError ? "input-error" : ""}
                    />
                    {yearError && displayErrorMessage("Incorrect year format")}
                </div>

                <div>
                    <label htmlFor="image">Image URL</label>
                    <br />
                    <input
                        type="text"
                        id="image"
                        name="image"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={changeImageUrl}
                        className={imageUrlError ? "input-error" : ""}
                    />
                    {imageUrlError && displayErrorMessage("Invalid URL")}
                </div>

                <div>
                    <label htmlFor="blurb">Blurb</label>
                    <br />
                    <textarea
                        id="blurb"
                        rows="5"
                        maxLength="255"
                        placeholder="Blurb"
                        value={blurb}
                        onChange={changeBlurb}
                        className={blurbError ? "input-error" : ""}
                    ></textarea>
                    {blurbError && displayErrorMessage("Must be less than 255 characters")}
                </div>
                <div id="error-container" className="error"></div>
                <input type="submit" value="Add book" />
            </form>
        </div>
    );
}

export default AddBookForm;
