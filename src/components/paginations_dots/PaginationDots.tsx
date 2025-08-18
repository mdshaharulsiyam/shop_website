import { goToSlide } from '@/handler/bannerHandler'
import type { IPaginationDots } from '@/types/propsTypes'

const PaginationDots = ({ slideNumber, setDirection, setCurrentSlide, currentSlide }: IPaginationDots) => {
  return (
    <>
      {[...Array.from({ length: slideNumber })].map((_, index: number) => (
        <button
          key={index}
          onClick={() => goToSlide(index, setDirection, setCurrentSlide, currentSlide)}
          className={`h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-blue-500" : "w-3 bg-white/30 hover:bg-white/50"}`}
        />
      ))}
    </>
  )
}

export default PaginationDots
