// code by 해인
// 최근 클릭한 영화 보여주기

// options가 movie.js에 선언되어 있어 여기서는 별도 선언 안함.


// localStorage에 저장하기
const SaveData = (id) => {
  console.log('save data :', id)
  localStorage.setItem('recent_movies', JSON.stringify(id));
}
// localStorage 불러오기
const GetData = (key) => {
  let localData = JSON.parse(localStorage.getItem(key))
  return localData;
}



// 포스터 함수
const getRecentPoster = (data) => {
  const card = document.createElement('div');
  card.className = 'recent_movie_card';
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}">
  `;
  card.addEventListener('click', () => window.location.href = `movieDetail.html?${data.id}`);
  return card;
}

const recentContainer = document.getElementsByClassName('recent_movie_container')[0];
const showRecentMovies = (ids) => {
  // 영화 데이터 로드
  let options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDAyZWEyNWM2M2ZjN2RlYzg5N2FmOTlkMDJlNzU4MCIsIm5iZiI6MTcyMjg1NzY3OS4xODE0OTMsInN1YiI6IjVmN2ViNGEzYjdhYmI1MDAzODZjNGIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KjkZs4T3Os7iQyt71mQRxP26d_hUw7ntES4POn6Lgco'
    }
  };
  // console.log('ids :', ids);
  ids.forEach(async (id) => {
    // console.log('recent movie id:', id);
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, options);
    const data = await response.json();

    const card = getRecentPoster(data);
    recentContainer.appendChild(card);
  })
  console.log('recent movie cards created')
}

// console.log(GetData('recent_movies'));
showRecentMovies(GetData('recent_movies'));



// '최근' 버튼 누르면 최근 본 영화 보이게 하기
const recentMovieContainer = document.getElementsByClassName('recent_movies_container_outer')[0];
const recentMoviesBtn = document.getElementById('recent_movies_btn');
recentMoviesBtn.addEventListener('click', () => {
  
  recentMovieContainer.classList.add('open');
  recentMovieContainer.style.display = 'block';

  recentMoviesBtn.style.display = 'none';
  setTimeout(() => {
    recentMovieContainer.classList.remove('open');
  }, 800);
})

// // '최근' 버튼 누르면 최근 본 영화 보이게 하기
const closeMoviesBtn = document.getElementById('close_recent_movies_btn');
closeMoviesBtn.addEventListener('click', () => {
  
  recentMovieContainer.classList.add('close');

  setTimeout(() => {
  recentMoviesBtn.style.display = 'block';
  recentMovieContainer.classList.remove('close');
  recentMovieContainer.style.display = 'none';
  }, 800);
})


