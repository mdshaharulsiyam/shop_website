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