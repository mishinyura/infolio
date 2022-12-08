class select {
  constructor(classObj) {
    this.box = document.querySelector(classObj);
    this.list = this.box.querySelector('ul');
    this.item = this.list.querySelectorAll('li');
    this.btn = this.box.querySelector('button');
    this.scrollbar = this.box.querySelector('div');
    this.boxClass = '-select__box-';
    this.listClass = '-select__list-';
    this.itemClass = '-select__item-';
    this.btnClass = '-select__btn-';
    this.classActive = '--active';
    this.inputSelect = this.box.querySelector('input');
  }

  createShape() {
    //Создается input, присваивается класс, type, name
    //и добавляется как дочерний элемент box в начало контейнера.
    //В него будет передаваться выбранное значение для дальнейшего использования
    if (this.defaultSelection) {
      this.positionSelect = this.defaultSelection - 1;
      this.btn.innerText = this.item[this.positionSelect].innerText;
      this.item[this.positionSelect].style.display = 'none';
    } else {
      this.btn.innerText = this.placeholder;
      this.positionSelect = 0;
    }
    for (let i = 0; this.item.length > i; i++) {
      this.item[i].classList.add(this.itemClass);
      this.item[i].setAttribute('tabindex', '0');
      this.amountItems++;
    }
    //Добавление классов контейнеру с селектом, контейнеру с вариантами,
    //добавление атрибута tabindex для кнопки(выбранного элемента)
    this.box.classList.add(this.boxClass);
    this.list.classList.add(this.listClass);
    this.btn.classList.add(this.btnClass);
    // this.scrollbar.classList.add(this.scrollbarClass);
    this.btn.setAttribute('tabindex', '0');
  }

  editStyleClass() {
    document.getElementsByClassName(this.classActiveLict)[0].style.paddintTop = `${this.heightBtn}px`;
  }

  closeSelect() {
    this.btn.classList.remove(this.classActive);
    this.list.removeAttribute('style');
  }

  openSelect() {
    this.btn.classList.add(this.classActive);
    this.list.style.height = `${this.sizeList}px`;
    this.list.style.paddingTop = `${this.heightBtn}px`;
    this.list.style.visibility = 'visible';
  }

  //Функция сработает при выборе нового элемента из списка
  clickItem(item, index) {
    this.inputSelect.value = item.target.innerHTML;
    this.item[this.positionSelect].removeAttribute('style');
    this.btn.innerText = item.target.innerText;
    this.positionSelect = index;
    this.item[index].style.backgroundColor = '#c3c3c3';
    this.closeSelect();
  }

  //Функция отвечает за взаимодействие с select
  selectControl() {
    //При взаимодействии с клавиатурой
    //enter раскрывает список
    this.btn.addEventListener('keydown', () => {
      if (this.btn.keyCode === 13) {
        this.openSelect();
      }
    });
    //При клике за пределы селекта, селект закроется
    document.addEventListener( 'click', (e) => {
      if (!e.composedPath().includes(this.btn)) {
        this.closeSelect();
      }
    });
    //При клике на выбранные эелемент (title, btn)
    this.btn.addEventListener('click', () => {
      if (this.btn.classList.contains(this.classActive)) {
        this.closeSelect();
      } else {
        this.openSelect();
      }
    });
    //При клике на элемент списка, заголовок/btn, обновится
    for (let i = 0; i < this.item.length; i++) {
      this.item[i].addEventListener('click', (item) => {
        this.clickItem(item, i);
      });
    }
    //При нажатии enter на выбранном элементе btn обновится
    //при esc закроется списко
    for (let i = 0; i < this.item.length; i++) {
      this.item[i].addEventListener('keydown', (item) => {
        if (item.keyCode === 13) {
          this.clickItem(item, i);
        }
        if (item.keyCode === 27) {
          this.closeSelect();
        }
      });
    }
  }

  //Функция инициализации. Родительская функция, вызывается после
  //создания экземпляра класса
  selectInit(modules) {
    //Объявляем переменные до сборки шаблона селекса
    this.input;
    this.heightBtn;
    this.heightItem;
    this.amountItems = 1;
    this.defaultSelection = modules.defaultSelection || false;
    this.placeholder = modules.placeholder || 'Выбрать';
    this.createShape();
    //Обновляем переменные после сборки шаблона
    this.heightBtn = this.btn.clientHeight;
    this.heightItem = this.item[0].clientHeight;
    this.sizeList = modules.sizeList || this.heightItem * this.amountItems;
    this.selectControl();
  }
}

