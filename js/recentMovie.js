// code by 해인
// 최근 클릭한 영화 보여주기


// localStorage에 저장하기
const SaveData = (id) => {
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

const recentContainer = document.getElementsByClassName('container')[0];
// console.log(recentMovieContainer);
const showRecentMovies = (ids) => {
  ids.forEach(async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, options);
    const data = await response.json();
    // console.log(data);

    const card = getRecentPoster(data);
    recentContainer.appendChild(card);
  })
  console.log('recent movie cards created')
}

console.log(GetData('recent_movies'));
showRecentMovies(GetData('recent_movies'));



// '최근' 버튼 누르면 최근 본 영화 보이게 하기
const recentMovieContainer = document.getElementsByClassName('recent_movies_container')[0];
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


