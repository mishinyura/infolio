const sortMenu = document.querySelector('.sorted__menu');
const sortItems = sortMenu.querySelectorAll('.sorted__item');
const sortMobBtn = sortMenu.querySelector('.sorted__title_mob');
const sortList = sortMenu.querySelector('.sorted__list');
const sortBtnCloseList = sortList.querySelector('.sorted__btn_mob');
const classActiveItemSort = 'sort-active';
const classActiveListSort = 'active-sortlist';

const editSortedList = () => {
  sortList.classList.toggle(classActiveListSort);
};

const editActiveSort = (item) => {
  sortMobBtn.children[0].innerHTML = item.target.innerHTML;
  for (let i = 0; i < sortItems.length; i++) {
    sortItems[i].classList.remove(classActiveItemSort);
  }
  item.target.classList.add(classActiveItemSort);
  editSortedList();
};


for (let i = 0; i < sortItems.length; i++) {
  sortItems[i].addEventListener('click', editActiveSort);
}
sortMobBtn.addEventListener('click', editSortedList);
sortBtnCloseList.addEventListener('click', editSortedList);
