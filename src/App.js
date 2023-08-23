import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Nav from "./Components/Nav"
import Bookpage from "./Components/Bookpage"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Nav />
                <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="/book/:id" element={<Bookpage />} />
                    {/* <Route path="*" element={<NotFound />} />  */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
