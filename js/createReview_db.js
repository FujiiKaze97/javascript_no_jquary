// ======================================
//                 firebase
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
  showModal();
})
const showModal = () => {
  console.log('"write_review_btn" clicked');

  const modal = document.getElementsByClassName('modal_create_review')[0];
  modal.style.display = 'flex';
  
}


// 취소 버튼을 누르면 모달창이 안보이도록 함.
const cancelBtn = document.getElementById('cancel_review_btn');
cancelBtn.addEventListener('click', () => {
  cancelReview();
})

const cancelReview = () => {
  console.log("'cancel review button' clicked");
  const result = confirm('리뷰 작성을 취소하시겠습니까?');
  if (result) {
    const name = document.getElementById('name');
    const pw = document.getElementById('pw');
    const review = document.getElementById('review_text');
    const score = document.getElementById('select_star');

    // reset : 기존 모달창에 있던 내용 초기화
    // 새로고침은 하지 않음
    clearModal(name, pw, review, score);
    const modal = document.getElementsByClassName('modal_create_review')[0];
    modal.style.display = 'none';
  }
  // else {
  // const modal = document.getElementsByClassName('modal_create_review')[0];
  // modal.style.display = 'none';
  // }
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

  const reviewInfo = { name: name.value, pw: pw.value, score: score.value, review: review.value };
  if (result) {
    //컨펌 확인 버튼 입력시 처리
    // saveReview(reviewInfo);
    await addDoc(collection(db, "review"), reviewInfo);
    // 저장 후 페이지 새로고침
    location.reload();
  }
  // confirm 창에서 취소를 누르면 위에 주석처리한 부분 log가 또 뜨네요?

})

const clearModal = (name, pw, review, score) => {
  // reset : 기존 모달창에 있던 내용 초기화
  name.value = '';
  pw.value = '';
  review.value = '';
  score.value = '⭐⭐⭐⭐⭐';
}