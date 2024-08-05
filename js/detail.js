// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Firebase 구성 정보 설정
const firebaseConfig = {
  apiKey: "AIzaSyAcTX_5mbzFJeUantOQ4xZXah_aJtW96EQ",
  authDomain: "prac-0717.firebaseapp.com",
  projectId: "prac-0717",
  storageBucket: "prac-0717.appspot.com",
  messagingSenderId: "299955746969",
  appId: "1:299955746969:web:b6cbca8f52d9469732e008"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 폰트
(function(d) {
  var config = {
    kitId: 'xlw1ylc',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);

  //  리뷰 카드 함수
  const getReview = (data) => {
    const card = document.createElement('div');
     card.className = 'cards';
       card.innerHTML = `<div class="cards_header">
          <div class="user_id">${data.name}</div>
          <div class="card_rating">
            <div class="rating">${data.score}</div>
          </div>
        </div>
        <p class="card_divider"></p>
        <div class="user_review">
          ${data.review}
        </div>
        <div class = "card_footer">
          <div><img class = "comment_icon" src ="source/comments.png"></img></div>
          <div class = "comment_num">5</div>
        </div>`;
      return card;
     }

// 리뷰 불러오기
let docs = await getDocs(collection(db, "review"));
docs.forEach((doc) => {
  const cardsContainer = document.getElementById('cards_container');
  const card = getReview(doc.data());
  cardsContainer.appendChild(card);

})

// movie id 받기
const receivedData = location.href.split('?')[1];
console.log(receivedData); // data

// 클릭 시 받은 id값 local storage에 저장 - by 해인 start ==========
// localStorage에 저장하기
const SaveId = (id) => {
  localStorage.setItem('recent_movies', JSON.stringify(id));
}
// localStorage 불러오기
const GetIds = (key) => {
  let localData = JSON.parse(localStorage.getItem(key))
  return localData;
}
if (localStorage.getItem('recent_movies')) {
  //로컬 스토리지에 recent_movies 가 있을경우 내용 추가
  let recentMovieList = GetIds('recent_movies');

  if (!recentMovieList.includes(receivedData)) {
    console.log(recentMovieList)
    recentMovieList.unshift(receivedData);
    localStorage.setItem('recent_movies', JSON.stringify(recentMovieList));
  } else { // 이미 본 영화도 최신 순위로 올림
    const idx = recentMovieList.indexOf(receivedData);
    recentMovieList.splice(idx,1);
    recentMovieList.unshift(receivedData);
    SaveId(recentMovieList);
  }


  if (GetIds('recent_movies').length > 5) {
    const newMovieList = recentMovieList.splice(0,5);
    SaveId(newMovieList);
  }

} else {
  //로컬 스토리지에 reviews가 없을 경우 새로운 배열 저장
  SaveId([receivedData]);
}
// 클릭 시 받은 id값 local storage에 저장 - by 해인 end ==========

// 포스터 함수
const getPoster = (data) => {
  const card = document.createElement('div');
  card.className = 'movie_poster';
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" height ="480">
  `;
  return card;
}

// 영화 제목 함수
const getTitle = (data) => {
  const card = document.createElement('div');
  card.className = 'movie_title';
  card.innerHTML = `
    <div class = "korean_title">${data.title}</div>
    <div class = "original_title">${data.original_title}</div>
  `;
  return card;
}


// 영화 설명 함수
const getOverview = (data) => {
  let genreArr = data.genres.map(x => x.name);
  console.log(genreArr)
  const card = document.createElement('div');
  card.className = 'movie-overview';
  card.innerHTML = `
  <div class = "vote_box">
  <div class = "vote">평균 별점</div>
  <div class = "star_box">
  <img class = "star" src = "source/Star_yellow.png"></img>
  <div class = "vote_average">${data.vote_average.toFixed(1)}</div>
  </div>
  </div>
  <p class = "movie_info">${data.release_date} | ${genreArr} | ${data.runtime}분</p>
  <p class = "divider"></p>
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

const recentContainer = document.getElementsByClassName('close_recent_movies_btn_container')[0]
                                .nextElementSibling; // recentMovie.js와 다른 부분 (container라는 다른 요소 존재해서 수정)
console.log('recent Movie Container :', recentContainer);
const showRecentMovies = (ids) => {
  console.log('ids :', ids);
  ids.forEach(async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, options);
    const data = await response.json();

    const card = getRecentPoster(data);
    console.log(card);
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

   // 카드별 클릭 이벤트
function addCardClickEvent() {

  try {
    const cardsHeader = document.querySelectorAll('.cards');

    cardsHeader.forEach((card) => {
      card.addEventListener('click', (e) => {

      });
    });

  } catch (e) {
    console.log(e);
  }
}

addCardClickEvent();

