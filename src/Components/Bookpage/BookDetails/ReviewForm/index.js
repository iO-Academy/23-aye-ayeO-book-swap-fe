import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../../../Context';
import { displayErrorMessage } from '../../../../utilities';

function ReviewForm({ refreshReviewsList }) {
    const { id } = useParams();
    const { setAlert } = useContext(Context);

    const [name, setName] = useState('');
    const [rating, setRating] = useState(null);
    const [review, setReview] = useState('');

    const [nameError, setNameError] = useState(false);
    const [ratingError, setRatingError] = useState(false);
    const [reviewError, setReviewError] = useState(false);
    const [serverError, setServerError] = useState('');

    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    // State setters for form values
    function changeName(e) {
        setName(e.target.value);
    }

    function changeRating(e) {
        setRating(parseInt(e.target.value));
    }

    function changeReview(e) {
        setReview(e.target.value);
    }

    // Validate form
    function validateForm(e) {
        e.preventDefault();

        let nameError = false; // Error!
        let ratingError = false;
        let reviewError = false;

        // name
        if (name.length <= 0) {
            setNameError(true);
            nameError = true;
        } else {
            setNameError(false);
        }

        // rating
        if (rating === null || rating < 0 || rating > 5) {
            setRatingError(true);
            ratingError = true;
        } else {
            setRatingError(false);
        }

        // review
        if (review.length < 10) {
            setReviewError(true);
            reviewError = true;
        } else {
            setReviewError(false);
        }

        // FIRE!
        if (!nameError && !ratingError && !reviewError) {
            handleSubmit();
        }
    }

    // SUBMIT form / FETCH
    async function handleSubmit() {
        try {
            const response = await fetch('http://localhost:8000/api/reviews', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    rating: rating,
                    review: review,
                    book_id: id,
                }),
            });

            const data = await response.json();

            if (response.ok && data.message === 'Review created') {
                setReviewSubmitted(true);
                setAlert(data.message);
                // Drills back to BookDetails>BookPage
                // Changes the state of newReview
                // useEffect triggers a new fetch
                // Rerenders BookDetails w/reviews
                refreshReviewsList(true);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setServerError(error.message);
        }
    }

    return (
        !reviewSubmitted && (
            <div className='form-container'>
                <form onSubmit={validateForm} className='flex flex-col gap-4'>
                    <h3 className='text-center'>What do you think?</h3>
                    <div>
                        <label htmlFor='name'>Name</label>

                        <input
                            type='text'
                            id='name'
                            value={name}
                            onChange={changeName}
                            className={
                                nameError
                                    ? 'input-error form-text'
                                    : 'form-text'
                            }
                        />
                        {nameError && displayErrorMessage('Name is required')}
                    </div>

                    <div>
                        <label htmlFor='rating'>Rating</label>
                        <select
                            id='rating'
                            onChange={changeRating}
                            className={
                                ratingError
                                    ? 'input-error form-text'
                                    : 'form-text'
                            }
                        >
                            <option value={null}> Select </option>
                            <option value={5}>5</option>
                            <option value={4}>4</option>
                            <option value={3}>3</option>
                            <option value={2}>2</option>
                            <option value={1}>1</option>
                            <option value={0}>0</option>
                        </select>
                        {ratingError && displayErrorMessage('Select a rating')}
                    </div>

                    <div>
                        <label htmlFor='review'>Review</label>
                        <br />
                        <textarea
                            id='review'
                            rows='4'
                            maxLength='255'
                            cols='50'
                            onChange={changeReview}
                            className={
                                reviewError
                                    ? 'input-error form-text'
                                    : 'form-text'
                            }
                        ></textarea>
                        {reviewError &&
                            displayErrorMessage(
                                'Review is required (Min. 10 characters)'
                            )}
                        <div>{review.length} / 255 characters</div>
                    </div>
                    <span className='error'>{serverError}</span>
                    <input
                        type='submit'
                        value='Review'
                        className='button py-2'
                    />
                </form>
            </div>
        )
    );
}

export default ReviewForm;
