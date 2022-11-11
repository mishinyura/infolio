const navBurger = document.querySelector('.sidebar');
const btnBurgerOpen = navBurger.querySelector('.sidebar__btn_mob');
const btnBurgerClose = navBurger.querySelector('.sidebar__close');
const navMenu = navBurger.querySelector('.sidebar__content');
const classActiveBurger = 'active-param';
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
