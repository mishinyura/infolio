if (document.querySelector('.description__dop-info')) {
  const dopInfoList = document.querySelector('.description__dop-info');
  const descrList = document.querySelector('.description__descr');
  const dopInfoBtn = dopInfoList.children[2];
  const descrBtn = descrList.children[2];
  const classActive = 'open-list';

  const editPositionList = (btn) => {
    btn.target.previousElementSibling.classList.toggle(classActive);
  };

  dopInfoBtn.addEventListener('click', editPositionList);
  descrBtn.addEventListener('click', editPositionList);
}
