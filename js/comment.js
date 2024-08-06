// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


// Firebase 구성 정보 설정
const firebaseConfig = {
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




// ----------------------------------------------------------------------------------
// const submitBtn = document.getElementById('comment-btn') // button태그
// const commentList = document.getElementById('comment_list') // 댓글을 추가할 ul태그


// submitBtn.addEventListener('click', function(){
//   const comments = [commentList.value]
  // localStorage.setItem('comment', JSON.stringify(comments));

// let commentLoad = JSON.parse(localStorage.getItem('comment'))


// commentLoad.push(comments[0])
// localStorage.setItem('comment', JSON.stringify(commentLoad));
// })
// localStorage 사용


