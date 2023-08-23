import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function ClaimForm() {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    function changeName(e) {
        setName(e.target.value)
    }

    function changeEmail(e) {
        setEmail(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(id)
        fetch('https://book-swap-api.dev.io-academy.uk/api/books/claim' + id, {
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
                console.log(data)
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Want to claim this book?</p>
                <div>
                    <label for='name'>Name</label>

                    <input
                        type='text'
                        id='name'
                        name='name'
                        placeholder='Name'
                        value={name}
                        onChange={changeName}
                    />
                </div>

                <div>
                    <label for='email'>Email</label>

                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={email}
                        onChange={changeEmail}
                    />
                </div>

                <input type='submit' value='Claim' />
            </form>
        </div>
    )
}

export default ClaimForm
