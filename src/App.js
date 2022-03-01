import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import Category from './pages/Category';
import Detail from './pages/Detail';
import Home from './pages/Home';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/:category/search/:keyword' element={<Category />} />
				<Route path='/:category/:id' element={<Detail />} />
				<Route path='/:category' element={<Category />} />
				<Route path='/' element={<Home />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
