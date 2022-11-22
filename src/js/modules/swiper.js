/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
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
