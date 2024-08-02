// '리뷰 작성' 버튼을 클릭하면 모달창이 뜨도록 함
const creatReviewBtn = document.getElementById('write_review_btn');
creatReviewBtn.addEventListener('click', () => {
  ShowModal();
})
const ShowModal = () => {
  console.log('"write_review_btn" clicked');

  const modal = document.getElementsByClassName('modal_create_review')[0];
  modal.style.display = 'flex';

  // document.body.style.overflow = 'hidden';
  
}


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
    clearModal(name, pw, review, score);
    const modal = document.getElementsByClassName('modal_create_review')[0];
    modal.style.display = 'none';
  }
  // else {
  // const modal = document.getElementsByClassName('modal_create_review')[0];
  // modal.style.display = 'none';
  // }


}

// 등록 버튼을 누르면 log만 찍히도록 함.
// 데이터 저장 추후 구현해야 함.
const createBtn = document.getElementById('create_review_btn');
createBtn.addEventListener('click', () => {
  CreateReview();
})

const CreateReview = () => {
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
    if (localStorage.getItem('test')) {
      //로컬 스토리지에 reviews 가 있을경우 내용 추가
      let pushReview = getReview('reviews');
      pushReview.push(reviewInfo);
      localStorage.setItem('reviews', JSON.stringify(pushReview));


    } else {
      //로컬 스토리지에 reviews가 없을 경우 새로운 배열 저장
      SaveReview([reviewInfo]);

    }
    // 저장 후 페이지 새로고침
    location.reload();
  }
  // confirm 창에서 취소를 누르면 위에 주석처리한 부분 log가 또 뜨네요?

}

// localStorage에 저장하기
const SaveReview = (info) => {
  localStorage.setItem('test', JSON.stringify(info));
}
// localStorage 불러오기
const GetReview = (key) => {
  let localData = JSON.parse(localStorage.getItem(key))
  return localData;
}

const ClearModal = (name, pw, review, score) => {
  // reset : 기존 모달창에 있던 내용 초기화
  name.value = '';
  pw.value = '';
  review.value = '';
  score.value = '⭐⭐⭐⭐⭐';
}


