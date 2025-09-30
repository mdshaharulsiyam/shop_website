
import { nextSlide, prevSlide } from '@/handler/bannerHandler'
import { useGlobalContext } from '@/providers/ContextProvider'
import { useGetBannerQuery } from '@/Redux/apis/bannerSlice'
import { imageUrl } from '@/Redux/baseApi'
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import NextPrevButton from '../buttons/NextPrevButton'
import PaginationDots from '../paginations_dots/PaginationDots'

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { themeColor } = useGlobalContext()
  const [direction, setDirection] = useState(0)
  const { data } = useGetBannerQuery(undefined)

  const images = data?.data || []
  useEffect(() => {
    const interval = setInterval(() => nextSlide(setDirection, setCurrentSlide, images), 5000)
    return () => clearInterval(interval)
  }, [images])

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
    <div className="relative bg-blend-multiply rounded-2xl overflow-hidden min-h-[400px] md:min-h-[500px] transition-colors duration-500 my-6">
      <NextPrevButton handler={() => prevSlide(setDirection, setCurrentSlide, images)} />

      <NextPrevButton
        parentClassNames='-right-4 left-auto'
        handler={() => nextSlide(setDirection, setCurrentSlide, images)}
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
              src={imageUrl(images[currentSlide]?.img)}
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
          slideNumber={images.length}
        />
      </div>
    </div>
  )
}

export default Banner
