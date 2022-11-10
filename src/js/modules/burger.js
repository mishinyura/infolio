const navBurger = document.querySelector('.nav');
const btnBurgerOpen = navBurger.querySelector('.nav__burger');
const btnBurgerClose = navBurger.querySelector('.nav__close');
const navMenu = navBurger.querySelector('.nav__menu');
const classActiveBurger = 'active-menu';
const clickMenu = () => {
  navMenu.classList.toggle(classActiveBurger);
};

document.addEventListener( 'click', (e) => {
  if (!e.composedPath().includes(btnBurgerOpen) && navMenu.classList.contains(classActiveBurger)) {
    if (!e.composedPath().includes(navMenu)) {
      clickMenu();
    }
  }
});

btnBurgerOpen.addEventListener('click', clickMenu);
btnBurgerClose.addEventListener('click', clickMenu);
