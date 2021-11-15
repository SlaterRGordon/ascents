import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/home';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';

import store from './flux/store';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './flux/actions/authActions';

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

	return (
        <Provider store={store}>
            <Router basename='/'>
                <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/login' element={<LoginPage />}></Route>
                    <Route path='/register' element={<RegisterPage />}></Route>
                </Routes>
            </Router>
        </Provider>
	);
}

export default App;
