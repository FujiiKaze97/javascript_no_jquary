// 웹페이지 시작 시 자동 포커스
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal');
    const modalOpen = document.querySelector('.modal_btn');
    const modalClose = document.querySelector('.close_btn');

    //열기 버튼을 눌렀을 때 모달팝업이 열림
    modalOpen.addEventListener('click', function () {
        //'on' class 추가
        modal.classList.add('on');
    });
    //닫기 버튼을 눌렀을 때 모달팝업이 닫힘
    modalClose.addEventListener('click', function () {
        //'on' class 제거
        modal.classList.remove('on');
    });
  });