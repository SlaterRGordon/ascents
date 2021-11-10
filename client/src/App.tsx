import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/home';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';


function App() {
	return (
		<Router basename='/'>
			<Routes>
				<Route path='/' element={<HomePage />}></Route>
				<Route path='/login' element={<LoginPage />}></Route>
				<Route path='/register' element={<RegisterPage />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
