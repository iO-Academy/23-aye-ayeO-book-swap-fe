import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../../../Context';
import { displayErrorMessage, isValidEmail } from '../../../../utilities';

function ReturnForm({
    claimed,
    getBookData,
    open,
    visibilityToggle,
    bookTitle,
}) {
    const { id } = useParams();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [serverError, setServerError] = useState('');

    const { setAlert } = useContext(Context);

    function changeEmail(e) {
        setEmail(e.target.value);
    }

    function validateForm(e) {
        e.preventDefault();
        let emailError = true;

        if (email.length <= 0 || !isValidEmail(email)) {
            setEmailError(true);
            emailError = true;
        } else {
            setEmailError(false);
            emailError = false;
        }

        if (!emailError) {
            handleSubmit(e);
            document.body.style.overflow = !open ? 'hidden' : 'auto';
        }
    }

    async function handleSubmit() {
        try {
            const res = await fetch(
                'http://localhost:8000/api/books/return/' + id,
                {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                    }),
                }
            );

            const data = await res.json();

            if (res.ok) {
                visibilityToggle();
                getBookData();
                setAlert('Book returned');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setServerError(error.message);
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
            <div onSubmit={validateForm} className='form-container w-[500px]'>
                <form className='claim-form'>
                    <h3>Return "{bookTitle}"?</h3>
                    <br />
                    <div>
                        <label htmlFor='email'> {claimed}'s Email</label>

                        <input
                            type='email'
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
                        {serverError && displayErrorMessage(serverError)}
                    </div>
                    <br />
                    <input
                        type='submit'
                        value='Return Book'
                        className='button py-3'
                    />
                </form>
            </div>
        </dialog>
    );
}

export default ReturnForm;
