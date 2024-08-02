// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


// Firebase 구성 정보 설정
const firebaseConfig = {
  apiKey: "AIzaSyBuTJE1cLz2TeLSaqcjFvucA-kaRumbks4",
  authDomain: "sparta-4c236.firebaseapp.com",
  projectId: "sparta-4c236",
  storageBucket: "sparta-4c236.appspot.com",
  messagingSenderId: "363940226112",
  appId: "1:363940226112:web:41bf8f24714cdea309eba5",
  measurementId: "G-09YD2T4EFK"
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


