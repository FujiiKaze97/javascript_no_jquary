// 리뷰 수정 및 삭제

// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

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

//review_modify_btn 클릭 수정 
//데이터 베이스 키 값 가져오기, 비밀번호 확인, 리뷰 작성창 열기(데이터베이스내용 기반)

// 1. 리뷰 데이터 읽기

// 리뷰데이터 저장 변수
let reviewData = [];

//데이터 저장 로직 비동기 리팩토링
const loadReviews = async () => {
  const querySnapshot = await getDocs(collection(db, "review"));
  querySnapshot.forEach((doc) => {
    let row = doc.data();
    let dataInfo = {
      id: doc.id,
      name: row.name,
      pw: row.pw,
      review: row.review,
      score: row.score
    };
    reviewData.push(dataInfo);
  });
  console.log(reviewData);
};

loadReviews();

// 2. 데이터 수정하기

// 리뷰 수정버튼 클릭시 수정 모달창 생성
document.getElementById('review_modify_btn').addEventListener('click', function(){
 // 리뷰 모달창 데이터 임시 할당
  let testData = reviewData[0];
  // 비밀번호 확인 프롬프트
  let getPw = prompt('비밀번호를 입력하세요')

// 프롬프트 입력 값과 데이터상의 pw 일치시 실행
// 선택한 리뷰 모달창 데이터 가져올 필요 있음
  if(getPw === testData.pw /* <=(임시값) 리뷰 모달창 pw 데이터 필요*/){

    //리뷰 작성 모달창 띄우기 
    const modal = document.getElementsByClassName('modal_create_review')[1];
    modal.style.display = 'flex';

    // 기존 작성 데이터 가져오기
    document.getElementById('fix_text').value = testData['review'];
    document.getElementById('fix_star').value = testData['score'];
   } else if(getPw !== null){
    alert('비밀번호가 다릅니다.')
   }


})



// 수정 취소 버튼 작동
document.getElementById('cancel_fix_btn').addEventListener('click', function(){
  const modal = document.getElementsByClassName('modal_create_review')[1];
  modal.style.display = 'none';
})