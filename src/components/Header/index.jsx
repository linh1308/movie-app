import React, { useEffect, useRef } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { FaTv, FaUserAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.scss';

const navbar = [
	{
		name: 'Home',
		path: '/'
	},

	{
		name: 'Movie',
		path: '/movie'
	},

	{
		name: 'TV Shows',
		path: '/tv'
	}
]

const Header = () => {
	const { pathname } = useLocation();
	const active = navbar.findIndex(index => index.path === pathname);
	const headerRef = useRef();

	useEffect(() => {
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	}, [pathname]);

	const renderNav = navbar.map((item, id) => {
		return (
			<li key={id} className={`${id === active ? 'nav__item active' : 'nav__item'}`}>
				<Link to={item.path}>{item.name}</Link>
			</li>
		);
	});

	useEffect(() => {
		const headerScroll = () => {
			if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
				headerRef.current.classList.add('show');
			} else {
				headerRef.current.classList.remove('show');
			}
		}

		window.addEventListener('scroll', headerScroll);

		return () => {
			window.removeEventListener('scroll', headerScroll);
		}
	}, [])


	return (
		<div className='header'>
			<div className="header__wrapper container">
				<div className="logo">
					<img src={logo} alt="logo" />
					<Link to='/'>vFilms</Link>
				</div>

				<ul className="header__navbar">
					{renderNav}
				</ul>

				<ul className='navbar__icons' ref={headerRef}>
					<Link to='/'><AiOutlineHome /></Link>
					<Link to='/movie'><BiMoviePlay /></Link>
					<Link to='/tv'><FaTv /></Link>
				</ul>

				<div className="account">
					<p className="account__text">Account</p>
					<FaUserAlt className='account__logo' />
				</div>
			</div>
		</div>
	);
}

export default Header;