// 웹페이지 시작 시 자동 포커스
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal');
    const modalOpen = document.querySelectorAll('.cards');
    const modalClose = document.querySelector('.close_btn');

    // 모달 열기 함수
    const openModal = (reviewContent) => {
        // 모달 내용 설정
        const reviewContentElement = modal.querySelector('.review p');
        reviewContentElement.textContent = reviewContent;

        document.body.style.overflow = "hidden";
        modal.classList.add('on');
    };

    // 모달 닫기 함수
    const closeModal = () => {
        document.body.style.overflow = "unset";
        modal.classList.remove('on');
    };

    // 열기 버튼을 눌렀을 때 모달팝업이 열림
    modalOpen.forEach(card => {
        card.addEventListener('click', function () {
            // 카드의 리뷰 내용을 가져와서 모달에 표시
            const reviewContent = this.querySelector('.userreview').textContent;
            openModal(reviewContent);
        });
    });

    // 닫기 버튼을 눌렀을 때 모달팝업이 닫힘
    modalClose.addEventListener('click', closeModal);
});