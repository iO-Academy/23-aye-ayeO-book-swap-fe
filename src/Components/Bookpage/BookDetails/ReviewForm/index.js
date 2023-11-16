import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../../../Context';
import { displayErrorMessage, scrollToTop } from '../../../../utilities';

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
                setAlert(['Review created']);
                scrollToTop();
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
                            autoComplete='name'
                            type='text'
                            id='name'
                            name='name'
                            value={name}
                            onChange={changeName}
                            className={nameError ? 'input-error form-text' : 'form-text'}
                        />
                        {nameError && displayErrorMessage('Name is required')}
                    </div>

                    <fieldset className='flex flex-col justify-between'>
                        <legend>Rating</legend>

                        <div
                            id='rate'
                            onChange={changeRating}
                            className={
                                ratingError
                                    ? 'rate flex flex-row-reverse justify-end'
                                    : 'rate flex flex-row-reverse justify-end'
                            }
                        >
                            <input type='radio' id='star5' name='rate' value='5' />
                            <label htmlFor='star5' title='Excellent'>
                                5 stars
                            </label>
                            <input type='radio' id='star4' name='rate' value='4' />
                            <label htmlFor='star4' title='Great'>
                                4 stars
                            </label>
                            <input type='radio' id='star3' name='rate' value='3' />
                            <label htmlFor='star3' title='Good'>
                                3 stars
                            </label>
                            <input type='radio' id='star2' name='rate' value='2' />
                            <label htmlFor='star2' title='Fair'>
                                2 stars
                            </label>
                            <input type='radio' id='star1' name='rate' value='1' />
                            <label htmlFor='star1' title='Poor'>
                                1 star
                            </label>
                            <input type='radio' id='star0' name='rate' value='0' />
                            <label htmlFor='star0' title='Terrible'>
                                0 stars
                            </label>
                        </div>
                    </fieldset>
                    {ratingError && displayErrorMessage('Select a rating')}

                    <div>
                        <label htmlFor='review'>Review</label>
                        <br />
                        <textarea
                            id='review'
                            name='review'
                            rows='4'
                            maxLength='255'
                            cols='50'
                            onChange={changeReview}
                            className={reviewError ? 'input-error form-text' : 'form-text'}
                        ></textarea>
                        {reviewError &&
                            displayErrorMessage('Review is required (Min. 10 characters)')}
                        <div>{review.length} / 255 characters</div>
                    </div>
                    <span className='error'>{serverError}</span>
                    <input type='submit' value='Post Review' className='button py-2' />
                </form>
            </div>
        )
    );
}

export default ReviewForm;
