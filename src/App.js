import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Nav from './Components/Nav';
import Bookshelf from './Components/Bookshelf';
import NotFound from './Components/NotFound';
import Bookpage from './Components/Bookpage';
import AddBookForm from './Components/AddBookForm';
import AlertBubble from './Components/AlertBubble';
import { Context } from './Context';
import { useEffect, useState } from 'react';
import SplashScreen from './Components/SplashScreen';

function App() {
    const [alert, setAlert] = useState();
    const [scrollPositionAvailable, setScrollPositionAvailable] = useState(0);
    const [scrollPositionClaimed, setScrollPositionClaimed] = useState(0);

    const [loading, setLoading] = useState(true);

    console.log(document.readyState);
    useEffect(() => {
        const timeout = setTimeout(() => {
            const checkIfLoaded = () => {
                if (document.readyState === 'complete') {
                    setLoading(false);
                } else {
                    setTimeout(checkIfLoaded, 100);
                }
            };
            checkIfLoaded();
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className='App montserrat'>
            <BrowserRouter>
                {loading ? (
                    <SplashScreen />
                ) : (
                    <>
                        <Nav />
                        <Context.Provider value={{ alert, setAlert }}>
                            <Routes>
                                <Route
                                    path='/'
                                    element={
                                        <Bookshelf
                                            claimed={0}
                                            scrollPosition={scrollPositionAvailable}
                                            setScrollPosition={setScrollPositionAvailable}
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
                    </>
                )}
            </BrowserRouter>
        </div>
    );
}

export default App;
