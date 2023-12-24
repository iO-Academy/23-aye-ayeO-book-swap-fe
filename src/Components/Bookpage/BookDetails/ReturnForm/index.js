import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../../../Context';
import {
    displayErrorMessage,
    isValidEmail,
    isMobile,
} from '../../../../utilities';

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
        setEmailError(false);
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
                `${process.env.REACT_APP_API_URI}/books/return/${id}`,
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
                },
            );

            const data = await res.json();

            if (res.ok) {
                visibilityToggle();
                getBookData();
                setAlert(['Book returned']);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            if (
                error.message ===
                `Book ${id} was not returned. ${email} did not claim this book.`
            ) {
                setServerError(
                    `<span className='font-semibold'>${email}</span> has not claimed this book`,
                );
            } else {
                setServerError(error.message);
            }
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

    // Trap tab focus within the dialog
    const dialogRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Tab') {
                const focusableElements = dialogRef.current.querySelectorAll(
                    'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
                );

                const firstElement = focusableElements[0];
                const lastElement =
                    focusableElements[focusableElements.length - 1];

                if (e.shiftKey && document.activeElement === firstElement) {
                    // Tab + Shift + focus on the FIRST element -> move focus to the last element
                    e.preventDefault();
                    lastElement.focus();
                } else if (
                    !e.shiftKey &&
                    document.activeElement === lastElement
                ) {
                    // Tab + focus on the LAST element -> move focus to the first element
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <dialog
            open={open}
            className='dialog w-full fixed inset-0 flex items-center justify-center h-full'
            onClick={backdropClick}
            ref={dialogRef}
        >
            <div className='form-container !rounded-lg w-[500px] relative'>
                <button
                    onClick={backdropClick}
                    className='absolute top-0 right-0 text-3xl text-zinc-600 p-4'
                >
                    <svg
                        onClick={backdropClick}
                        xmlns='http://www.w3.org/2000/svg'
                        height='30'
                        viewBox='0 -960 960 960'
                        width='30'
                        fill='currentColor'
                        className='hover:rotate-180 transition'
                    >
                        <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
                    </svg>
                </button>
                <form onSubmit={validateForm} className='pb-6 w-full max-w-xs'>
                    <h3 className='text-base text-center text-zinc-500'>
                        You are returning:
                        <br />
                        <span className='text-lg text-zinc-600'>
                            {bookTitle}
                        </span>
                    </h3>
                    <br />
                    <div>
                        <label htmlFor='email'>
                            {claimed}'s Email{' '}
                            <span className='text-rose-600'>*</span>
                        </label>
                        <input
                            autoFocus={!isMobile()}
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
