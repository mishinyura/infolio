if (document.querySelector('.accordeon')) {
  const list = document.querySelector('.accordeon'),
    item = list.querySelectorAll('.accordeon__item');

  let heightList;
  let amountItems;
  let marginItems;
  const searchHeight = (itm) => {
    heightList = 0;
    marginItems = 0;
    amountItems = itm.target.nextElementSibling.querySelectorAll('li');
    for (let i = 0; amountItems.length > i; i++){
      heightList += amountItems[i].clientHeight;
      marginItems += parseFloat(window.getComputedStyle(amountItems[i]).marginBottom);
    }
    heightList += marginItems + 150;
  };

  item.forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.currentTarget.hasAttribute('style')) {
        e.currentTarget.removeAttribute('style');
      } else{
        searchHeight(e);
        e.currentTarget.style.height = `${heightList}px`;
      }
    });
  });
}
