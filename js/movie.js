// 현재 페이지 상태 관리
let currentPage = 1;


const cardData = (movie) => {
  const card = document.createElement('div');
  card.className = 'movie_card';
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <div class="movie-card-content">
      <h3>${movie.title}</h3>
      <p>${movie.overview}</p>
      <span> 
      ${movie.vote_average.toFixed(1)}</span>
    </div>
  `;
  // 화살표 함수 사용
  card.addEventListener('click', () => window.location.href = `movieDetail.html?${movie.id}`);
  return card;
}

// 웹페이지 시작 시 자동 포커스
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search_input');
  if (searchInput) {
    searchInput.focus();
  }
  // 초기 데이터 로드
  loadMovies(currentPage);
  // 페이지네이션 Number 처리
  setPageNum();
  addPageClickEvent();
  isPrevNext();
});

// 키다운 이벤트
document.addEventListener("keydown", function (event) {
  if (event.key === 'Enter') {
    document.getElementById('search_button').click();
  }
});

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDAyZWEyNWM2M2ZjN2RlYzg5N2FmOTlkMDJlNzU4MCIsIm5iZiI6MTcyMjE5MTEyMy43MTIwMywic3ViIjoiNWY3ZWI0YTNiN2FiYjUwMDM4NmM0YjA0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.xRlIv96oS8Xd0Wx7vuqZS3uktVygLdfQWwbuFEXnFBU'
  }
};


// 영화 데이터를 로드하는 함수
function loadMovies(page) {

  try {
    fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}&language=ko-KR&region=KR`, options)
      .then(response => response.json())
      .then(data => {
        const movies = data.results;
        const movieContainer = document.getElementById('movie_container');
        movieContainer.innerHTML = ''; // 이전 영화 목록 제거

        movies.forEach(movie => {
          const card = cardData(movie);
          movieContainer.appendChild(card);
        });
      })
      .catch(e => console.error(e));
  } catch (e) {
    console.log(e);
  }
}

// 페이지네이션 버튼 이벤트 핸들러
document.getElementById('prev_page').addEventListener('click', () => {
  try {
    if (currentPage > 1) {
      loadMovies(--currentPage);
      setPageNum();
      addPageClickEvent();
      isPrevNext();
    }
  } catch (e) {
    console.log(e);
  }
});

document.getElementById('next_page').addEventListener('click', () => {
  try {
    loadMovies(++currentPage);
    setPageNum();
    addPageClickEvent();
    isPrevNext();
  } catch (e) {
    console.log(e);
  }

});

// 검색 버튼 이벤트 핸들러
document.getElementById('search_button').addEventListener('click', () => {
  try {
    // 무조건 소문자로 처리하여.. 대소문자 상관없이..
    const query = document.getElementById('search_input').value.toLowerCase();
    const movieCards = document.querySelectorAll('.movie_card');
    movieCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      if (title.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  } catch (e) {
    console.log(e);
  }
});

// Feature : MainPage Pagenation 
function setPageNum() {
  try {
    const numberButtonWrapper = document.querySelector('.number_button_wrapper');
    numberButtonWrapper.innerHTML = ''; // 페이지 번호 wrapper 내부를 비워줌
    
    if (currentPage >= 6) {
      for (let i = currentPage - 5; i < currentPage + 5; i++) {
        numberButtonWrapper.innerHTML += `<span class="number_button ${currentPage === i ? 'selected' : ''}"> ${i} </span`;
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        numberButtonWrapper.innerHTML += `<span class="number_button ${currentPage === i ? 'selected' : ''}"> ${i} </span`;
      }
    }
  } catch (e) {
    console.log(e);
  }

};

  // 페이지별 클릭 이벤트 
function addPageClickEvent() {

  try {
    const pageNumberButtons = document.querySelectorAll('.number_button');

    pageNumberButtons.forEach((numberButton) => {
      numberButton.addEventListener('click', (e) => {
        currentPage = +e.target.innerHTML;
        loadMovies(currentPage);
        setPageNum();
        addPageClickEvent();
        isPrevNext();
      });
    });

  } catch (e) {
    console.log(e);
  }
}

// 이전, 다음 버튼이 최솟값 , 최댓값일 때는 활성화 되지 않도록 
function isPrevNext() {
  try {
    // 이전 페이지 버튼 활성화/비활성화
    const prevButton = document.getElementById('prev_page');
    prevButton.disabled = currentPage === 1;

    // 다음 페이지 버튼 활성화/비활성화
    const nextButton = document.getElementById('next_page');
    nextButton.disabled = currentPage === 500;
  } catch (e) {
    console.log(e);
  }
}