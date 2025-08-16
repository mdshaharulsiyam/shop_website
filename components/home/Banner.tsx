"use client"
import { useGlobalContext } from '@/providers/ContextProvider'
import { ChevronRight } from "lucide-react"
import Image from 'next/image'
import { useEffect, useState } from "react"
import NextPrevButton from '../buttons/NextPrevButton'
import { motion, AnimatePresence } from "framer-motion"

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { themeColor } = useGlobalContext()
  const [direction, setDirection] = useState(0)

  const slides = [
    "https://placehold.co/600x400",
    "https://placehold.co/600x400/000/fff",
    "https://placehold.co/600x400/333/fff"
  ]

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,  // slide from right if next, left if prev
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
      x: direction < 0 ? 300 : -300, // slide out opposite direction
      opacity: 0,
      position: "absolute",
      transition: {
        duration: 0.6
      }
    })
  }

  return (
    <div className="relative bg-blend-multiply rounded-2xl overflow-hidden min-h-[400px] md:min-h-[500px] transition-colors duration-500">
      {/* Prev Button */}
      <NextPrevButton handler={prevSlide} />

      {/* Next Button */}
      <NextPrevButton
        parentClassNames='-right-4 left-auto'
        handler={nextSlide}
        icon={<ChevronRight style={{ color: themeColor.black }} className="w-6 h-6" />}
      />

      {/* Image with Framer Motion */}
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
            <Image
              src={slides[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              fill
              className="rounded-2xl object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-blue-500" : "w-3 bg-white/30 hover:bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Banner
