import React from 'react';

// Render error messages, prevent page jump

export function displayErrorMessage(error = ' ') {
    return (
        <div>
            <p className={error ? 'error' : 'hidden'}>
                {/* <span class="material-symbols-outlined">warning</span> */}
                {error}
            </p>
        </div>
    );
}

export function isValidEmail(email) {
    const emailPattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|("[^"]+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email);
}

export function isValidUrl(url) {
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    return urlPattern.test(url);
}

export function isValidYear(year) {
    const yearPattern = /^(?!0{1,2})\d{3,4}$/;
    return yearPattern.test(year);
}

export function isValidISBN(isbn) {
    isbn = isbn.replace(/[- ]/g, ''); // Remove hyphens and spaces

    const length = isbn.length;

    if (length === 10) {
        // Validate ISBN-10
        let sum = 0;
        for (let i = 0; i < 10; i++) {
            if (isbn[i] === 'X' && i === 9) {
                sum += 10; // 'X' represents 10
            } else if (!isNaN(parseInt(isbn[i]))) {
                sum += parseInt(isbn[i]) * (10 - i);
            } else {
                return false; // Invalid character found
            }
        }
        return sum % 11 === 0;
    } else if (
        length === 13 &&
        (isbn.substring(0, 3) === '978' || isbn.substring(0, 3) === '979')
    ) {
        // Validate ISBN-13
        let sum = 0;
        for (let i = 0; i < 12; i++) {
            const factor = i % 2 === 0 ? 1 : 3;
            sum += parseInt(isbn[i]) * factor;
        }
        const checkDigit = (10 - (sum % 10)) % 10;
        return parseInt(isbn[12]) === checkDigit;
    } else {
        return false; // Invalid length or format
    }
}

export function removeQuotes(str) {
    return str.replace(/^['"]|['"]$/g, '');
}

export function limitString(str, limiter) {
    if (str.length > limiter) {
        return str.substring(0, limiter);
    }
    return str;
}

export function extractYear(dateString) {
    const dateArray = dateString.split(' ');

    // Check if the array contains only the year
    if (dateArray.length === 1) {
        return dateArray[0]; // Return the year directly
    } else {
        // If it's in a format like 'Month day, year', extract the year from the last element
        const year = dateArray[dateArray.length - 1];
        return year.replace(/[^0-9]/g, ''); // Extract only the digits (the year)
    }
}

export function scrollToTop() {
    window.scrollTo(0, 0);
}

export function getYearFromDateString(dateString) {
    const date = new Date(dateString);
    return date.getFullYear();
}

export function playSound(sound) {
    const successSound = new Audio(sound);
    successSound.play();
}

export function renderWithLineBreaks(text) {
    const lines = text.split('\n');

    return lines.map((line, index) => (
        <React.Fragment key={index}>
            {line}
            {/* Add <br> except for the last line */}
            {index < lines.length - 1 && <br />}
        </React.Fragment>
    ));
}
