const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '3f92af037addb42c5f78b17ec7ba8d0a',
    originalImage: imagePath => `https://image.tmdb.org/t/p/original/${imagePath}`,
    w500Image: imagePath => `https://image.tmdb.org/t/p/w500/${imagePath}`
}

export default apiConfig;