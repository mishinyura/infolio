/* eslint-disable no-unused-vars */
import * as flsFunctions from './modules/functions.js';
import './modules/swiper.js';
// import Swiper, { Navigation, Pagination } from 'swiper';

flsFunctions.isWebp();

import './modules/paramMob.js';
import './modules/editview.js';
import './modules/previewCard.js';
import './modules/sorted.js';
import './modules/accordeon.js';
import './modules/closelist.js';
import './modules/form.js';
import './modules/upbtn.js';

// if (document.querySelector('.control__save')) {
//   const savebtn = document.querySelector('.control__save');
//   console.log(savebtn)
//   savebtn.classList.add('kdd')

//   savebtn.addEventListener('click', () => {
//     savebtn.classList.toggle('--active');
//   });
// }

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
