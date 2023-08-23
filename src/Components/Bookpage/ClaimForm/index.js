import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './claimform.css'

function ClaimForm({ title }) {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [apiMessage, setApiMessage] = useState('')

    function changeName(e) {
        setName(e.target.value)
    }

    function changeEmail(e) {
        setEmail(e.target.value)
    }

    function validateForm(e) {
        e.preventDefault()

        if (name.length <= 0) {
            setError(true)
        } else {
            setError(true)
            handleSubmit(e)
        }
    }

    function handleSubmit(e) {
        fetch('https://book-swap-api.dev.io-academy.uk/api/books/claim/' + id, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.message)
                if (data.message === 'Book ' + id + ' is already claimed') {
                    setApiMessage(data.message)
                    fetch(
                        'https://book-swap-api.dev.io-academy.uk/api/books/' +
                            id,
                        {
                            mode: 'cors',
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                            },
                        }
                    ).then((res) =>
                        res.json().then((book) => {
                            setApiMessage(
                                `Oops! ${book.data.claimed_by_name} was faster! ${title} has already been claimed.`
                            )
                        })
                    )
                } else {
                    setApiMessage(`Well done ${name}! You've claimed ${title}!`)
                }
            })
    }

    return (
        <div className='claim-form-box'>
            {apiMessage ? (
                <p>{apiMessage}</p>
            ) : (
                <form onSubmit={validateForm} className='claim-form'>
                    <h3>Want to claim this book?</h3>
                    <div>
                        <label htmlFor='name'>Name</label>

                        <input
                            type='text'
                            id='name'
                            name='name'
                            placeholder='Name'
                            value={name}
                            onChange={changeName}
                        />
                        <p className={error ? 'error' : 'hidden'}>
                            Don't like your name
                        </p>
                    </div>

                    <div>
                        <label htmlFor='email'>Email</label>

                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={email}
                            onChange={changeEmail}
                        />
                        <p className={error ? 'error' : 'hidden'}>
                            Don't like your name
                        </p>
                    </div>

                    <input
                        type='submit'
                        value='Claim'
                        className='submit-button'
                    />
                </form>
            )}
        </div>
    )
}

export default ClaimForm
