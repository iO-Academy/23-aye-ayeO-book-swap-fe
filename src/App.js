import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Nav from './Components/Nav';
import Bookshelf from './Components/Bookshelf';
import NotFound from './Components/NotFound';
import Bookpage from './Components/Bookpage';
import AddBookForm from './Components/AddBookForm';
import AlertBubble from './Components/AlertBubble';

import { Context } from './Context';
import { useState } from 'react';
import ScrollToTop from './Components/ScrollToTop';

function App() {
    const [alert, setAlert] = useState('');

    return (
        <div className='App montserrat'>
            <BrowserRouter>
                <ScrollToTop />
                <Nav />
                <Context.Provider value={{ alert, setAlert }}>
                    <AlertBubble message={alert} />
                    <Routes>
                        <Route path='/' element={<Bookshelf claimed={0} />} />
                        <Route
                            path='/claimed'
                            element={<Bookshelf claimed={1} />}
                        />
                        <Route path='/books/:id' element={<Bookpage />} />
                        <Route path='*' element={<NotFound />} />
                        <Route path='/books/add' element={<AddBookForm />} />
                    </Routes>
                </Context.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
