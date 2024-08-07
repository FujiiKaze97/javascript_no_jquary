// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { collection, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { query, where } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"; // 필요한 모듈 가져오기

// Firebase 구성 정보 설정
// const firebaseConfig = { // 해인
//   apiKey: "AIzaSyAcTX_5mbzFJeUantOQ4xZXah_aJtW96EQ",
//   authDomain: "prac-0717.firebaseapp.com",
//   projectId: "prac-0717",
//   storageBucket: "prac-0717.appspot.com",
//   messagingSenderId: "299955746969",
//   appId: "1:299955746969:web:b6cbca8f52d9469732e008"
// };
const firebaseConfig = { // 홍승우
  apiKey: "AIzaSyAr-pkDJkrblenxK5GSlWssdFrSEhvLdrU",
  authDomain: "sparta-90385.firebaseapp.com",
  projectId: "sparta-90385",
  storageBucket: "sparta-90385.appspot.com",
  messagingSenderId: "299275891543",
  appId: "1:299275891543:web:6224af1407759225310412"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// movie id 받기
export const MOVIE_ID = location.href.split('?')[1];


// 폰트
(function (d) {
  var config = {
    kitId: 'xlw1ylc',
    scriptTimeout: 3000,
    async: true
  },
    h = d.documentElement, t = setTimeout(function () { h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive"; }, config.scriptTimeout), tk = d.createElement("script"), f = false, s = d.getElementsByTagName("script")[0], a; h.className += " wf-loading"; tk.src = 'https://use.typekit.net/' + config.kitId + '.js'; tk.async = true; tk.onload = tk.onreadystatechange = function () { a = this.readyState; if (f || a && a != "complete" && a != "loaded") return; f = true; clearTimeout(t); try { Typekit.load(config) } catch (e) { } }; s.parentNode.insertBefore(tk, s)
})(document);

//  리뷰 카드 함수
const getReview = (data) => {
  const card = document.createElement('div');
  card.className = 'cards';
  // card.innerHTML = `<div class="cards_header">
  //         <div class="user_id">${data.name}</div>
  //         <div class="card_rating">
  //           <div class="rating">${data.score}</div>
  //         </div>
  //       </div>
  //       <p class="card_divider"></p>
  //       <div class="user_review">
  //         ${data.review}
  //       </div>
  //       <div class = "card_footer">
  //         <div><img class = "comment_icon" src ="source/comments.png"></img></div>
  //         <div class = "comment_num">5</div>
  //       </div>`;

  card.innerHTML = `<div class="cards_header">
            <div class="user_id">${data.name}</div>
            <div class="card_rating">
              <div class="rating">${data.score}</div>
            </div>
          </div>
          <p class="card_divider"></p>
          <div class="user_review">
            ${data.review}
          </div>`;


  // 카드에 데이터 속성 추가 (이름, 점수, 리뷰)
  card.dataset.name = data.name;
  card.dataset.score = data.score;
  card.dataset.review = data.review;
  card.dataset.id = data.movie;

  return card;
}


document.addEventListener('DOMContentLoaded', async () => {
  try {
    getMovieData();
    const reviewContainer = document.getElementsByClassName('slide')[0];
    reviewContainer.innerHTML = `
      <div class="slide_prev_button slide_button">이전</div>
      <div class="slide_next_button slide_button">다음</div>
      <ul class="slide_pagination">`;

    const docsSnapshot = await getDocs(query(
      collection(db, "review"), // review 컬렉션 지정
      where("movie", "==", MOVIE_ID) // movie 필드와 일치하는 값으로 필터링
    ));

    let cardsContainer = document.createElement('ul');
    cardsContainer.className = 'slide_items';
    let gridColumn = 0;
    let windowWidth = window.innerWidth;
    console.log('window width:', windowWidth);
    if (windowWidth > 1460) {
      gridColumn = 4;
    } else if (windowWidth > 992) {
      gridColumn = 3;
    } else if (windowWidth > 630) {
      gridColumn = 2;
    } else {
      gridColumn = 1;
    }
    console.log('grid col :', gridColumn);
    let cardCount = 0;
    docsSnapshot.forEach((doc) => {
      cardCount++;
      const card = getReview(doc.data());
      card.id = doc.id;
      cardsContainer.appendChild(card);
      if (cardCount % (gridColumn * 2) === 0) {
        reviewContainer.appendChild(cardsContainer);
        cardsContainer = document.createElement('ul');
        cardsContainer.className = 'slide_items';
      }
    });
    reviewContainer.appendChild(cardsContainer);
    // swipe 추가 - 해인 =======================
    // 슬라이크 전체 크기(width 구하기)
    const slide = document.querySelector(".slide");
    let slideWidth = slide.clientWidth;
    // // 버튼 엘리먼트 선택하기
    // let prevBtn = document.querySelector(".slide_prev_button");
    // let nextBtn = document.querySelector(".slide_next_button");
    // 슬라이드 전체를 선택해 값을 변경해주기 위해 슬라이드 전체 선택하기
    let slideItems = document.querySelectorAll(".slide_items");
    console.log('slide items :', slideItems);
    // console.log('slide items ', slideItems.length);
    // 현재 슬라이드 위치가 슬라이드 개수를 넘기지 않게 하기 위한 변수
    let maxSlide = slideItems.length;
    // 버튼 클릭할 때 마다 현재 슬라이드가 어디인지 알려주기 위한 변수
    let currSlide = 1;
    // 페이지네이션 생성
    const pagination = document.querySelector(".slide_pagination");
    for (let i = 0; i < maxSlide; i++) {
      if (i === 0) pagination.innerHTML += `<li class="active">•</li>`;
      else pagination.innerHTML += `<li>•</li>`;
    }
    const paginationItems = document.querySelectorAll(".slide_pagination > li");
    function nextMove(slideItems) {
      console.log('nextMove clicked');
      currSlide++;
      // 마지막 슬라이드 이상으로 넘어가지 않게 하기 위해서
      if (currSlide <= maxSlide) {
        // 슬라이드를 이동시키기 위한 offset 계산
        const offset = slideWidth * (currSlide - 1);
        // 각 슬라이드 아이템의 left에 offset 적용
        slideItems.forEach((i) => {
          i.setAttribute("style", `left: ${-offset}px`);
        });
        // 슬라이드 이동 시 현재 활성화된 pagination 변경
        paginationItems.forEach((i) => i.classList.remove("active"));
        paginationItems[currSlide - 1].classList.add("active");
      } else {
        currSlide--;
      }
      console.log('currSlide', currSlide);
      console.log('maxSlide', maxSlide);
    }
    function prevMove(slideItems) {
      console.log('prevMove clicked');
      currSlide--;
      // 1번째 슬라이드 이하로 넘어가지 않게 하기 위해서
      if (currSlide > 0) {
        // 슬라이드를 이동시키기 위한 offset 계산
        const offset = slideWidth * (currSlide - 1);
        // 각 슬라이드 아이템의 left에 offset 적용
        slideItems.forEach((i) => {
          i.setAttribute("style", `left: ${-offset}px`);
        });
        // 슬라이드 이동 시 현재 활성화된 pagination 변경
        paginationItems.forEach((i) => i.classList.remove("active"));
        paginationItems[currSlide - 1].classList.add("active");
      } else {
        currSlide++;
      }
      console.log('currSlide', currSlide);
      console.log('maxSlide', maxSlide);
    }
    // 버튼 엘리먼트 선택하기
    let prevBtn = document.querySelector(".slide_prev_button");
    let nextBtn = document.querySelector(".slide_next_button");
    // 버튼 엘리먼트에 클릭 이벤트 추가하기
    nextBtn.addEventListener("click", () => {
      // 이후 버튼 누를 경우 현재 슬라이드를 변경
      nextMove(slideItems);
    });
    // 버튼 엘리먼트에 클릭 이벤트 추가하기
    prevBtn.addEventListener("click", () => {
      // 이전 버튼 누를 경우 현재 슬라이드를 변경
      prevMove(slideItems);
    });
    // swipe 추가 - 해인 END =======================
    // 카드가 모두 추가된 후 이벤트 리스너 추가
    
    addCardClickEvent();
  } catch (e) {
    console.error(e);
  }
});




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
  //로컬 스토리지에 recent_movies 가 있을 경우 내용 추가
  let recentMovieList = GetIds('recent_movies');


  if (!MOVIE_ID) {
    console.log('Improper ID :', MOVIE_ID);
  }
  else if (!recentMovieList.includes(MOVIE_ID)) {
    recentMovieList.unshift(MOVIE_ID);
    localStorage.setItem('recent_movies', JSON.stringify(recentMovieList));
  } else { // 이미 본 영화도 최신 순위로 올림
    const idx = recentMovieList.indexOf(MOVIE_ID);
    recentMovieList.splice(idx, 1);
    recentMovieList.unshift(MOVIE_ID);
    SaveId(recentMovieList);
  }


  if (GetIds('recent_movies').length > 5) {
    const newMovieList = recentMovieList.splice(0, 5);
    SaveId(newMovieList);
  }


} else {
  if (MOVIE_ID) {
    console.log('Save new local storage :', [MOVIE_ID]);
    SaveId([MOVIE_ID]);
  }
  //로컬 스토리지에 reviews가 없을 경우 새로운 배열 저장

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
// 영화 배경 이미지 가져오는 함수
const getBackground = (data) => {
  let backgroundImg = `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`;
  return backgroundImg;
}

// 영화 설명 함수
const getOverview = (data) => {
  let genreArr = data.genres.map(x => x.name);
  const card = document.createElement('div');
  card.className = 'movie-overview';
  card.innerHTML = `
  <div class = "movie_info_bar">
  <p class = "movie_info">${data.release_date} | ${genreArr} | ${data.runtime}분</p>
  <div class = "vote_box">
  <div class = "vote">평균 별점</div>
  <div class = "star_box">
  <img class = "star" src = "source/Star_yellow.png"></img>
  <div class = "vote_average">${data.vote_average.toFixed(1)}</div>
  </div>
  </div>
  </div>
  
  <p class = "divider"></p>
  <div class = "movie_story">${data.overview}</div>
  `;
  return card;
}

// 영화 데이터 로드
let options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDAyZWEyNWM2M2ZjN2RlYzg5N2FmOTlkMDJlNzU4MCIsIm5iZiI6MTcyMjg1NzY3OS4xODE0OTMsInN1YiI6IjVmN2ViNGEzYjdhYmI1MDAzODZjNGIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KjkZs4T3Os7iQyt71mQRxP26d_hUw7ntES4POn6Lgco'
  }
};

function getMovieData() {
  try {
    fetch(`https://api.themoviedb.org/3/movie/${MOVIE_ID}?language=ko-KR`, options)
      .then(response => response.json())
      .then(data => {
        const movieDetail = document.getElementById('movie_poster');
        const poster = getPoster(data);
        movieDetail.appendChild(poster);

        const movieTitle = document.getElementById('movie_title');
        const title = getTitle(data);
        movieTitle.appendChild(title);

        const movieOverview = document.getElementById('movie_overview');

        const overview = getOverview(data);
        movieOverview.appendChild(overview);

        let background = document.getElementById('movie_detail_background');
        background.style.backgroundImage = `url(${getBackground(data)})`;
        console.log(getBackground(data));
        console.log(data);
      })
      .catch(err => console.error(err));
  } catch (e) {
    console.log(e)
  }

}

// 카드별 클릭 이벤트
function addCardClickEvent() {
  try {
    const cards = document.querySelectorAll('.cards');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        //카드 클릭 이벤트를 눌렀을 때.. 

        const modal = document.getElementsByClassName('modal_review')[0];
        modal.style.display = 'flex';
        const reviewId = document.getElementById("review_id");
        const reviewStar = document.getElementById("review_star");
        const reviewContent = document.getElementById("review_content");
        reviewId.innerHTML = card.dataset.name;
        //score = 별 모양.. 별모양 안불러와짐.. console찍으면 잘 보임 -> 수정 필요
        reviewStar.innerHTML = card.dataset.score;
        reviewContent.innerHTML = card.dataset.review;
        modal.style.display = 'flex';

        //comment 데이터 가져오기
        getCommentData(card.id);
        commentBtnListener(card.id);
      });
    });
  } catch (e) {
    console.log(e);
  }
}

