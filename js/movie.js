const cardData = (movie) => {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <div class="movie-card-content">
      <h3>${movie.title}</h3>
      <p>${movie.overview}</p>
      <span>Rating: ${movie.vote_average}</span>
    </div>
  `;
  // 화살표 함수 사용
  card.addEventListener('click', () => window.location.href = "movieDetail.html");
  return card;
}

// 웹페이지 시작 시 자동 포커스
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.focus();
  }

  // 초기 데이터 로드
  loadMovies(currentPage);
});

// 키다운 이벤트
document.addEventListener("keydown", function(event) {
  if (event.key === 'Enter') {
    document.getElementById('search-button').click();
  }
});

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDAyZWEyNWM2M2ZjN2RlYzg5N2FmOTlkMDJlNzU4MCIsIm5iZiI6MTcyMjE5MTEyMy43MTIwMywic3ViIjoiNWY3ZWI0YTNiN2FiYjUwMDM4NmM0YjA0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.xRlIv96oS8Xd0Wx7vuqZS3uktVygLdfQWwbuFEXnFBU'
  }
};

// 현재 페이지 상태 관리
let currentPage = 1;

// 영화 데이터를 로드하는 함수
function loadMovies(page) {
  fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&region=KR`, options)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      const movieContainer = document.getElementById('movie-container');
      movieContainer.innerHTML = ''; // 이전 영화 목록 제거

      movies.forEach(movie => {
        const card = cardData(movie);
        movieContainer.appendChild(card);
      });

      // 페이지네이션 상태 업데이트
      document.getElementById('page-number').textContent = `Page: ${page}`;

      // 이전 페이지 버튼 활성화/비활성화
      const prevButton = document.getElementById('prev-page');
      prevButton.disabled = page === 1;

      // 다음 페이지 버튼 활성화/비활성화
      const nextButton = document.getElementById('next-page');
      nextButton.disabled = page === data.total_pages;

    })
    .catch(err => console.error(err));
}

// 페이지네이션 버튼 이벤트 핸들러
document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadMovies(currentPage);
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  currentPage++;
  loadMovies(currentPage);
});

// 검색 버튼 이벤트 핸들러
document.getElementById('search-button').addEventListener('click', () => {
  // 무조건 소문자로 처리하여.. 대소문자 상관없이..
  const query = document.getElementById('search-input').value.toLowerCase();
  const movieCards = document.querySelectorAll('.movie-card');
  movieCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    if (title.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

