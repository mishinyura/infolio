if (document.querySelector('.showcase__list')) {
  const listCards = document.querySelector('.showcase__list');
  const btnView4 = document.querySelector('.sorted__view_4');
  const btnView3 = document.querySelector('.sorted__view_3');
  const boxBtns = btnView4.parentElement;
  const classEditView = 'view_3';
  const classActiveBtn = 'view-active';
  const classLockBtns = 'none-btns';

  btnView4.addEventListener('click', () => {
    btnView3.classList.remove(classActiveBtn);
    listCards.classList.remove(classEditView);
    btnView4.classList.add(classActiveBtn);
  });
  btnView3.addEventListener('click', () => {
    btnView4.classList.remove(classActiveBtn);
    listCards.classList.add(classEditView);
    btnView3.classList.add(classActiveBtn);
  });

  window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth < 440) {
      listCards.classList.remove(classEditView);
      boxBtns.classList.add(classLockBtns);
    } else {
      boxBtns.classList.remove(classLockBtns);
    }
  });
}
