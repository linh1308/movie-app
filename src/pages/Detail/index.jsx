import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SwiperSlide, Swiper } from 'swiper/react';
import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';
import Listing from '../../components/Listing';
import white from '../../images/white_bg.jpg';
import './Detail.scss';

const Detail = () => {
	const [casterList, setCasterList] = useState([]);
	const [movie, setMovie] = useState({});
	const [videos, setVideos] = useState([]);
	let { category, id } = useParams();

	useEffect(() => {
		const getDetail = async () => {
			const params = {};
			let responseDetail = await tmdbApi.detail(category, id, { params });
			let responseCredit = await tmdbApi.credits(category, id);
			let responseTrailer = await tmdbApi.getVideos(category, id);
			setMovie(responseDetail);
			setCasterList(responseCredit.cast.slice(0, 12));
			setVideos(responseTrailer.results.slice(0, 4));
		}

		getDetail();
	}, [category, id]);

	return (
		<div className='movie-detail'>
			<div className="container movie-detail__hero"
				style={{ backgroundImage: `url('${movie.backdrop_path ? apiConfig.originalImage(movie.backdrop_path) : apiConfig.originalImage(movie.poster_path)}')` }}
			>
				<div className="hero-poster">
					<img src={movie.poster_path ? apiConfig.w500Image(movie.poster_path) : apiConfig.w500Image(movie.backdrop_path)} alt="poster" />
				</div>

				<div className="hero-infor">
					<h3 className="name">{movie.name ? movie.name : movie.title}</h3>
					<p className="desc">{movie.overview}</p>
				</div>
			</div>

			<div className="container movie-detail__caster">
				<h3>Caster</h3>
				<Swiper
					grabCursor={true}
					loop={true}
					spaceBetween={15}
					breakpoints={{
						240: {
							slidesPerView: 1
						},

						450: {
							slidesPerView: 2
						},

						650: {
							slidesPerView: 3
						},

						800: {
							slidesPerView: 4
						},

						1000: {
							slidesPerView: 5
						},

						1350: {
							slidesPerView: 7
						}
					}}
				>
					{casterList ? casterList.map((caster, index) => {
						return (
							<SwiperSlide key={index}>
								<img src={caster.profile_path ? apiConfig.w500Image(caster.profile_path) : white} alt="caster" className='caster-image'/>
								<p className="name">{caster.name}</p>
							</SwiperSlide>
						)
					}) : ''}
				</Swiper>
			</div>

			<div className="container movie-detail__videos">
				{videos.map((video, index) => {
					return (
						<div className="video" key={video.key}>
							<h3 className="title">{video.name}</h3>
							<iframe src={`https://youtube.com/embed/${video.key}`} title='video' width='100%' className='video-embed'></iframe>
						</div>
					)
				})}
			</div>

			<div className="container movie-detail__similar">
				<h3>Similar {category === 'movie' ? 'Movies' : 'TV Shows'}</h3>
				<Listing cate={category} type='similar' id={id} />
			</div>
		</div>
	);
}

export default Detail;