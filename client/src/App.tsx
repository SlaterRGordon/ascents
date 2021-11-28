import './App.css';
import { useEffect } from 'react';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { loadUser } from './flux/actions/auth';
import { clearClimbs } from './flux/actions/climbs';
import { Navigate } from 'react-router';
import { Toolbar } from '@mui/material';
import Navbar from './components/navbar/navbar';
import LoginPage from './components/auth/login/login';
import RegisterPage from './components/auth/register/register';
import Home from './components/home/home';


function App() {
    const { authData } = useSelector((state: RootStateOrAny) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('profile'));
        if (user) {
            dispatch(loadUser(JSON.parse(localStorage.getItem('profile')).user.id));
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(clearClimbs());
    });

    return (
        <Router basename='/'>
            <Navbar />
            <Toolbar />
            <Routes>
				<Route path='/' element={(<Home />)}></Route>
				<Route path='/login' element={(!authData ? <LoginPage /> : <Navigate to='/' />)}></Route>
				<Route path='/register' element={(!authData ? <RegisterPage /> : <Navigate to='/' />)}></Route>
			</Routes>
        </Router>
    );
}

export default App;