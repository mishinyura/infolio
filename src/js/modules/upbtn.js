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
