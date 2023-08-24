import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function ReturnForm({claimed, getBookData}) {

    const { id } = useParams()
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [apiMessage, setApiMessage] = useState('')

    function changeEmail(e) {
        setEmail(e.target.value)
    }

    function validateForm(e) {
        e.preventDefault()
        let emailError = true
        console.log(email)

        if (email.length <= 0) {
            setEmailError(true)
            emailError = true
        } else {
            setEmailError(false)
            emailError = false
        }

        if (!emailError) {
            handleSubmit(e)
            console.log('hola')
        }
    } 

    function handleSubmit() {
        fetch('https://book-swap-api.dev.io-academy.uk/api/books/return/' + id, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                email: email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === `Book ${id} was returned`) {
                    getBookData()
                }
            })
    }


    return (
        
        <div onSubmit={validateForm} className="form-container">
            <form className='claim-form'>
                <h3>Want to return this book {claimed}?</h3>
                <div>
                    <label htmlFor='email'> {claimed}'s Email</label>

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
        </div>
        )
}

export default ReturnForm 