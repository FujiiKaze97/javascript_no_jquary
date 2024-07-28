const cardData = (movie) => {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <p>${movie.overview}</p>
    <span>Rating: ${movie.vote_average}</span>
  `;
  //화살표 함수 사용 
  card.addEventListener('click', () => alert(`Movie ID: ${movie.id}`));
  return card;
}

// 웹페이지 시작 시 자동 포커스
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.focus();
  }
});

// Search Btn 'Enter' Keyboard push
function submitTextarea(event) {
  let key = event.key || event.keyCode;

  if (key === 'Enter' || key === 13) {
      alert('전송');
  }
}

document.getElementById('search-input').addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    searchInput.focus();
  }
});

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDAyZWEyNWM2M2ZjN2RlYzg5N2FmOTlkMDJlNzU4MCIsIm5iZiI6MTcyMjE5MTEyMy43MTIwMywic3ViIjoiNWY3ZWI0YTNiN2FiYjUwMDM4NmM0YjA0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.xRlIv96oS8Xd0Wx7vuqZS3uktVygLdfQWwbuFEXnFBU'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data  =>  
      //이후 데이터 처리 
      {
        const movies = data.results;
        const movieContainer = document.getElementById('movie-container');
        movies.forEach(movie => {
          const card = cardData(movie);
          movieContainer.appendChild(card);
      });
    })
    .catch(err => console.error(err));

    // Javascript search button 
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
    

