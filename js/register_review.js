//리뷰 모달창 입력값 변수 할당
const idElement = document.getElementById("name");
const pwdElement = document.getElementById("pw")
const reviewElement = document.getElementById("reviewText")

//로컬스토리지 저장함수
const saveReview = (reviewInfo)=>{
    localStorage.setItem('reviews', JSON.stringify(reviewInfo));
}
//로컬스토리지 불러오는 함수
const getReview = (key) => {
    let localData = JSON.parse(localStorage.getItem(key))
    return localData;
}

//리뷰 등록 localStorage
const btn = document.getElementById('btn');
btn.addEventListener('click', function(){
    //등록 버튼 클릭시 컨펌 알림
    const result = confirm('등록하시겠습니까?') 
    if(result){
    // 컨펌 확인 버튼 입력시 처리

    // // 로컬스토리지에 입력값 저장 !!!!!!!! key 값이 고정되어있어 등록마다 value가 변화.
    const reviewInfo = [{ 'id': idElement.value, 'pw':pwdElement.value, 'review': reviewElement.value }];
    localStorage.setItem("reviewInfo", JSON.stringify(reviewInfo));
    }
});



//리뷰 카드 만들기
// const cardData = (review) => {
//     const card = document.createElement('div');
//     card.className = 'reviewCard';
//     card.innerHTML = `
//     <div class="movie-card-content">
//       <h3>${movie.title}</h3>
//       <p>${movie.overview}</p>
//       <span>Rating: ${movie.vote_average}</span>
//     </div>`;
// }