//Form
if (document.querySelector('.form')) {
  const form = document.querySelector('.form');
  const classLockBtn = '--hidden-btn';
  const classActiveSlide = '--active-slide';
  const slidesForm = form.querySelectorAll('.form__slide');
  let activeSlide = form.querySelector(`.${classActiveSlide}`);
  let inputsForm = activeSlide.querySelectorAll('.--req');
  const nextBtnForm = form.querySelector('.form__btn_next');
  const prevBtnForm = form.querySelector('.form__btn_prev');

  let slidesPosition = 0;
  let count;
  let temp;
  let currentStep = 0;
  let listValid;
  let isValid;

  const errorMessage = {
    minLetters: 'Введите не менее 2 символов в каждом поле',
    checkedFalse: 'Нужно выбрать не менее',
  };

  const validText = (input) => {
    if (input.value.length < 2) {
      input.closest('.form__slide').querySelector('.form__error').innerHTML = errorMessage['minLetters'];
      input.closest('.form__slide').querySelector('.form__error').style.display = 'block';
      input.classList.add('error-text');
    } else {
      input.closest('.form__slide').querySelector('.form__error').innerHTML = '';
      input.closest('.form__slide').querySelector('.form__error').removeAttribute('style');
      input.classList.remove('error-text');
      return true;
    }
    return false;
  };

  const validCheckbox = (inputs) => {
    temp = 0;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].checked === true) {
        temp++;
      }
    }
    if (temp !== 3) {
      inputs[0].closest('.form__slide').querySelector('.form__descr').style.color = 'red';
      inputs[0].closest('.form__slide').querySelector('.form__descr').classList.add('error-descr');
    } else {
      inputs[0].closest('.form__slide').querySelector('.form__descr').removeAttribute('style');
      inputs[0].closest('.form__slide').querySelector('.form__descr').classList.remove('error-descr');
      return true;
    }
    return false;
  };

  const validRadio = (inputs) => {
    temp = 0;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].checked === true) {
        temp++;
      }
    }
    if (!temp) {
      inputs[0].closest('.form__slide').querySelector('.form__descr').style.color = 'red';
      inputs[0].closest('.form__slide').querySelector('.form__descr').classList.add('error-descr');
    } else {
      inputs[0].closest('.form__slide').querySelector('.form__descr').removeAttribute('style');
      inputs[0].closest('.form__slide').querySelector('.form__descr').classList.remove('error-descr');
      return true;
    }
    return false;
  };

  const formValidate = () => {
    count = 0;
    listValid = [];
    isValid = false;
    for (let i = 0; i < inputsForm.length; i++) {
      if (inputsForm[i].type === 'text') {
        listValid.push(validText(inputsForm[i]));
      } else if (inputsForm[i].type === 'checkbox') {
        listValid.push(validCheckbox(inputsForm));
      } else if (inputsForm[i].type === 'radio') {
        listValid.push(validRadio(inputsForm));
      }
    }
    for (const bool of listValid) {
      if (!bool) {
        count++;
      }
    }
    if (!count) {
      isValid = true;
    }
  };

  const nextSlide = () => {
    formValidate();
    if (isValid) {
      slidesPosition += 100;
      if (slidesPosition >= slidesForm.length * 100) {
        nextBtnForm.type = 'submit';
        nextBtnForm.click();
        return;
      }
      for (let i = 0; i < slidesForm.length; i++) {
        slidesForm[i].style.bottom = `${slidesPosition}%`;
      }
      prevBtnForm.classList.remove(classLockBtn);
      slidesForm[currentStep].classList.remove(classActiveSlide);
      currentStep++;
      slidesForm[currentStep].classList.add(classActiveSlide);
      activeSlide = form.querySelector(`.${classActiveSlide}`);
      inputsForm = activeSlide.querySelectorAll('.--req');
    }
  };

  const prevSlide = () => {
    slidesPosition -= 100;
    if (!slidesPosition) {
      prevBtnForm.classList.add(classLockBtn);
    }
    for (let i = 0; i < slidesForm.length; i++) {
      slidesForm[i].style.bottom = `${slidesPosition}%`;
    }
    slidesForm[currentStep].classList.remove(classActiveSlide);
    currentStep--;
    slidesForm[currentStep].classList.add(classActiveSlide);
    activeSlide = form.querySelector(`.${classActiveSlide}`);
    inputsForm = activeSlide.querySelectorAll('.--req');
  };

  nextBtnForm.addEventListener('click', nextSlide);
  prevBtnForm.addEventListener('click', prevSlide);
}

