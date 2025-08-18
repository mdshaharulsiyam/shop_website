
import { nextSlide, prevSlide } from '@/handler/bannerHandler'
import { useGlobalContext } from '@/providers/ContextProvider'
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import NextPrevButton from '../buttons/NextPrevButton'
import PaginationDots from '../paginations_dots/PaginationDots'

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { themeColor } = useGlobalContext()
  const [direction, setDirection] = useState(0)

  const slides = [
    "https://i.ibb.co.com/ymLng86B/ec1eb042.jpg",
    "https://i.ibb.co.com/gLcKFMLt/product-banner-jpg.webp",
    "https://i.ibb.co.com/1tGrzQmH/3d-black-friday-big-sale-discount-template-banner-with-blank-space-3d-podium-for-product-sale-with-a.jpg"
  ]



  useEffect(() => {
    const interval = setInterval(() => nextSlide(setDirection, setCurrentSlide, slides), 5000)
    return () => clearInterval(interval)
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute"
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
      transition: {
        duration: 0.6
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
      transition: {
        duration: 0.6
      }
    })
  }

  return (
    <div className="relative bg-blend-multiply rounded-2xl overflow-hidden min-h-[400px] md:min-h-[500px] transition-colors duration-500 mb-6">
      <NextPrevButton handler={() => prevSlide(setDirection, setCurrentSlide, slides)} />

      <NextPrevButton
        parentClassNames='-right-4 left-auto'
        handler={() => nextSlide(setDirection, setCurrentSlide, slides)}
        icon={<ChevronRight style={{ color: themeColor.black }} className="w-6 h-6" />}
      />

      <div className="relative w-full h-[400px] md:h-[500px]">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full"
          >
            <img
              src={slides[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="rounded-2xl object-cover w-full  min-h-[400px] md:min-h-[500px]"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <PaginationDots
          setCurrentSlide={setCurrentSlide}
          currentSlide={currentSlide}
          setDirection={setDirection}
          slideNumber={slides.length}
        />
      </div>
    </div>
  )
}

export default Banner
