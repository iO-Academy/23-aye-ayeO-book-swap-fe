import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Nav from "./Components/Nav"
import Bookshelf from "./Components/Bookshelf"
// import NotFound from './Components/NotFound';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Bookshelf />} />
                    {/* <Route path="/book/:id" element={<Book />} />
                    <Route path='*' element={<NotFound />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
