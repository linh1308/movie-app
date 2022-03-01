import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { category } from '../../api/category';
import tmdbApi from '../../api/tmdbApi';
import { movieType } from '../../api/type';
import { OutlineButton } from '../../components/Button';
import Listing from '../../components/Listing';
import Slide from '../../components/Slide';
import './Home.scss';

const Home = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const getAllMovies = async () => {
			const params = { page: 1 };
			const response = await tmdbApi.getMoviesList(movieType.popular, { params });
			setMovies(response.results);
		}

		getAllMovies();
	}, [])

	return (
		<div>
			<Slide movies={movies} />
			<div className="container">
				<div className="movie-list">
					<div className="movie-list__header">
						<h2>Popular movies</h2>
						<Link to='/movie'>
							<OutlineButton className='btn__outline--small'>View more</OutlineButton>
						</Link>
					</div>
					<Listing cate={category.movie} type={movieType.popular} />
				</div>
				<div className="movie-list">
					<div className="movie-list__header">
						<h2>Top rated movies</h2>
						<Link to='/movie'>
							<OutlineButton className='btn__outline--small'>View more</OutlineButton>
						</Link>
					</div>
					<Listing cate={category.movie} type={movieType.top_rated} />
				</div>
				<div className="movie-list">
					<div className="movie-list__header">
						<h2>Upcoming movies</h2>
						<Link to='/movie'>
							<OutlineButton className='btn__outline--small'>View more</OutlineButton>
						</Link>
					</div>
					<Listing cate={category.movie} type={movieType.upcoming} />
				</div>
				<div className="movie-list">
					<div className="movie-list__header">
						<h2>Popular TV-Shows</h2>
						<Link to='/movie'>
							<OutlineButton className='btn__outline--small'>View more</OutlineButton>
						</Link>
					</div>
					<Listing cate={category.tv} type={movieType.popular} />
				</div>
				<div className="movie-list">
					<div className="movie-list__header">
						<h2>Top rated TV-Shows</h2>
						<Link to='/movie'>
							<OutlineButton className='btn__outline--small'>View more</OutlineButton>
						</Link>
					</div>
					<Listing cate={category.tv} type={movieType.top_rated} />
				</div>
			</div>
		</div>
	);
}

export default Home;