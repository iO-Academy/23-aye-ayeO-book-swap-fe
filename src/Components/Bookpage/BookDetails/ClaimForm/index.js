import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import './claimform.css';
import { Context } from '../../../../Context';
import { displayErrorMessage } from '../../../../utilities';

function ClaimForm({ getBookData, open, visibilityToggle }) {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const { setAlert } = useContext(Context);

    function changeName(e) {
        setName(e.target.value);
    }

    function changeEmail(e) {
        setEmail(e.target.value);
    }

    function validateForm(e) {
        e.preventDefault();
        let nameError = true;
        let emailError = true;

        if (name.length <= 0) {
            setNameError(true);
            nameError = true;
        } else {
            setNameError(false);
            nameError = false;
        }

        if (email.length <= 0) {
            setEmailError(true);
            emailError = true;
        } else {
            setEmailError(false);
            emailError = false;
        }

        if (!nameError && !emailError) {
            handleSubmit(e);
        }
    }

    async function handleSubmit() {
        try {
            const res = await fetch(
                'http://localhost:8000/api/books/claim/' + id,
                {
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
                }
            );
            const data = await res.json();

            if (res.ok) {
                visibilityToggle();
                getBookData();
                setAlert('Book claimed');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setEmailError(error.message);
        }
    }

    return (
        <dialog open={open}>
            <div className='form-container claim-return-form'>
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
                        {nameError && displayErrorMessage('Name is required')}
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
                        {emailError && displayErrorMessage('Email is required')}
                    </div>

                    <input
                        type='submit'
                        value='Claim'
                        className='submit-button'
                    />
                </form>
            </div>
        </dialog>
    );
}

export default ClaimForm;
