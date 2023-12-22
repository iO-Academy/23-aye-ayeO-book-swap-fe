import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import './App.css';
import Nav from './Components/Nav';
import Bookshelf from './Components/Bookshelf';
import NotFound from './Components/NotFound';
import Bookpage from './Components/Bookpage';
import AddBookForm from './Components/AddBookForm';
import AlertBubble from './Components/AlertBubble';
import { Context } from './Context';
import { useRef, useState } from 'react';
import SplashScreen from './Components/SplashScreen';
import Footer from './Components/Footer';
import FirstTabbableElement from './Components/FirstTabbableElement/index';

function App() {
    const [alert, setAlert] = useState();

    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [paginationState, setPaginationState] = useState({
        page: parseInt(params.get('page')) || '',
        category: '',
        search: '',
    });

    const genreId = useRef(null);
    const searchInput = useRef(null);

    function resetFilter() {
        // 1. Clear State
        setPaginationState({
            page: '',
            category: '',
            search: '',
        });

        // 2. Navigate to Available
        navigate(`/`);

        // 3. Reset GUI elements
        genreId.current && (genreId.current.value = '0');
        searchInput.current && (searchInput.current.value = '');

        // 4. Clear URL
        params.delete('page');
        params.delete('search');
        params.delete('category');
    }

    return (
        <div className='App montserrat'>
            <SplashScreen />
            <FirstTabbableElement />
            <Context.Provider
                value={{
                    alert,
                    setAlert,
                    params,
                    navigate,
                    location,
                    resetFilter,
                    setPaginationState,
                    paginationState,
                    genreId,
                    searchInput,
                }}
            >
                <Nav />
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
                <Footer />
                <AlertBubble message={alert} />
            </Context.Provider>
        </div>
    );
}

export default App;
