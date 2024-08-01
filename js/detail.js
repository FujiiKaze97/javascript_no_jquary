// movie id 받기
const receivedData = location.href.split('?')[1];
console.log(receivedData); // data

// 포스터 함수
const getPoster = (data) => {
  const card = document.createElement('div');
  card.className = 'movie-poster';
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" height ="480">
  `;
  return card;
}

// 영화 제목 함수
const getTitle = (data) => {
  const card = document.createElement('div');
  card.className = 'movie-title';
  card.innerHTML = `
    ${data.title}
  `;
  return card;
}

const getOverview = (data) => {
  const card = document.createElement('div');
  card.className = 'movie-overview';
  card.innerHTML = `
  <div class = "votebox">
  <div class = "vote">평균 별점</div>
  <img class = "star" src = "source/Star 8.png"></img>
  <div class = "vote_average">${data.vote_average.toFixed(1)}</div>
  </div>
  <p class = "divider"><p>
  <div>${data.overview}</div>
  `;
  return card;
}


// 영화 데이터 로드
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODIzOGJlNTY1OGI2ZGQzMWE2MTNmYWFiZTQwZWE0NCIsIm5iZiI6MTcyMTk4OTk0Ny4zNTA0NDYsInN1YiI6IjY2YTM3NWYyMGFhZWFiNGFhYTVkOTEyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xZ_eqaFieqiHfkMA2WlRBn_dBBc-6gBSbFXjWKdkRpY'
  }
};

fetch(`https://api.themoviedb.org/3/movie/${receivedData}?language=ko-KR`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const movieDetail = document.getElementById('movie_poster');
    const poster = getPoster(data);
    movieDetail.appendChild(poster);

    const movieTitle = document.getElementById('movie_title');
    const title = getTitle(data);
    movieTitle.appendChild(title);

    const movieOverview = document.getElementById('movie_overview');
    const overview = getOverview(data);
    movieOverview.appendChild(overview);

  })
  .catch(err => console.error(err));
