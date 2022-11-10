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
