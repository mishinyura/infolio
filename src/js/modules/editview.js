const listCards = document.querySelector('.showcase__list');
const btnView4 = document.querySelector('.sorted__view_4');
const btnView3 = document.querySelector('.sorted__view_3');
const classEditView = 'view_3';
const classActiveBtn = 'view-active';

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