if (document.querySelector('.form__select_first')) {
  const select1 = new select('.form__select_first');

  select1.selectInit({
    // defaultSelection: 2,
    placeholder: 'Вариант'
  });
}
if (document.querySelector('.card-content__swiper')) {
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
}

if (document.querySelector('.similar__slider')) {
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
}

if (document.querySelector('.details__swiper')) {
  const detailswiper = new Swiper('.details__swiper', {
    direction: 'horizontal',
    centeredSlides: false,
    loop: false,
    // navigation: {
    //   nextEl: '.similar__next',
    //   prevEl: '.similar__prev',
    // },

    breakpoints: {
      320: {
        slidesPerView: 5,
        spaceBetween: 5,
      },
      576: {
        slidesPerView: 10,
        spaceBetween: 5,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 5,
      },
    }
  });
}

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
  const slides = document.querySelectorAll('.card-content__slide');
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
//Кнопка раскрыть скрыть товары в корзине
if(document.querySelector('.products')) {
  const sectionProd = document.querySelector('.products');
  const closeBtnProd = sectionProd.querySelector('.products__btn');
  const positionsCart = sectionProd.querySelectorAll('.position');
  const headCart = sectionProd.querySelector('.products__head');
  const miniCheck = headCart.querySelector('.products__list_close');
  let heightList;

  const showCartList = () => {
    heightList = 0;
    for (let i = 0; i < positionsCart.length; i++) {
      heightList += positionsCart[i].clientHeight;
    }
    heightList += 178;
    sectionProd.style.height = `${heightList}px`;
    closeBtnProd.classList.remove('--active');
    headCart.removeAttribute('style');
    miniCheck.classList.remove('--active');
  };

  const hideCartList = () => {
    sectionProd.style.height = '105px';
    closeBtnProd.classList.add('--active');
    headCart.style.borderBottom = 'none';
    miniCheck.classList.add('--active');
  };

  closeBtnProd.addEventListener('click', () => {
    if (closeBtnProd.classList.contains('--active')) {
      showCartList();
    } else {
      hideCartList();
    }
  });
}
//Раскрывающийся список в фильтрах
if (document.querySelector('.btn-list')) {
  const btnFilter = document.querySelectorAll('.btn-list');
  const listFilter = document.querySelectorAll('.close-list');

  for (let i = 0; i < btnFilter.length; i++) {
    btnFilter[i].addEventListener('click', () => {
      btnFilter[i].classList.toggle('--close');
      if (listFilter[i].getAttribute('style')) {
        listFilter[i].removeAttribute('style');
      } else {
        listFilter[i].style.height = '0';
      }
    });
  }
}

if (document.querySelector('.headcart')) {
  const headcart = document.querySelector('.headcart');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 850) {
      headcart.classList.add('active');
    } else {
      headcart.classList.remove('active');
    }
  });
}
