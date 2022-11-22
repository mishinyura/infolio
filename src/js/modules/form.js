if (document.querySelector('.form')) {
  const form = document.querySelector('.form');
  const inputsForm = form.querySelectorAll('.--req');
  const nextBtns = form.querySelectorAll('.form__btn');

  let activeSlide;

  const nextSlide = (btn) => {
    activeSlide = btn.target.parentElement;
  };

  for (let i = 0; nextBtns.length > i; i++) {
    nextBtns[i].addEventListener('click', nextSlide);
  }
}
