// ======================================
//                firebase
// ======================================

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




// '리뷰 작성' 버튼을 클릭하면 모달창이 뜨도록 함
const creatReviewBtn = document.getElementById('write_review_btn');
creatReviewBtn.addEventListener('click', () => {
  ShowModal();
})
const ShowModal = () => {
  console.log('"write_review_btn" clicked');

  const modal = document.getElementsByClassName('modal_create_review')[0];
  modal.style.display = 'flex';
  
}


// firestorage에 저장하기

const createBtn = document.getElementById('create_review_btn');
createBtn.addEventListener('click', async function () {
  console.log("'create review button' clicked");
  //등록 버튼 클릭시 컨펌 알림
  const result = confirm('등록하시겠습니까?');


  const name = document.getElementById('name');
  const pw = document.getElementById('pw');
  const review = document.getElementById('review_text');
  const score = document.getElementById('select_star');

  // console.log(name.value, pw.value);
  // console.log('score :', score.value)
  // console.log('review :', review.value);

  if (result) {
    //컨펌 확인 버튼 입력시 처리
    // saveReview(reviewInfo);

    // 저장 시각 저장
    

    const reviewInfo = { name: name.value, pw: pw.value, score: score.value, review: review.value, key:makeKey() };

    await addDoc(collection(db, "review"), reviewInfo);
    // 저장 후 페이지 새로고침
    location.reload();
  }
  // confirm 창에서 취소를 누르면 위에 주석처리한 부분 log가 또 뜨네요?

})

// 취소 버튼을 누르면 모달창이 안보이도록 함.
const cancelBtn = document.getElementById('cancel_review_btn');
cancelBtn.addEventListener('click', () => {
  CancelReview();
})

const CancelReview = () => {
  console.log("'cancel review button' clicked");
  const result = confirm('리뷰 작성을 취소하시겠습니까?');
  if (result) {
    const name = document.getElementById('name');
    const pw = document.getElementById('pw');
    const review = document.getElementById('review_text');
    const score = document.getElementById('select_star');

    // reset : 기존 모달창에 있던 내용 초기화
    // 새로고침은 하지 않음
    ClearModal(name, pw, review, score);
    const modal = document.getElementsByClassName('modal_create_review')[0];
    modal.style.display = 'none';
  }
  // else {
  // const modal = document.getElementsByClassName('modal_create_review')[0];
  // modal.style.display = 'none';
  // }
}



const ClearModal = (name, pw, review, score) => {
  // reset : 기존 모달창에 있던 내용 초기화
  name.value = '';
  pw.value = '';
  review.value = '';
  score.value = '⭐⭐⭐⭐⭐';
}


// 실시간 리뷰 글자수 확인
const review = document.getElementById('review_text');
const lengthPosition = document.getElementById('current_length');
review.addEventListener('keyup', (e) => {
  let reviewLength = review.value.length;
  lengthPosition.innerText = reviewLength;
})

// key 생성 함수 : 현 시각 저장 + 난수 
const makeKey = () => {
  let time = new Date();
  let year = time.getFullYear();
  let month = ('0' + (time.getMonth() + 1)).slice(-2);
  let day = ('0' + time.getDate()).slice(-2);
  let hours = ('0' + time.getHours()).slice(-2); 
  let minutes = ('0' + time.getMinutes()).slice(-2);
  let seconds = ('0' + time.getSeconds()).slice(-2); 

  let random = Math.floor(9000*Math.random())+1000;
  
  return '' + year + month + day + hours + minutes + seconds + random;
}