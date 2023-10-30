import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../../Context";
import { displayErrorMessage, isValidEmail } from "../../../../utilities";

function ReturnForm({ claimed, getBookData, open, visibilityToggle }) {
    const { id } = useParams();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [serverError, setServerError] = useState("");

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
        }
    }

    async function handleSubmit() {
        try {
            const res = await fetch("http://localhost:8000/api/books/return/" + id, {
                mode: "cors",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                visibilityToggle();
                getBookData();
                setAlert("Book returned");
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setServerError(error.message);
        }
    }

    return (
        <dialog open={open}>
            <div onSubmit={validateForm} className="form-container claim-return-form ">
                <form className="claim-form">
                    <h3>Want to return this book {claimed}?</h3>
                    <div>
                        <label htmlFor="email"> {claimed}'s Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={changeEmail}
                            className={emailError ? "input-error" : ""}
                        />
                        {emailError && displayErrorMessage("Valid email required")}
                        {serverError && displayErrorMessage(serverError)}
                    </div>

                    <input type="submit" value="Return" className="submit-button" />
                </form>
            </div>
        </dialog>
    );
}

export default ReturnForm;
