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
