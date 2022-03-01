import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Footer.scss';

const Footer = () => {
	return (
		<div className='footer'>
			<div className="container footer-content">
				<div className="footer-content__header">
					<div className="footer-content__logo">
						<img src={logo} alt="logo" />
						<Link to='/'>vFilms</Link>
					</div>

					<div className="footer-content__socials">
						<FaFacebook className='footer-content__socials-icons'/>
						<FaInstagram className='footer-content__socials-icons'/>
						<FaTwitter className='footer-content__socials-icons'/>
						<FaLinkedin className='footer-content__socials-icons'/>
						<FaYoutube className='footer-content__socials-icons'/>
					</div>
				</div>

				<div className="footer-content__lists">
					<div className="footer-content__list">
						<h3 className='title'>Watch</h3>
						<Link to='/'>Spotlight</Link>
						<Link to='/'>Movies</Link>
						<Link to='/'>TV Shows</Link>
						<Link to='/'>Free</Link>
					</div>
					<div className="footer-content__list">
						<h3 className='title'>My Account</h3>
						<Link to='/'>My vFilm</Link>
						<Link to='/'>Account</Link>
						<Link to='/'>Settings</Link>
						<Link to='/'>Manage Devices</Link>
					</div>
					<div className="footer-content__list">
						<h3 className='title'>Features</h3>
						<Link to='/'>Lists</Link>
						<Link to='/'>Family</Link>
						<Link to='/'>Gift Cards</Link>
						<Link to='/'>Movies Anywhere</Link>
						<Link to='/'>InstaWatch</Link>
						<Link to='/'>Disc to Digital</Link>
					</div>
					<div className="footer-content__list">
						<h3 className='title'>Help</h3>
						<Link to='/'>About us</Link>
						<Link to='/'>Devices</Link>
						<Link to='/'>Customer Support</Link>
						<Link to='/'>Forums</Link>
						<Link to='/'>Contact us</Link>
						<Link to='/'>Jobs</Link>
					</div>
				</div>
			</div>

			<div className="container footer-terms">
				<div className="copy-rights">
					© 2022 Copyrights 
				</div>

				<div className="terms-policy">
					<Link to='/'>Terms and Policies</Link>
					<Link to='/'>AdChoices</Link>
					<Link to='/'>Feedback</Link>
				</div>
			</div>
		</div>
	);
}

export default Footer;