// 모달 닫기 버튼 이벤트
document.querySelector('.close_btn').addEventListener('click', () => {
  try {
    const modal = document.getElementsByClassName('modal_review')[0];
    modal.style.display = 'none';
    document.getElementById('comment_area').innerHTML = '';
  } catch (e) {
    console.log(e);
  }
});


async function getCommentData(cardId) {
  try {
    // firebase db에서 데이터 가져오기
    const docsSnapshot = await getDocs(query(
      collection(db, "comment"), // review 컬렉션 지정
      where("id", "==", MOVIE_ID),
      where("review_id","==",cardId) // movie 필드와 일치하는 값으로 필터링
    ));

    docsSnapshot.forEach((doc) => {
      const data = doc.data();
      // 새로운 div 요소를 생성합니다.
      const newDiv = document.createElement('div');
      newDiv.id = 'review_comment';
      newDiv.textContent = `${data.comment} ${data.date}`;

      const newLine = document.createElement('hr');
      newLine.className = 'modal_line';

      // 새로운 button 요소를 생성합니다.
      const newButton = document.createElement('button');
      newButton.type = 'button';
      newButton.className = 'comment_delete_btn';
      newButton.textContent = 'X';

      newButton.addEventListener('click', async () => {
        try {
          const reviewRef = doc.ref; // 문서 참조를 가져옵니다.
          await deleteDoc(reviewRef); // 문서 삭제
          newDiv.remove(); // 삭제 후 화면에서 댓글 삭제
          newLine.remove(); // 삭제 후 줄 삭제
        } catch (e) {
          console.log(e);
        }
      });

      newDiv.appendChild(newButton);
      const container = document.getElementById('comment_area'); // 컨테이너의 id를 지정
      container.appendChild(newLine);
      container.appendChild(newDiv);
    });
    // addCommentDelEvent();
  } catch (e) {
    console.log(e);
  }
}

