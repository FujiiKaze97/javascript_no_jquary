// '리뷰 작성' 버튼을 클릭하면 모달창이 뜨도록 함
const creatReviewBtn = document.getElementById('show_modal_btn');
creatReviewBtn.addEventListener('click', () => {
  showModal();
})
const showModal = () => {
  console.log('"create review button" clicked');
  
  const modal = document.getElementsByClassName('modal_create_review')[0];
  modal.style.display = 'flex';
}


// 취소 버튼을 누르면 모달창이 안보이도록 함.
// textarea의 내용도 자동으로 지워짐.
const cancelBtn = document.getElementById('cancel_review_btn');
cancelBtn.addEventListener('click', () => {
  cancelReview();
})

const cancelReview = () => {
  console.log("'cancel review button' clicked");
  alert('리뷰 작성을 취소하셨습니다.')
  
  const modal = document.getElementsByClassName('modal_create_review')[0];
  modal.style.display = 'none';
  
}

// 등록 버튼을 누르면 log만 찍히도록 함.
// 데이터 저장 추후 구현해야 함.
const createBtn = document.getElementById('create_review_btn');
createBtn.addEventListener('click', () => {
  createReview();
})

const createReview = () => {
  console.log("'create review button' clicked");
  alert('리뷰를 등록했습니다.');


  const content = document.getElementById('review_text').value;
  const name = document.getElementById('name').value;
  const pw = document.getElementById('pw').value;

  console.log(name, pw);
  console.log('content :', content);

  
  const modal = document.getElementsByClassName('modal_create_review')[0];
  modal.style.display = 'none';
}