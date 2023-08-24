import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './claimform.css'

function ClaimForm({ title, claimed }) {
    const { id } = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [apiMessage, setApiMessage] = useState('')

    function changeName(e) {
        setName(e.target.value)
    }

    function changeEmail(e) {
        setEmail(e.target.value)
    }

    function validateForm(e) {
        e.preventDefault()
        let nameError = true
        let emailError = true

        if (name.length <= 0) {
            setNameError(true)
            nameError = true
        } else {
            setNameError(false)
            nameError = false
        }

        if (email.length <= 0) {
            setEmailError(true)
            emailError = true
        } else {
            setEmailError(false)
            emailError = false
        }

        if (!nameError && !emailError) {
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
                if (data.message === `Book ${id} is already claimed`) {
                    setApiMessage(data.message)
                    // setClaimed(true)
                    console.log(data.message)
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
                !claimed && (
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
                                className={nameError ? 'input-error' : ''}
                            />
                            <p className={nameError ? 'error' : 'hidden'}>
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
                                className={emailError ? 'input-error' : ''}
                            />
                            <p className={emailError ? 'error' : 'hidden'}>
                                Don't like your email
                            </p>
                        </div>

                        <input
                            type='submit'
                            value='Claim'
                            className='submit-button'
                        />
                    </form>
                )
            )}
        </div>
    )
}

export default ClaimForm
