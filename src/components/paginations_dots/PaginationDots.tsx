import { goToSlide } from '@/handler/bannerHandler'
import { useGlobalContext } from '@/providers/ContextProvider'
import type { IPaginationDots } from '@/types/propsTypes'
import { hexToRGBA3 } from '@/utils/hexToRGBA'
import { motion } from "framer-motion"
const PaginationDots = ({ slideNumber, setDirection, setCurrentSlide, currentSlide }: IPaginationDots) => {
  const { themeColor } = useGlobalContext()
  return (
    <>
      {[...Array.from({ length: slideNumber })].map((_, index: number) => (
        <motion.button
          whileHover={{
            backgroundColor: themeColor.blue
          }}
          style={{
            backgroundColor: index === currentSlide ? themeColor.blue : hexToRGBA3(themeColor.black)
          }}
          key={index}
          onClick={() => goToSlide(index, setDirection, setCurrentSlide, currentSlide)}
          className={`h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8" : "w-3"}`}
        />
      ))}
    </>
  )
}

export default PaginationDots
