"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const Images = () => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const imageList = [
    "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg",
    "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg",
    "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg",
    "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg",
    "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg",
    "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg",
    "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg",
    "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg",
    "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg",
    "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg",
    "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg",
    "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg",
  ]
  const thumbContainerRef = useRef<HTMLDivElement>(null)
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (thumbRefs.current[index]) {
      thumbRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      })
    }
  }, [index])

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setDirection(1)
      setIndex((prevIndex) => (prevIndex + 1) % imageList.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [index, isAutoPlaying, imageList.length])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  const navigateToImage = (newIndex: number) => {
    if (newIndex === index) return
    setDirection(newIndex > index ? 1 : -1)
    setIndex(newIndex)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    const newIndex = index === 0 ? imageList.length - 1 : index - 1
    navigateToImage(newIndex)
  }

  const goToNext = () => {
    const newIndex = (index + 1) % imageList.length
    navigateToImage(newIndex)
  }

  return (
    <div className="w-full h-full max-w-4xl mx-auto">
      <div className="relative w-full bg-white/80 backdrop-blur-sm p-4 rounded-3xl shadow-2xl border border-gray-100">
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 group"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 group"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
        </button>

        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[650px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants as any}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <img
                className="w-full h-full object-cover"
                src={imageList[index] || "/placeholder.svg"}
                alt={`Product showcase ${index + 1}`}
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {index + 1} / {imageList.length}
        </div>

        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors"
        >
          {isAutoPlaying ? "Pause" : "Play"}
        </button>
      </div>

      <div className="mt-6">
        {/* Thumbnail Scroll Area */}
        <div
          ref={thumbContainerRef}
          className="flex gap-3 overflow-x-auto pb-2 w-full"
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
        >
          {imageList.map((image, i) => (
            <motion.button
              key={i}
              ref={(el) => (thumbRefs.current[i] = el)}
              onClick={() => navigateToImage(i)}
              className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden transition-all duration-300 
        ${i === index
                  ? "ring-4 ring-blue-500 ring-offset-2 scale-110"
                  : "ring-2 ring-gray-200 hover:ring-gray-300 hover:scale-105"
                }`}
              whileHover={{ scale: i === index ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ scrollSnapAlign: "center" }}
            >
              <img
                className="w-full h-full object-cover"
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${i + 1}`}
                loading="lazy"
              />
            </motion.button>
          ))}
        </div>


        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {imageList.map((_, i) => (
            <button
              key={i}
              onClick={() => navigateToImage(i)}
              className={`h-2 rounded-full transition-all duration-300 
          ${i === index ? "w-8 bg-blue-500" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

export default Images