// '댓글 등록' 버튼 Click Event
function commentBtnListener(cardId) {
  const commentBtn = document.getElementById('comment_btn');
  commentBtn.addEventListener('click', async () => {
  
    if (document.getElementById('comment').value.length !== 0) {
      // async 함수로 변경
      try {
        const commentInfo = {
          comment: document.getElementById('comment').value,
          id: MOVIE_ID,
          date: new Date().toLocaleString(),
          review_id : cardId
        };
  
        // firebase db에 데이터 넣기
        await addDoc(collection(db, "comment"), commentInfo);  // await 추가
  
        // firebase db에서 데이터 가져오기
        const docsSnapshot = await getDocs(query(
          collection(db, "comment"), // review 컬렉션 지정
          where("id", "==", MOVIE_ID),
          where("review_id","==",cardId) // movie 필드와 일치하는 값으로 필터링
        ));
        document.getElementById('comment_area').innerHTML='';
        document.getElementById('comment').value = '';
        setComment(docsSnapshot);
      }
      catch (e) {
        console.log(e);
      }
    } else {
      console.log("문자열의 길이가 0이에요");
    }
  });
}

// 댓글 가져온거 설정하는 상황
function setComment(docsSnapshot) {
  docsSnapshot.forEach((doc) => {
    const data = doc.data();

    // 새로운 div 요소를 생성합니다.
    const newDiv = document.createElement('div');
    newDiv.id = 'review_comment';
    newDiv.textContent = `${data.comment} ${data.date}`;

    const newLine = document.createElement('hr');
    newLine.className = 'modal_line';

    // 새로운 button 요소를 생성합니다.
    const newButton = document.createElement('button');
    newButton.type = 'button';
    newButton.className = 'comment_delete_btn';
    newButton.textContent = 'X';

    newButton.addEventListener('click', async () => {
      try {
        const reviewRef = doc.ref; // 문서 참조를 가져옵니다.
        await deleteDoc(reviewRef); // 문서 삭제
        newDiv.remove(); // 삭제 후 화면에서 댓글 삭제
        newLine.remove(); // 삭제 후 줄 삭제
      } catch (e) {
        console.log(e);
      }
    });

    newDiv.appendChild(newButton);

    const container = document.getElementById('comment_area'); // 컨테이너의 id를 지정
    container.appendChild(newLine);
    container.appendChild(newDiv);
  });
}



