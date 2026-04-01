// TMDb API 정보 및 KEY (사용자 제공)
const API_KEY = 'c61017a698f8a966f3fb0a7c3dd72590';

// movie/now_playing 으로 변경하여 현재 상영작 중 포스터와 제목을 함께 가져옴
// language=ko-KR 옵션으로 한국어 제목/설정을 가져올 수 있도록 세팅합니다.
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`;
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // 포스터 이미지 호스팅 주소

const movieContainer = document.getElementById('movie-container');

// 페이지 로드 시 바로 실행하여 영화 데이터 호출
document.addEventListener('DOMContentLoaded', fetchNowPlayingMovies);

/**
 * TMDb API를 호출하여 현재 상영중인 영화 데이터를 가져오는 함수
 */
async function fetchNowPlayingMovies() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`API 호출 에러: ${response.status}`);
        }

        const data = await response.json();
        const movies = data.results;

        // 영화 데이터를 기반으로 화면에 렌더링
        renderMovies(movies);
    } catch (error) {
        console.error("데이터 통신 중 오류 발생:", error);
        movieContainer.innerHTML = `<p class="message">영화 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>`;
    }
}

/**
 * 전달받은 영화 배열을 순회하며 HTML에 붙여넣는 함수
 * @param {Array} movies API로부터 받은 영화 데이터 배열
 */
function renderMovies(movies) {
    if (!movies || movies.length === 0) {
        movieContainer.innerHTML = `<p class="message">현재 상영 중인 영화가 없습니다.</p>`;
        return;
    }

    // 초기화
    movieContainer.innerHTML = '';

    movies.forEach(movie => {
        // 포스터 이미지가 없는 영화는 카드 생성에서 제외하여 UI 깔끔하게 유지
        if (!movie.poster_path) return;

        const { title, poster_path } = movie;

        // 동적으로 div(영화 카드) 엘리먼트 생성
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        // 카드 내부에 넣을 HTML 구조 (이미지 & 제목 호버 영역)
        movieCard.innerHTML = `
            <img class="poster-img" src="${IMG_BASE_URL}${poster_path}" alt="${title} 포스터" loading="lazy">
            <div class="movie-info">
                <h3 class="movie-title">${title}</h3>
            </div>
        `;

        movieContainer.appendChild(movieCard);
    });
}

