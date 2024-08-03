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
          <div class="userid">${data.name}</div>
          <div class="cardrating">
            <div class="rating">${data.score}</div>
          </div>
        </div>
        <p class="carddivider"></p>
        <div class="userreview">
          ${data.review}
        </div>
        <div class = "cardfooter">
          
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
// 영화 설명 함수
const getOverview = (data) => {
  const card = document.createElement('div');
  card.className = 'movie-overview';
  card.innerHTML = `
  <div class = "votebox">
  <div class = "vote">평균 별점</div>
  <div class = "star_box">
  <img class = "star" src = "source/Star_yellow.png"></img>
  <div class = "vote_average">${data.vote_average.toFixed(1)}</div>
  </div>
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