// // DOMContentLoaded 이후 카드에 클릭 이벤트 설정
// document.addEventListener('DOMContentLoaded', () => {
//   // 카드가 모두 추가된 후 이벤트 리스너 추가
//   addCardClickEvent();
// });


// // 리뷰 삭제 함수
//  const deleteData = 



const resizeCards = async () => {
  try {
    const reviewContainer = document.getElementsByClassName('slide')[0];

    reviewContainer.innerHTML = `
      <div class="slide_prev_button slide_button">◀</div>
      <div class="slide_next_button slide_button">▶</div>
      <ul class="slide_pagination">`;

    const docsSnapshot = await getDocs(query(
      collection(db, "review"), // review 컬렉션 지정
      where("movie", "==", MOVIE_ID) // movie 필드와 일치하는 값으로 필터링
    ));


    let cardsContainer = document.createElement('ul');
    cardsContainer.className = 'slide_items';

    let gridColumn = 0;
    let windowWidth = window.innerWidth;
    console.log('window width:', windowWidth);

    if (windowWidth > 1460) {
      gridColumn = 4;
    } else if (windowWidth > 992) {
      gridColumn = 3;
    } else if (windowWidth > 630) {
      gridColumn = 2;
    } else {
      gridColumn = 1;
    }

    console.log('grid col :', gridColumn);
    let cardCount = 0;



    docsSnapshot.forEach((doc) => {
      cardCount++;

      const card = getReview(doc.data());
      cardsContainer.appendChild(card);

      if (cardCount % (gridColumn * 2) === 0) {
        reviewContainer.appendChild(cardsContainer);
        cardsContainer = document.createElement('ul');
        // cardsContainer.id = 'cards_container';
        cardsContainer.className = 'slide_items';
      }


      // const cardsContainer = document.getElementById('cards_container');
      // const card = getReview(doc.data());
      // card.setAttribute("id", doc.id);
      // cardsContainer.appendChild(card);
    });
    reviewContainer.appendChild(cardsContainer);



    // swipe 추가 - 해인 =======================

    // 슬라이크 전체 크기(width 구하기)
    const slide = document.querySelector(".slide");
    let slideWidth = slide.clientWidth;

    // // 버튼 엘리먼트 선택하기
    // let prevBtn = document.querySelector(".slide_prev_button");
    // let nextBtn = document.querySelector(".slide_next_button");

    // 슬라이드 전체를 선택해 값을 변경해주기 위해 슬라이드 전체 선택하기
    let slideItems = document.querySelectorAll(".slide_items");
    console.log('slide items :', slideItems)
    // console.log('slide items ', slideItems.length);
    // 현재 슬라이드 위치가 슬라이드 개수를 넘기지 않게 하기 위한 변수
    let maxSlide = slideItems.length;

    // 버튼 클릭할 때 마다 현재 슬라이드가 어디인지 알려주기 위한 변수
    let currSlide = 1;

    // 페이지네이션 생성
    const pagination = document.querySelector(".slide_pagination");

    for (let i = 0; i < maxSlide; i++) {
      if (i === 0) pagination.innerHTML += `<li class="active">•</li>`;
      else pagination.innerHTML += `<li>•</li>`;
    }

    const paginationItems = document.querySelectorAll(".slide_pagination > li");

    function nextMove(slideItems) {
      console.log('nextMove clicked');

      currSlide++;
      // 마지막 슬라이드 이상으로 넘어가지 않게 하기 위해서
      if (currSlide <= maxSlide) {
        // 슬라이드를 이동시키기 위한 offset 계산
        const offset = slideWidth * (currSlide - 1);
        // 각 슬라이드 아이템의 left에 offset 적용
        slideItems.forEach((i) => {
          i.setAttribute("style", `left: ${-offset}px`);
        });
        // 슬라이드 이동 시 현재 활성화된 pagination 변경
        paginationItems.forEach((i) => i.classList.remove("active"));
        paginationItems[currSlide - 1].classList.add("active");
      } else {
        currSlide--;
      }
      console.log('currSlide', currSlide);
      console.log('maxSlide', maxSlide);

    }
    function prevMove(slideItems) {
      console.log('prevMove clicked');

      currSlide--;
      // 1번째 슬라이드 이하로 넘어가지 않게 하기 위해서
      if (currSlide > 0) {
        // 슬라이드를 이동시키기 위한 offset 계산
        const offset = slideWidth * (currSlide - 1);
        // 각 슬라이드 아이템의 left에 offset 적용
        slideItems.forEach((i) => {
          i.setAttribute("style", `left: ${-offset}px`);
        });
        // 슬라이드 이동 시 현재 활성화된 pagination 변경
        paginationItems.forEach((i) => i.classList.remove("active"));
        paginationItems[currSlide - 1].classList.add("active");
      } else {
        currSlide++;
      }
      console.log('currSlide', currSlide);
      console.log('maxSlide', maxSlide);
    }

    // 버튼 엘리먼트 선택하기
    let prevBtn = document.querySelector(".slide_prev_button");
    let nextBtn = document.querySelector(".slide_next_button");


    // 버튼 엘리먼트에 클릭 이벤트 추가하기
    nextBtn.addEventListener("click", () => {
      // 이후 버튼 누를 경우 현재 슬라이드를 변경
      nextMove(slideItems);
    });
    // 버튼 엘리먼트에 클릭 이벤트 추가하기
    prevBtn.addEventListener("click", () => {
      // 이전 버튼 누를 경우 현재 슬라이드를 변경
      prevMove(slideItems);
    });
    // swipe 추가 - 해인 END =======================

    // 카드가 모두 추가된 후 이벤트 리스너 추가
    addCardClickEvent();

  } catch (e) {
    console.error(e);
  }
}

// 브라우저 화면이 조정될 때 마다 slideWidth를 변경하기 위해
window.addEventListener("resize", async () => {
  console.log('resize')
  const reviewContainer = document.getElementsByClassName('slide')[0];

  const slide = document.querySelector(".slide");
  console.log('resize slide', slide);
  let slideWidth = slide.clientWidth;
  // 슬라이드 전체를 선택해 값을 변경해주기 위해 슬라이드 전체 선택하기
  let slideItems = document.querySelectorAll(".slide_items");

  let currSlide = 1;
  // 슬라이드를 이동시키기 위한 offset 계산
  const offset = slideWidth * (currSlide - 1);
  // 각 슬라이드 아이템의 left에 offset 적용
  slideItems.forEach((i) => {
    i.setAttribute("style", `left: ${-offset}px`);

    reviewContainer.innerHTML = `
      <div class="slide_prev_button slide_button">◀</div>
      <div class="slide_next_button slide_button">▶</div>
      <ul class="slide_pagination">`;
    console.log('innerHTML :', reviewContainer.innerHTML);
  })

  resizeCards();
});