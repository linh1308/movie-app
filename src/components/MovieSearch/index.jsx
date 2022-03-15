import React, { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import { category } from '../../api/category';
import tmdpApi from '../../api/tmdbApi';
import { movieType, tvType } from '../../api/type';
import Button from '../Button';
import './MovieSearch.scss';

const MovieSearch = ({ keyword, cate }) => {
    const [movies, setmovies] = useState([]);
    const [page, setPage] = useState({});
    const [totalPage, setTotalPage] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        const getMovies = async () => {
            let response;
            let params = {
                page,
            };
            if (!keyword) {
                switch (cate) {
                    case category.movie:
                        response = await tmdpApi.getMoviesList(movieType.popular, { params });
                        break;
                    default:
                        response = await tmdpApi.getTvList(tvType.popular, { params });
                }
            } else {
                params = {
                    query: keyword,
                    page
                };

                response = await tmdpApi.search(cate, { params });
                navigate('/movie/search/' + keyword, {replace: true})
            }

            setmovies(response.results);
            setTotalPage(response.total_pages);
            setPage(response.page);
        }

        getMovies();
    }, [cate, keyword, page]);

    const handleNextMovieClick = () => {
        if (page < totalPage) setPage(prev => prev + 1);
    }

    const handlePrevMovieClick = () => {
        if (page > 1) setPage(prev => prev - 1);
        if (page <= 1) setPage(1);
    }

    return (
        <>
            <div className="container movie-search__title">{keyword !== '' ? `Keyword: ${keyword}` : ''}</div>
            <div className='container movie-search'>
                {movies.map((movie, index) => {
                    return (
                        <div className="movie-search__item" key={index}>
                            <div className="movie-search__item-image" onClick={() => navigate(`/${cate}/${movie.id}`)}>
                                <img className='image' src={movie.backdrop_path ? apiConfig.w500Image(movie.backdrop_path) : apiConfig.w500Image(movie.poster_path)} alt="" />
                                <FaPlay className='icon' />
                            </div>
                            <div className="movie-search__item-content">
                                <p className='title'>{movie.title ? movie.title : movie.name}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="container buttons">
                <Button className="small prev" onClick={handlePrevMovieClick}>
                    Prev
                </Button>
                <Button className="small next" onClick={handleNextMovieClick}>
                    Next
                </Button>
            </div>
        </>
    )
}

export default MovieSearch;