"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const Category = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0) // 🔥 track direction

  const categorySlides = [
    [
      { title: "Fashion Clothes", discount: "35%", items: 16, images: ["https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg", "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg", "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg"] },
      { title: "Generic Cosmetics", discount: "22%", items: 45, images: ["https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg", "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg", "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg"] },
      { title: "Stylish Shoes", discount: "65%", items: 58, images: ["https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg", "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg", "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg"] },
      { title: "Digital Watches", discount: "45%", items: 64, images: ["https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg", "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg", "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg"] },
      { title: "Leather Belts", discount: "63%", items: 75, images: ["https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg", "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg", "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg"] },
    ],
    [
      { title: "Electronics", discount: "40%", items: 32, images: ["https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg", "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg", "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg"] },
      { title: "Home Decor", discount: "30%", items: 28, images: ["https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg", "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg", "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg"] },
      { title: "Sports Gear", discount: "50%", items: 41, images: ["https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg", "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg", "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg"] },
      { title: "Books", discount: "25%", items: 89, images: ["https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg", "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg", "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg"] },
      { title: "Jewelry", discount: "55%", items: 23, images: ["https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg", "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg", "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg"] },
    ],
  ]

  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 40 : -40,
      scale: 0.98
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? 40 : -40,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    })
  }


  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % categorySlides.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + categorySlides.length) % categorySlides.length)
  }

  return (
    <div className="w-full container mx-auto">
      <div className=" px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Category</h2>

          {/* Pagination dots */}
          <div className="flex items-center gap-2">
            {categorySlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1)
                  setCurrentSlide(index)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"}`}
              />
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden min-h-[300px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={variants as any}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            >
              {categorySlides[currentSlide].map((category, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Discount Badge */}
                  <div className="relative mb-4">
                    <div className="absolute -top-2 -left-2 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {category.discount}
                      <div className="absolute right-0 top-0 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent transform translate-x-full"></div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{category.title}</h3>
                    <p className="text-sm text-gray-600">Items ({category.items})</p>
                  </div>

                  {/* Images */}
                  <div className="grid grid-cols-3 gap-2">
                    {category.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${category.title} ${imgIndex + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Arrows */}
        <div className="flex justify-center gap-4 mt-8 md:hidden">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Category
