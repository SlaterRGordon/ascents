import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router';
import { Toolbar, Container } from '@mui/material';
import Navbar from './components/navbar/navbar';
import LoginPage from './components/auth/login/login';
import RegisterPage from './components/auth/register/register';

function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    });

    return (
        <Router basename='/'>
            <Navbar />
            <Toolbar />
            <Container className='flex-center'>
                <Routes>
                    <Route path='/' element={<div>Tester</div>}></Route>
                    <Route path='/login' element={(!user ? <LoginPage /> : <Navigate to='/' />)}></Route>
                    <Route path='/register' element={(!user ? <RegisterPage /> : <Navigate to='/' />)}></Route>
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
