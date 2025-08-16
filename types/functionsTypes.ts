export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type NextPrevSlideFn = (
  setDirection: SetState<number>,
  setCurrentSlide: SetState<number>,
  slides: string[]
) => void;

export type GoToSlideFn = (
  index: number,
  setDirection: SetState<number>,
  setCurrentSlide: SetState<number>,
  currentSlide: number
) => void;
// 🔹 Reusable SetState type


// 🔹 Type for next/prev slide functions
export type SlideFn = (
  setDirection: SetState<number>,
  setCurrentSlide: SetState<number>,
  categorySlides: string[]
) => void;