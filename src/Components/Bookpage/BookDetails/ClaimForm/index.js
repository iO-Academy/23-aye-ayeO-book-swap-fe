import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../../../Context';
import { displayErrorMessage } from '../../../../utilities';

function ClaimForm({ getBookData, open, visibilityToggle, bookTitle }) {
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
            handleSubmit();
            document.body.style.overflow = !open ? 'hidden' : 'auto';
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
                setAlert(['Book claimed']);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setEmailError(error.message);
        }
    }

    function backdropClick(e) {
        if (e.target === e.currentTarget) {
            visibilityToggle();
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            visibilityToggle();
        }
    });

    return (
        <dialog
            open={open}
            className='dialog w-full fixed inset-0 flex items-center justify-center h-full'
            onClick={backdropClick}
        >
            <div className='form-container w-[500px] relative'>
                <button
                    onClick={backdropClick}
                    className='absolute top-5 right-5 text-3xl text-zinc-600 material-symbols-outlined'
                >
                    close
                </button>
                <form onSubmit={validateForm}>
                    <h3>Claim "{bookTitle}"?</h3>
                    <br />

                    <div>
                        <label htmlFor='name'>Name</label>

                        <input
                            autoComplete='name'
                            type='text'
                            id='name'
                            name='name'
                            value={name}
                            onChange={changeName}
                            className={
                                nameError
                                    ? 'form-text input-error'
                                    : 'form-text'
                            }
                        />
                        {nameError && displayErrorMessage('Name is required')}
                    </div>
                    <br />
                    <div>
                        <label htmlFor='email'>Email</label>

                        <input
                            autoComplete='email'
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={changeEmail}
                            className={
                                emailError
                                    ? 'form-text input-error'
                                    : 'form-text'
                            }
                        />
                        {emailError &&
                            displayErrorMessage('Valid email is required')}
                    </div>
                    <br />
                    <input
                        type='submit'
                        value='Claim Book'
                        className='button py-3'
                    />
                </form>
            </div>
        </dialog>
    );
}

export default ClaimForm;
