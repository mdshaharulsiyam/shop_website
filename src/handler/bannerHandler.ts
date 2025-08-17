import type { GoToSlideFn, NextPrevSlideFn } from '@/types/functionsTypes';




export const nextSlide: NextPrevSlideFn = (setDirection, setCurrentSlide, slides) => {
  setDirection(1);
  setCurrentSlide((prev) => (prev + 1) % slides.length);
};

export const prevSlide: NextPrevSlideFn = (setDirection, setCurrentSlide, slides) => {
  setDirection(-1);
  setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
};

export const goToSlide: GoToSlideFn = (index, setDirection, setCurrentSlide, currentSlide) => {
  setDirection(index > currentSlide ? 1 : -1);
  setCurrentSlide(index);
};
