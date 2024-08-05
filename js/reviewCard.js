

// 취소 버튼을 누르면 모달창이 안보이도록 함.
const closeBtn = document.getElementById('review_close_btn');
closeBtn.addEventListener('click', () => {
  
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


const ClearModal = (name, pw, review, score) => {
  // reset : 기존 모달창에 있던 내용 초기화
  name.value = '';
  pw.value = '';
  review.value = '';
  score.value = '⭐⭐⭐⭐⭐';
}


