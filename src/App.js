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
import SplashScreen from './Components/SplashScreen';

function App() {
    const [alert, setAlert] = useState();
    const [scrollPositionAvailable, setScrollPositionAvailable] = useState(0);
    const [scrollPositionClaimed, setScrollPositionClaimed] = useState(0);

    return (
        <div className='App montserrat'>
            <SplashScreen />
            <BrowserRouter>
                <Nav />
                <Context.Provider value={{ alert, setAlert }}>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <Bookshelf
                                    claimed={0}
                                    scrollPosition={scrollPositionAvailable}
                                    setScrollPosition={
                                        setScrollPositionAvailable
                                    }
                                />
                            }
                        />
                        <Route
                            path='/claimed'
                            element={
                                <Bookshelf
                                    claimed={1}
                                    scrollPosition={scrollPositionClaimed}
                                    setScrollPosition={setScrollPositionClaimed}
                                />
                            }
                        />
                        <Route path='/books/:id' element={<Bookpage />} />
                        <Route path='*' element={<NotFound />} />
                        <Route path='/books/add' element={<AddBookForm />} />
                    </Routes>
                    <AlertBubble message={alert} />
                </Context.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
