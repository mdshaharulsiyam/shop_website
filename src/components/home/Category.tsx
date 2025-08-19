"use client"

import { prevSlide } from '@/handler/bannerHandler'
import { useGlobalContext } from '@/providers/ContextProvider'
import { hexToRGBA7 } from '@/utils/hexToRGBA'
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import IconButton from '../buttons/IconButton'
import PaginationDots from '../paginations_dots/PaginationDots'
import CategoryTable from '../shared/CategoryTable'

const Category = () => {
  const { themeColor } = useGlobalContext()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

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



  return (
    <div className="w-full container mx-auto ">
      <div className="flex items-center justify-between mb-8">
        <h2 style={{
          color: hexToRGBA7(themeColor.black)
        }} className="text-2xl font-bold">Category</h2>

        {/* Pagination dots */}
        <div className="flex items-center gap-2">
          <PaginationDots
            setCurrentSlide={setCurrentSlide}
            currentSlide={currentSlide}
            setDirection={setDirection}
            slideNumber={categorySlides.length}
          />
        </div>
      </div>

      {/* Slider */}
      <div className="relative overflow-hidden mb-4">
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
              <CategoryTable key={index} category={category} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Arrows */}
      <div className="flex justify-center gap-4 mt-6 mb-4 md:hidden">
        <IconButton
          icon={<ChevronLeft className="w-5 h-5" />}
          handler={() => prevSlide(setDirection, setCurrentSlide, categorySlides as any)}
        />

        <IconButton
          icon={<ChevronRight className="w-5 h-5" />}
          handler={() => prevSlide(setDirection, setCurrentSlide, categorySlides as any)}
        />

      </div>
    </div>
  )
}

export default Category
