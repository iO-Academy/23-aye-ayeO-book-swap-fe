import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function ReviewForm() {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [rating, setRating] = useState(null)
    const [review, setReview] = useState('')
    const [nameError, setNameError] = useState(false)
    const [ratingError, setRatingError] = useState(false)
    const [reviewError, setReviewError] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)

    // State setters for form values
    function changeName(e) {
        setName(e.target.value)
    }
    function changeRating(e) {
        setRating(parseInt(e.target.value))
    }
    function changeReview(e) {
        setReview(e.target.value)
    }

    // Validate form
    function validateForm(e) {
        e.preventDefault()
        let nameError = true
        let ratingError = true
        let reviewError = true

        // name
        if (name.length <= 0) {
            setNameError(true)
            nameError = true
        } else {
            setNameError(false)
            nameError = false
        }

        // rating
        if (rating > 0) {
            setRatingError(true)
            ratingError = true
        } else {
            setRatingError(false)
            ratingError = false
        }

        // review
        if (review.length <= 0) {
            setReviewError(true)
            reviewError = true
        } else {
            setReviewError(false)
            reviewError = false
        }

        // FIRE!
        if (!(nameError && ratingError && reviewError)) {
            handleSubmit(e)
        }
    }

    // SUBMIT form / FETCH
    function handleSubmit() {
        fetch('https://book-swap-api.dev.io-academy.uk/api/reviews', {
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
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Review created') {
                    setSuccessMessage(true)
                } else {
                    alert("Review couldn't be submitted, try again later.")
                }
            })
    }

    return (
        <div className='form-container'>
            {successMessage ? (
                <p>Review submitted!</p>
            ) : (
                <form onSubmit={validateForm} className='claim-form'>
                    <h3>Want to review this book?</h3>
                    <div>
                        <label htmlFor='name'>Name</label>

                        <input
                            type='text'
                            id='name'
                            name='name'
                            placeholder='Name'
                            value={name}
                            onChange={changeName}
                            className={nameError ? 'input-error' : ''}
                        />
                        <p className={nameError ? 'error' : 'hidden'}>
                            Don't like your name
                        </p>
                    </div>

                    <div>
                        <label htmlFor='rating'>Rating:</label>
                        <select
                            name='rating'
                            id='rating'
                            onChange={changeRating}
                        >
                            <option value={null}>- Select -</option>
                            <option value={5}>5</option>
                            <option value={4}>4</option>
                            <option value={3}>3</option>
                            <option value={2}>2</option>
                            <option value={1}>1</option>
                            <option value={0}>0</option>
                        </select>
                        <p className={ratingError ? 'error' : 'hidden'}>
                            Select a rating!
                        </p>
                    </div>

                    <div>
                        <textarea
                            id='review'
                            name='review'
                            rows='4'
                            cols='50'
                            onChange={changeReview}
                        ></textarea>
                        <p className={reviewError ? 'error' : 'hidden'}>
                            Not gonna review?!
                        </p>
                    </div>

                    <input
                        type='submit'
                        value='Review'
                        className='submit-button'
                    />
                </form>
            )}
        </div>
    )
}

export default ReviewForm
