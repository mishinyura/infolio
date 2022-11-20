/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import Swiper, { Autoplay, Navigation, Pagination, Scrollbar, EffectCoverflow } from 'swiper';
Swiper.use([Autoplay, Navigation, Pagination, Scrollbar, EffectCoverflow]);

const slider = new Swiper('.slider__inner', {
  loop: true,
  centeredSlides: true,
  spaceBetween: 5,
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 0,
    depth: 300,
    slideShadows : false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 1.5,
    },
    1024: {
      slidesPerView: 1,
    },
  }
});

const switcher = new Swiper('.switch__inner', {
  direction: 'vertical',
  loop: true,
  slidesPerView: 5.5,
  spaceBetween: 115,
  navigation: {
    nextEl: '.switch__next',
    prevEl: '.switch__prev',
  },
});

const switchSlides = document.querySelectorAll('.switch__slide');

for (let item of switchSlides) {
  item.addEventListener('click', () => {
    for (let i of switchSlides) {
      i.classList.remove('switch__slide--active');
    }
    item.classList.add('switch__slide--active');
    for (let i = 0; i < slider.slides.length; i++) {
      if (item.closest('.swiper-slide').getAttribute('slide-id') === slider.slides[i].attributes[1].value) {
        slider.slideToLoop(slider.slides[i].dataset.swiperSlideIndex, 800);
      }
    }
  });
}

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
