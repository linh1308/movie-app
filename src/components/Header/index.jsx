import React, { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.scss';
import { FaUserAlt } from 'react-icons/fa';

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
		window.scroll({top: 0, left: 0, behavior: 'smooth' });
	}, [pathname]);

	const renderNav = () => {
		const navList = navbar.map((item, id) => {
			return (
				<li key={id} className={`${id === active ? 'nav__item active' : 'nav__item'}`}>
					<Link to={item.path}>{item.name}</Link>
				</li>
			);
		});

		return navList;
	};

	useEffect(() => {
		const headerShrink = () => {
			if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
				headerRef.current.classList.add('shrink');
			} else {
				headerRef.current.classList.remove('shrink');
			}
		}

		window.addEventListener('scroll', headerShrink);

		return () => {
			window.removeEventListener('scroll', headerShrink);
		}
	}, [])


	return (
		<div className='header' ref={headerRef}>
			<div className="header__wrapper container">
				<div className="logo">
					<img src={logo} alt="logo" />
					<Link to='/'>vFilms</Link>
				</div>

				<ul className="header__navbar">
					{renderNav()}
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