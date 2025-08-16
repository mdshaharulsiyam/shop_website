import { SlideFn } from '@/types/functionsTypes';


// 🔹 Functions
export const nextSlide: SlideFn = (setDirection, setCurrentSlide, categorySlides) => {
  setDirection(1);
  setCurrentSlide((prev) => (prev + 1) % categorySlides.length);
};

export const prevSlide: SlideFn = (setDirection, setCurrentSlide, categorySlides) => {
  setDirection(-1);
  setCurrentSlide((prev) => (prev - 1 + categorySlides.length) % categorySlides.length);
};
