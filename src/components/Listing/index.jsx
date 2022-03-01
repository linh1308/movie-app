import React, { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiConfig from '../../api/apiConfig';
import { category } from '../../api/category';
import tmdbApi from '../../api/tmdbApi';
import './Listing.scss';

const Listing = ({ cate, type, id }) => {
    const [movieListing, setMovieListing] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getMovieListing = async () => {
            let response;
            const params = {};
            if (type !== 'similar') {
                switch (cate) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(type, { params });
                }
            } else {
                response = await tmdbApi.similar(cate, id);
            }
            setMovieListing(response.results);
        }
        getMovieListing();
    }, [cate, id, type]);

    return (
        <div className='movie-listing'>
            <Swiper
                grabCursor={true}
                loop={true}
                spaceBetween={15}
                breakpoints={{
                    240: {
                        slidesPerView: 1
                    },

                    450: {
                        slidesPerView: 3
                    },

                    720: {
                        slidesPerView: 5
                    },

                    1024: {
                        slidesPerView: 7
                    }
                }}
            >
                {movieListing.map((movie, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className="movie-card">
                                <div className="movie-card__image" onClick={() => navigate(`/${cate}/${movie.id}`)}>
                                    <img className='image' src={movie.backdrop_path ? apiConfig.w500Image(movie.backdrop_path) : apiConfig.w500Image(movie.poster_path)} alt="" />
                                    <FaPlay className='icon' />
                                </div>
                                <div className="movie-card__content">
                                    <p className='title'>{movie.title ? movie.title : movie.name}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default Listing;