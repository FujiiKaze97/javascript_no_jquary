// movie id 받기
const receivedData = location.href.split('?')[1];
console.log(receivedData); // data

// detail 함수
const cardData = (data) => {
  const card = document.createElement('div');
  card.className = 'data-card';
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}">
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
    console.log("영화 데이터 로드 111");
    console.log(data);
    const movieDetail = document.getElementById('movie_poster');
    console.log(movieDetail);
    const card = cardData(data);
    movieDetail.appendChild(card);
    console.log("영화 데이터 로드 222");
  })
  .catch(err => console.error(err));
