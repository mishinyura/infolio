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
    // this.scrollbarClass = '-select__scrollbar-';
    this.classActive = '--active';
    this.inputsName = classObj;
  }

  createShape() {
    console.log('Запущена функция craeatShape');
    //Создается input, присваивается класс, type, name
    //и добавляется как дочерний элемент box в начало контейнера.
    //В него будет передаваться выбранное значение для дальнейшего использования
    this.input = document.createElement('input');
    this.input.setAttribute('type', 'hidden');
    this.input.setAttribute('name', this.inputsName);
    if (this.defaultSelection) {
      this.positionSelect = this.defaultSelection - 1;
      this.btn.innerText = this.item[this.positionSelect].innerText;
      this.input.value = this.item[this.positionSelect].innerText;
      this.item[this.positionSelect].style.display = 'none';
    } else {
      this.input.value = '';
      this.btn.innerText = this.placeholder;
      this.positionSelect = 0;
    }
    for (let i = 0; this.item.length > i; i++) {
      this.item[i].classList.add(this.itemClass);
      this.item[i].setAttribute('tabindex', '0');
      this.amountItems++;
    }
    this.box.insertAdjacentHTML('afterbegin', this.input.outerHTML);
    //Добавление классов контейнеру с селектом, контейнеру с вариантами,
    //добавление атрибута tabindex для кнопки(выбранного элемента)
    this.box.classList.add(this.boxClass);
    this.list.classList.add(this.listClass);
    this.btn.classList.add(this.btnClass);
    // this.scrollbar.classList.add(this.scrollbarClass);
    this.btn.setAttribute('tabindex', '0');
    //
    this.icon.style.content = `url(${this.iconLink})`;
  }

  editStyleClass() {
    console.log(this.heightBtn);
    console.log(this.heightItem);
    document.getElementsByClassName(this.classActiveLict)[0].style.paddintTop = `${this.heightBtn}px`;
  }

  closeSelect() {
    console.log('Запущена функция closeSelect');
    this.btn.classList.remove(this.classActive);
    this.list.removeAttribute('style');
    this.icon.style.transform = 'none';
  }

  openSelect() {
    console.log('Запущена функция openSelect');
    this.btn.classList.add(this.classActive);
    this.list.style.height = `${this.sizeList}px`;
    this.list.style.paddingTop = `${this.heightBtn}px`;
    this.list.style.visibility = 'visible';
    this.icon.style.transition = 'transform .1 linear';
    this.icon.style.transform = 'rotate(-180deg)';
  }

  //Функция сработает при выборе нового элемента из списка
  clickItem(item, index) {
    console.log('Запущена функция clickItem');
    this.item[this.positionSelect].removeAttribute('style');
    this.btn.innerText = item.target.innerText;
    this.positionSelect = index;
    this.input.value = item.target.innerText;
    this.item[index].style.display = 'none';
  }

  //Функция отвечает за взаимодействие с select
  selectControl() {
    console.log('Запущена функция selectControl');
    //При взаимодействии с клавиатурой
    //enter раскрывает список
    this.btn.addEventListener('keydown', (btn) => {
      console.log(btn.keyCode);
      if (this.btn.keyCode === 13) {
        this.openSelect();
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
    //При клике за пределы селекта, селект закроется
    document.addEventListener( 'click', (e) => {
      if (!e.composedPath().includes(this.btn)) {
        this.closeSelect();
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
    console.log('Запущена функция selectInit');
    //Объявляем переменные до сборки шаблона селекса
    this.input;
    this.heightBtn;
    this.heightItem;
    this.amountItems = 1;
    this.defaultSelection = modules.defaultSelection || false;
    this.placeholder = modules.placeholder || 'Выбрать';
    this.placeholderColor = modules.appearance.placeholderColor || '#000';
    this.iconLink = modules.appearance.icon || './arrow.svg';
    for (let i = 0; i < document.styleSheets[0].cssRules.length; i++) {
      if (document.styleSheets[0].cssRules[i].selectorText === `.${this.btnClass}::after`) {
        this.icon = document.styleSheets[0].cssRules[i];
        break;
      }
    }
    this.createShape();
    //Обновляем переменные после сборки шаблона
    this.heightBtn = this.btn.clientHeight;
    this.heightItem = this.item[0].clientHeight;
    this.sizeList = modules.sizeList || this.heightItem * this.amountItems;
    this.selectControl();
  }
}

export { select };
