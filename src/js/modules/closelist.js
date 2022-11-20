if (document.querySelector('.description__dop-info')) {
  const btnsLister = document.querySelectorAll('.btn_lister');
  const classActive = 'open-list';
  let heightList;

  const editPositionList = (btn) => {
    heightList = 0;
    const lst = btn.target.previousElementSibling;
    heightList += lst.scrollHeight;
    if (btn.target.previousElementSibling.hasAttribute('style')) {
      lst.removeAttribute('style');
      lst.classList.remove(classActive);
    } else {
      lst.style.height = `${heightList}px`;
      lst.classList.add(classActive);
    }
  };

  btnsLister.forEach((el) => {
    el.addEventListener('click', editPositionList);
  });
}
