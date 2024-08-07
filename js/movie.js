const PER_PAGE = 48;
const PER_API = 20;

// 현재 페이지 상태 관리
let currentPage = window.localStorage.getItem('currentPage') !== null ? parseInt(window.localStorage.getItem('currentPage')) : 1;
// let currentApiPageInfo = getApiPage(currentApiPage);


const cardData = (movie) => {
  const card = document.createElement('div');
  card.className = 'movie_card';
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <div class="movie_card_content">
      <p>${movie.title}</p>
      <div class ="movie_card_rating">
      <img class = "star_main" src = "source/Star_yellow.png"></img>
      <span>${movie.vote_average.toFixed(1)}</span>
      </div>
    </div>
  `;
  // card.innerHTML = `
  //   <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
  //   <div class="movie_card_content">
  //     <h3>${movie.title}</h3>
  //     <p>${movie.overview}</p>
  //     <div class ="movie_card_rating">
  //     <img class = "star_main" src = "source/Star_yellow.png"></img>
  //     <span>${movie.vote_average.toFixed(1)}</span>
  //     </div>
  //   </div>
  // `;


  // 화살표 함수 사용 
  card.addEventListener('click', () => {
    window.location.href = `movieDetail.html?${movie.id}`
  }
  );
  return card;
}

// 웹페이지 시작 시 자동 포커스
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search_input');
  if (searchInput) {
    searchInput.focus();
  }
  // 초기 데이터 로드
  loadMovies();
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
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDAyZWEyNWM2M2ZjN2RlYzg5N2FmOTlkMDJlNzU4MCIsIm5iZiI6MTcyMjg1NzY3OS4xODE0OTMsInN1YiI6IjVmN2ViNGEzYjdhYmI1MDAzODZjNGIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KjkZs4T3Os7iQyt71mQRxP26d_hUw7ntES4POn6Lgco'
  }
};


// 영화 데이터를 로드하는 함수
// function loadMovies() {

//   try {
//     fetch(`https://api.themoviedb.org/3/movie/popular?page=${currentPage}&language=ko-KR&region=KR`, options)
//       .then(response => response.json())
//       .then(data => {
//         const movies = data.results;
//         const movieContainer = document.getElementById('movie_container');
//         movieContainer.innerHTML = ''; // 이전 영화 목록 제거

//         movies.forEach(movie => {
//           const card = cardData(movie);
//           movieContainer.appendChild(card);
//         });
//       })
//       .catch(e => console.error(e));
//   } catch (e) {
//     console.log(e);
//   }
// }

// 페이지네이션 버튼 이벤트 핸들러
document.getElementById('prev_page').addEventListener('click', () => {
  try {
    if (currentPage > 1) {
      currentPage--;
      loadMovies();
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
    currentPage++;
    loadMovies();
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

// 메인화면 Pagenation - 전 세션 번호 기억하여, 해당 번호로 이동하고, 뒤로가기나 홈으로 가도
// 해당 선택한 영화의 페이지로 바로 클라이언트가 이동할 수 있도록... 
function setPageNum() {
  try {
    const numberButtonWrapper = document.querySelector('.number_button_wrapper');
    numberButtonWrapper.innerHTML = ''; // 페이지 번호 wrapper 내부를 비워줌
    window.localStorage.setItem('currentPage', currentPage);
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



// 영화 데이터를 로드하는 함수
function loadMovies() {

  try {
    const movieContainer = document.getElementById('movie_container');
    movieContainer.innerHTML = ''; // 이전 영화 목록 제거

    // let [currentApiPage, startIdxArray] = getApiPage(currentPage);
    let currentApiPage = Math.ceil((PER_PAGE * (currentPage - 1)) / PER_API) === 0 ? 1 : Math.ceil((PER_PAGE * (currentPage - 1)) / PER_API);
    let starIdx = (PER_PAGE * (currentPage - 1)) % PER_API;
    let cardCount = 0;

    let tmpApiPage = currentApiPage;
    // while (cardCount < 48) {
    console.log('cardCount :', cardCount);


    console.log('current api page :', currentApiPage);
    for (let i = tmpApiPage; i < currentApiPage + 4; i++) {

      if (i === currentApiPage ) {
        fetch(`https://api.themoviedb.org/3/movie/popular?page=${i}&language=ko-KR&region=KR`, options)
          .then(response => response.json())
          .then(data => {
            console.log('tmp Api Page :', tmpApiPage);

            const movies = data.results;

            movies.forEach((movie, idx) => {
              if (idx >= starIdx) {
                cardCount++;
                console.log('cardCount :', cardCount);
                const card = cardData(movie);
                movieContainer.appendChild(card);
              }
            });
          })
          .catch(e => console.error(e));
      } else if (i !== currentApiPage && cardCount < PER_PAGE) {
        fetch(`https://api.themoviedb.org/3/movie/popular?page=${i}&language=ko-KR&region=KR`, options)
          .then(response => response.json())
          .then(data => {
            console.log('tmp Api Page :', tmpApiPage);

            const movies = data.results;

            movies.forEach((movie) => {
              cardCount++;
              console.log('cardCount :', cardCount);
              if (cardCount <= PER_PAGE) {
                const card = cardData(movie);
                movieContainer.appendChild(card);
              }
            });
          })
          .catch(e => console.error(e));
      }

    }

  } catch (e) {
    console.log(e);
  }
}