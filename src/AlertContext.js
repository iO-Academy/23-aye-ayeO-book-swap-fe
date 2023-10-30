import React, { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export function useAlert() {
    return useContext(AlertContext);
}

export function AlertProvider({ children }) {
    const [message, setMessage] = useState("");

    const showAlert = (message) => {
        setMessage(message);
    };

    return <AlertContext.Provider value={{ message, showAlert }}>{children}</AlertContext.Provider>;
}
