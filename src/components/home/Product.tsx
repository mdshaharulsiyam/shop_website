
import { useGlobalContext } from '@/providers/ContextProvider'
import { hexToRGBA7 } from '@/utils/hexToRGBA'
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { Link } from 'react-router-dom'
import PaginationDots from '../paginations_dots/PaginationDots'
import ProductCard from '../shared/ProductCard'
const Product = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0) // 🔹 track slide direction
  const { themeColor } = useGlobalContext()

  const productSets = [
    [
      {
        id: 1,
        image: "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg",
        badge: { text: "TRENDING", color: "bg-blue-500" },
        category: "T-SHIRT",
        sizes: ["S", "M", "XL"],
        name: "Cotton fabric T-shirt",
        originalPrice: 130,
        salePrice: 120,
        colors: ["#f3f4f6", "#3b82f6", "#ef4444", "#10b981"],
        rating: 4.5,
      },
      {
        id: 2,
        image: "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg",
        category: "SHOES",
        sizes: ["7", "8", "10"],
        name: "Special sport shoes",
        originalPrice: 55,
        salePrice: 55,
        colors: ["#1f2937", "#ef4444"],
        rating: 4.8,
      },
      {
        id: 3,
        image: "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg",
        badge: { text: "NEW", color: "bg-red-500" },
        category: "TOP",
        sizes: ["S", "M"],
        name: "Cotton fabric Top",
        originalPrice: 130,
        salePrice: 120,
        colors: ["#ffffff", "#e5e7eb", "#a855f7"],
        rating: 4.3,
      },
      {
        id: 4,
        image: "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg",
        badge: { text: "SALE", color: "bg-teal-500" },
        category: "WATCHES",
        name: "Mantu smart watch",
        originalPrice: 999,
        salePrice: 955,
        colors: ["#ffffff", "#1f2937"],
        rating: 4.7,
      },
      {
        id: 5,
        image: "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg",
        badge: { text: "20% OFF", color: "bg-gray-500" },
        category: "BELT",
        name: "Mantu leather belt",
        originalPrice: 12,
        salePrice: 10,
        colors: ["#d97706", "#1f2937"],
        rating: 4.2,
      },
    ],
    [
      {
        id: 6,
        image: "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg",
        badge: { text: "NEW", color: "bg-red-500" },
        category: "BAGS",
        name: "Designer handbag",
        originalPrice: 299,
        salePrice: 249,
        colors: ["#1f2937", "#d97706", "#ef4444"],
        rating: 4.6,
      },
      {
        id: 7,
        image: "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg",
        badge: { text: "TRENDING", color: "bg-blue-500" },
        category: "GLASSES",
        name: "Fashion sunglasses",
        originalPrice: 89,
        salePrice: 69,
        colors: ["#1f2937", "#d97706"],
        rating: 4.4,
      },
      {
        id: 8,
        image: "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg",
        badge: { text: "SALE", color: "bg-teal-500" },
        category: "MAKEUP",
        name: "Professional makeup kit",
        originalPrice: 159,
        salePrice: 119,
        colors: ["#ec4899", "#f59e0b", "#ef4444"],
        rating: 4.9,
      },
      {
        id: 9,
        image: "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg",
        category: "HAT",
        name: "Winter beanie hat",
        originalPrice: 25,
        salePrice: 25,
        colors: ["#1f2937", "#6b7280", "#ef4444"],
        rating: 4.1,
      },
      {
        id: 10,
        image: "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg",
        badge: { text: "15% OFF", color: "bg-yellow-500" },
        category: "JEWELRY",
        name: "Gold chain necklace",
        originalPrice: 199,
        salePrice: 169,
        colors: ["#f59e0b", "#6b7280"],
        rating: 4.8,
      },
    ],
  ]

  const currentProducts = productSets[currentSlide]

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
    <div className="container mx-auto">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center justify-start">
            <h2
              style={{
                color: hexToRGBA7(themeColor.black)
              }}
              className="text-2xl font-bold">Products</h2>
            <Link style={{
              color: hexToRGBA7(themeColor.blue)
            }} to="/products" className="ml-4 text-sm">View All</Link>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            <PaginationDots
              setCurrentSlide={setCurrentSlide}
              currentSlide={currentSlide}
              slideNumber={productSets.length}
              setDirection={setDirection}
            />
          </div>
        </div>

        {/* Products Grid with animation */}
        <div className="relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={variants as any}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {currentProducts.map((product: any, index: number) => (
                  <ProductCard key={product.id} product={product} index={index} isVisible={true} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}


export default Product
