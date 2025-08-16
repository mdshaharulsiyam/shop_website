"use client"
import { useGlobalContext } from '@/providers/ContextProvider'
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import NextPrevButton from '../buttons/NextPrevButton'
import CircleImage from './Banner/CircleImage'
import DiscountBadge from './Banner/DiscountBadge'
const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { themeColor } = useGlobalContext()

  const slides = [
    {
      discount: "22%",
      title: "Cosmetics sale",
      subtitle: "for Women's",
      description: "Wear the change. Fashion that feels good.",
      image: "/fashionable-woman-denim.png",
      bgColor: "bg-slate-800",
    },
    {
      discount: "44%",
      title: "Fashion sale",
      subtitle: "for Children's",
      description: "Comfort meets style. Perfect for little ones.",
      image: "/child-fashion-model.png",
      bgColor: "bg-slate-700",
    },
    {
      discount: "35%",
      title: "Summer collection",
      subtitle: "for Everyone",
      description: "Beat the heat with our cool summer styles.",
      image: "/summer-fashion-model.png",
      bgColor: "bg-slate-900",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000) // Auto-advance every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const currentSlideData = slides[currentSlide]

  return (
    <div
      className={`relative ${currentSlideData.bgColor} rounded-2xl overflow-hidden min-h-[400px] md:min-h-[500px] transition-colors duration-500`}
    >
      {/* Background decorative elements */}
      <div className="absolute top-8 left-8 text-white/20 text-2xl font-bold">{"⚡".repeat(8)}</div>
      <div className="absolute bottom-8 right-8 text-white/20 text-2xl font-bold">{"⚡".repeat(8)}</div>
      <div className="absolute top-1/2 right-16 text-white/30 text-6xl font-bold transform -translate-y-1/2">7</div>
      <NextPrevButton handler={prevSlide} />

      <NextPrevButton parentClassNames='-right-4 left-auto' handler={nextSlide} icon={<ChevronRight style={{ color: themeColor.black }} className="w-6 h-6" />} />

      <div className="flex flex-col md:flex-row items-center justify-between h-full px-8 md:px-16 py-12">
        {/* Left content */}
        <div className="flex-1 flex-col text-white mb-8 md:mb-0 justify-center items-center">
          <DiscountBadge discount={currentSlideData?.discount} />

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight transition-all duration-500">
            {currentSlideData.title}
            <br />
            {currentSlideData.subtitle}
          </h1>

          <p className="text-lg text-gray-300 mb-8 max-w-md transition-all duration-500">
            {currentSlideData.description}
          </p>

          {/* CTA Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Shop Now
          </button>

          {/* Decorative plus */}
        </div>

        {/* Right content - Circular image */}
        <CircleImage image={currentSlideData?.image} />
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-blue-500" : "w-3 bg-white/30 hover:bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Banner
