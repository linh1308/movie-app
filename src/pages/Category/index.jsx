import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { category as cate } from '../../api/category';
import Button from '../../components/Button';
import MovieSearch from '../../components/MovieSearch';
import './Category.scss';

const Category = () => {
	const { category } = useParams();
	const [value, setValue] = useState('');
	const [keyword, setKeyword] = useState('');
	const handleOnClick = () => {
		setKeyword(value);
	};

	return (
		<div className='search'>
			<div className="container search-header">
				<div className="search-header__title">
					{category === cate.movie ? 'Movies' : 'TV Shows'}
				</div>

				<div className='search-header__input'>
					<input type="text" placeholder='Enter your keyword...' onChange={(e) => setValue(e.target.value)} />
					<Button className='btn--small' onClick={handleOnClick}>Search</Button>
				</div>
			</div>

			<div className="container movie-search-list">
				<MovieSearch keyword={keyword} cate={category} />
			</div>
		</div>
	);
}

export default Category;