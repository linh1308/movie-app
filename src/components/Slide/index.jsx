import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autoplay } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiConfig from '../../api/apiConfig';
import { category } from '../../api/category';
import tmdbApi from '../../api/tmdbApi';
import Button, { OutlineButton } from '../Button';
import Modal, { ModalContent } from '../Modal';
import './Slide.scss';

function Slide({movies}) {
    const moviesSlide = movies.slice(0, 5);

    return (
        <div className='slide'>
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 2500 }}
            >
                {moviesSlide.map((movie, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <SlideItem movie={movie} className='active' />
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {moviesSlide.map((movie, index) => {
                return (
                    <Trailer key={index} movie={movie} />
                );
            })}
        </div>
    );
}

const SlideItem = ({ movie, className }) => {
    let navigate = useNavigate();
    const background = apiConfig.originalImage(movie.backdrop_path ? movie.backdrop_path : movie.poster_path);

    
    const openModal = async () => {
        const modal = document.querySelector(`#modal-${movie.id}`);
        const video = await tmdbApi.getVideos(category.movie, movie.id);
        if (video.results.length > 0) {
            const src = 'https://www.youtube.com/embed/' + video.results[1].key;
            modal.querySelector('.modal-content iframe').setAttribute('src', src);
        } else {
            modal.querySelector('.modal-content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    }

    return (
        <div
            className={`slide-item ${className}`}
            style={{
                backgroundImage: `url(${background})`
            }}
        >
            <div className="slide-item__content container">
                <div className="slide-item__content--info">
                    <h2 className="title">{movie.title}</h2>
                    <div className="overview">{movie.overview}</div>
                    <div className="buttons">
                        <Button onClick={() => navigate('/movie/' + movie.id)}>
                            Watch now
                        </Button>

                        <OutlineButton onClick={openModal}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="slide-item__content--poster">
                    <img src={apiConfig.w500Image(movie.poster_path)} alt='poster' />
                </div>
            </div>
        </div>
    );
}

const Trailer = ({ movie }) => {
    const trailerRef = useRef();

    const onCloseModal = () => {
        trailerRef.current.setAttribute('src', '');
    }

    return (
        <Modal id={`modal-${movie.id}`}>
            <ModalContent onCloseModal={onCloseModal}>
                <iframe ref={trailerRef} width='100%' height='500px' title='trailer'></iframe>
            </ModalContent>
        </Modal>
    )
}

export default Slide;