"use client"
import { useGlobalContext } from '@/providers/ContextProvider'
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import NextPrevButton from '../buttons/NextPrevButton'
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

      <div
        style={{
          backgroundColor: themeColor.white
        }}
        className="absolute -left-4 top-1/2 transform -translate-y-1/2  rounded-full transition-colors z-10 cursor-pointer"
      >
        <NextPrevButton handler={prevSlide} />
      </div>
      <div
        style={{
          backgroundColor: themeColor.white
        }}
        className="absolute -right-4 top-1/2 transform -translate-y-1/2  rounded-full transition-colors z-10 cursor-pointer"
      >
        <NextPrevButton handler={nextSlide} icon={<ChevronRight style={{ color: themeColor.black }} className="w-6 h-6" />} />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between h-full px-8 md:px-16 py-12">
        {/* Left content */}
        <div className="flex-1 text-white mb-8 md:mb-0">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 text-slate-800 rounded-full mb-8 relative">
            <div className="text-center">
              <div className="text-lg font-bold">{currentSlideData.discount}</div>
              <div className="text-sm font-medium">Off</div>
            </div>
            {/* Badge decorative points */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-1/2 -left-2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 -right-2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-y-1/2"></div>
          </div>

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
          <div className="absolute bottom-16 left-16 text-white/30 text-4xl font-light">+</div>
        </div>

        {/* Right content - Circular image */}
        <div className="flex-1 flex justify-center md:justify-end relative">
          <div className="relative">
            {/* Outer decorative circle with dots */}
            <div className="absolute inset-0 w-80 h-80 md:w-96 md:h-96">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="none"
                  stroke="rgb(251 191 36)"
                  strokeWidth="2"
                  strokeDasharray="8 12"
                  className="animate-spin"
                  style={{ animationDuration: "20s" }}
                />
              </svg>
            </div>

            {/* Golden frame */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-4">
              {/* Inner dark frame */}
              <div className="w-full h-full rounded-full bg-slate-700 p-2">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-500">
                  <img
                    src={currentSlideData.image || "/placeholder.svg"}
                    alt="Fashion model"
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Decorative elements around the circle */}
            <div className="absolute -top-4 -right-4 w-16 h-8 bg-yellow-400 rounded-full transform rotate-12"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-10 bg-yellow-400 rounded-full transform -rotate-12"></div>
          </div>
        </div>
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
