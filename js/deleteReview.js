// 리뷰 수정 및 삭제

// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { collection } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Firebase 구성 정보 설정
// const firebaseConfig = { // 해인
//   apiKey: "AIzaSyAr-pkDJkrblenxK5GSlWssdFrSEhvLdrU",
//     authDomain: "sparta-90385.firebaseapp.com",
//     projectId: "sparta-90385",
//     storageBucket: "sparta-90385.appspot.com",
//     messagingSenderId: "299275891543",
//     appId: "1:299275891543:web:6224af1407759225310412"
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

//review_modify_btn 클릭 수정 
//데이터 베이스 키 값 가져오기, 비밀번호 확인, 리뷰 작성창 열기(데이터베이스내용 기반)

// 1. 리뷰 데이터 읽기

// 리뷰데이터 저장 변수
let reviewData = [];

// movie id 받기
const receivedData = location.href.split('?')[1];

//리뷰 데이터 읽기
const loadReviews = async () => {
  const querySnapshot = await getDocs(collection(db, "review"));
  querySnapshot.forEach((doc) => {
    let row = doc.data();
    if(row.movie === receivedData){
    let dataInfo = {
      id: doc.id,
      name: row.name,
      pw: row.pw,
      content: row.review,
      score: row.score
    };
    reviewData.push(dataInfo);
  }
  });
};

loadReviews();


// 2. 데이터 수정하기

// 리뷰 수정버튼 클릭시 수정 모달창 생성
document.getElementById('review_modify_btn').addEventListener('click', function () {
  
  //모달창에 띄워진 정보와 겹치는 데이터 가져오기
  const thisData = reviewData.find((review) =>
    review.name === document.getElementById('review_id').innerText &&
    review.content === document.getElementById('review_content').innerText &&
    review.score.toString() === document.getElementById('review_star').innerText)
  
  // 비밀번호 확인 프롬프트
  let getPw = prompt('비밀번호를 입력하세요')

  // 프롬프트 입력 값과 데이터상 pw 일치시 실행
  if (getPw === thisData.pw) {

    //리뷰 작성 모달창 띄우기 
    const modal = document.getElementsByClassName('modal_create_review')[1];
    modal.style.display = 'flex';

    // 기존 작성 데이터 가져오기
    document.getElementById('fix_text').value = thisData['content'];
    document.getElementById('fix_star').value = thisData['score'];

    // 수정 등록 버튼 입력 시 데이터 수정저장
    document.getElementById('fix_review_btn').addEventListener('click', function () {
      let fixedReview = {
        review: document.getElementById('fix_text').value,
        score: document.getElementById('fix_star').value
      }
      updateReview(thisData.id, fixedReview);
    })
  } else if (getPw !== null) {
    alert('비밀번호가 다릅니다.')
  }

})

// 리뷰 데이터 수정 함수식
const updateReview = async (id, updateReview) => {
  /* doc함수: 파이어스토어 특정 문서 참조
     db : 파이어스토어 데이터베이스 인스턴스
    "review" : 컬렉션 이름
     id: 업데이트할 문서 아이디   */
  const reviewRef = doc(db, "review", id);
// updateDoc: 파이어스토어 문서 업데이트 함수
//updateDoc(업데이트할 문서를 참조하는 객체, 업데이트 데이터 객체)
  await updateDoc(reviewRef, updateReview);
  alert('리뷰가 수정되었습니다.');
  location.reload();
}


// 수정 취소 버튼 작동
document.getElementById('cancel_fix_btn').addEventListener('click', function () {
  const modal = document.getElementsByClassName('modal_create_review')[1];
  modal.style.display = 'none';
})

// 리뷰 삭제 버튼 이벤트
document.getElementById('review_delete_btn').addEventListener('click', function (){
  
  // 해당 페이지 영화 정보 가져올 필요 있음
  //모달창에 띄워진 정보와 겹치는 데이터 가져오기
  const thisData = reviewData.find((review) =>
    review.name === document.getElementById('review_id').innerText &&
    review.content === document.getElementById('review_content').innerText &&
    review.score.toString() === document.getElementById('review_star').innerText)

  let getPw = prompt('비밀번호를 입력하세요')


  if(getPw === thisData.pw){
    if(confirm('정말 삭제하시겠습니까?')){
      deleteData(thisData.id);
    }
  } else if(getPw !== null){
    alert('비밀번호가 다릅니다.')
  }
})

// 리뷰 삭제 함수
const deleteData = async (id)=>{
  const reviewRef = doc(db, "review", id);
  await deleteDoc(reviewRef);
  alert('리뷰가 삭제되었습니다.')
  location.reload();
}

// 실시간 리뷰 글자수 확인
const review = document.getElementById('fix_text');
const lengthPosition = document.getElementById('fix_length');
review.addEventListener('keyup', (e) => {
  let reviewLength = review.value.length;
  lengthPosition.innerText = reviewLength;
})
