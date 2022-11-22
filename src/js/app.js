/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebP((support) => {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}

isWebp();

import Swiper, { Autoplay, Navigation, Pagination, Scrollbar, EffectCoverflow } from 'swiper';
Swiper.use([Autoplay, Navigation, Pagination, Scrollbar, EffectCoverflow]);

const switcher = new Swiper('.card-content__swiper', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
      direction: 'horizontal',
    },
    700: {
      centeredSlides: true,
      slidesPerView: 1.5,
      spaceBetween: 10,
      direction: 'horizontal',
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 20,
      direction: 'vertical',
    },
  }
});


const swiper = new Swiper('.similar__slider', {
  direction: 'horizontal',
  loop: true,
  navigation: {
    nextEl: '.similar__next',
    prevEl: '.similar__prev',
  },

  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    520: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    670: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    990: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1230: {
      slidesPerView: 5,
      spaceBetween: 30,
    }
  }
});

import './modules/form.js';

//sidebar фильтр
if (document.querySelector('.sidebar')) {
  const paramSidebar = document.querySelector('.sidebar');
  const btnParamOpen = paramSidebar.querySelector('.sidebar__btn_mob');
  const btnParamClose = paramSidebar.querySelector('.sidebar__close');
  const paramMenu = paramSidebar.querySelector('.sidebar__content');
  const classActiveParam = 'active-param';
  const clickMenu = () => {
    paramMenu.classList.toggle(classActiveParam);
  };

  document.addEventListener( 'click', (e) => {
    if (!e.composedPath().includes(btnParamOpen) && paramMenu.classList.contains(classActiveParam)) {
      if (!e.composedPath().includes(paramMenu)) {
        clickMenu();
      }
    }
  });

  btnParamOpen.addEventListener('click', clickMenu);
  btnParamClose.addEventListener('click', clickMenu);
}
//Изменение вида расположения карточек в каталоге
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
//perviewCard
if (document.querySelectorAll('.card')) {
  const cardsProduct = document.querySelectorAll('.card');
  let count = 0;
  let interFunc;
  let images;

  const showSlideImages = (lst) => {
    count = 0;
    images = lst.target.querySelectorAll('img');
    interFunc = setInterval(() => {
      images[count].style.display = 'none';
      if (images.length - 1 > count) {
        count++;
      } else {
        count = 0;
      }
      images[count].style.display = 'block';
    }, 1000);
  };

  const hideSlideImages = () => {
    count = 0;
    clearTimeout(interFunc);
    for (let i = 0; i < images.length; i++) {
      images[i].style.display = 'none';
      if (i === 0) {
        images[i].style.display = 'block';
      }
    }
  };

  for (let i = 0; i < cardsProduct.length; i++) {
    cardsProduct[i].addEventListener('mouseenter', showSlideImages);
    cardsProduct[i].addEventListener('mouseleave', hideSlideImages);
  }
}
//Сортировка в шапке каталога
if (document.querySelector('.sorted__menu')) {
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
}
//Аккордеон
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
//Сворачивание текста
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
//Окно увеличенного просмотра фото товара
if (document.querySelector('.swiper-slide')) {
  const slides = document.querySelectorAll('.swiper__slide');
  const pervBox = document.querySelector('.card-content__perview');
  const nextBtnPr = document.querySelector('.slider-button-next');
  const prevBtnPr = document.querySelector('.slider-button-prev');
  const nextBtn = document.querySelector('.swiper-button-next');
  const prevBtn = document.querySelector('.swiper-button-prev');

  const showSlide = (slide) => {
    pervBox.children[1].setAttribute('src', slide.target.getAttribute('src'));
  };

  const slideActive = () => {
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].offsetParent.classList.contains('swiper-slide-active')) {
        pervBox.children[1].setAttribute('src', slides[i].children[0].getAttribute('src'));
      }
    }
  };

  const increaseZoom = (img) => {
    img.target.style.objectFit = 'none';
    img.target.style.objectPosition = `-${img.layerX}px -${img.layerY}px`;
  };

  for (let i = 0; slides.length > i; i++) {
    slides[i].addEventListener('mouseover', showSlide);
  }

  pervBox.addEventListener('mousemove', increaseZoom);
  pervBox.addEventListener('mouseout', () => {
    pervBox.children[1].removeAttribute('style');
  });

  prevBtnPr.addEventListener('click', () => {
    prevBtn.click();
    slideActive();
  });

  nextBtnPr.addEventListener('click', () => {
    nextBtn.click();
    slideActive();
  });
}
//Кнопка наверх
if (document.querySelector('.main__up-btn')) {
  const progressBtn = document.querySelector('.main__up-btn');

  window.addEventListener('scroll', () => {
    if (scrollY >= 200) {
      progressBtn.classList.add('--active');
    } else {
      progressBtn.classList.remove('--active');
    }
  });

  progressBtn.addEventListener('click', () => {
    document.querySelector('.header').scrollIntoView({
      block: 'nearest',
      behavior: 'smooth'
    });
  });
}
