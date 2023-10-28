import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Nav from "./Components/Nav";
import Bookshelf from "./Components/Bookshelf";
import NotFound from "./Components/NotFound";
import Bookpage from "./Components/Bookpage";
import AddBookForm from "./Components/AddBookForm";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Bookshelf claimed={0} />} />
                    <Route path="/claimed" element={<Bookshelf claimed={1} />} />
                    <Route path="/books/:id" element={<Bookpage />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/books/add" element={<AddBookForm />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
