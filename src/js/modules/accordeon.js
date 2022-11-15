const list = document.querySelector('.accordeon'),
  btn = list.querySelectorAll('.accordeon__title'),
  text = list.querySelectorAll('.accordeon__text'),
  item = list.querySelectorAll('.accordeon__item'),
  artItem = document.querySelectorAll('.accordeon__art-name'),
  card = document.querySelectorAll('.guest');


// document.addEventListener('mousemove', (event) => {
//   a.style.transform = 'translate(' + (event.pageX - 1) + 'px, ' + (event.pageY - 1) + 'px)'
//   m.style.transform = 'translate(' + (event.pageX - 10) + 'px, ' + (event.pageY - 10) + 'px)'
// })

item.forEach((el) => {
  el.addEventListener('click', (e) => {
    for (let i = 0; i < item.length; i++) {
      item[i].firstElementChild.classList.remove('accordeon__title-active');
    }

    const path = e.currentTarget.dataset.path;

    for(let i = 0; i < item.length; i++){
      item[i].classList.remove('item-active');
    }
    e.currentTarget.classList.add('item-active');

    el.firstElementChild.classList.add('accordeon__title-active');

    for(let i = 0; i < text.length; i++){
      text[i].classList.remove('text-active');
    }
    document.querySelector(`[data-target='${path}']`).classList.add('text-active');
  });
});


artItem.forEach((el) => {
  el.addEventListener('click', (e) => {
    for (let i = 0; i < artItem.length; i++) {
      artItem[i].classList.remove('art-active');
    }

    const art = e.currentTarget.dataset.art;

    el.classList.add('art-active');

    for(let i = 0; i < card.length; i++){
      card[i].classList.remove('card-active');
    }
    document.querySelector(`[data-card='${art}']`).classList.add('card-active');
  });
});
