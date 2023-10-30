import React from "react";

// Render error messages, prevent page jump

export function displayErrorMessage(error = " ") {
    return (
        <div>
            <p className={error ? "error" : "hidden"}>{error}</p>
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
