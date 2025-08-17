
import { AnimatePresence, motion } from "framer-motion"
import { Eye, Heart, RotateCcw, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"

const NewArrival = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0) // 🔹 track slide direction
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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

  // 🔹 Animation variants for sliding
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


  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {productSets.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-blue-500 w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
              />
            ))}
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
                  <div
                    key={product.id}
                    className={`bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-500 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Product Image */}
                    <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-100">
                      {product.badge && (
                        <div
                          className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium text-white z-10 ${product.badge.color}`}
                        >
                          {product.badge.text}
                        </div>
                      )}

                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                          <Heart className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                          <RotateCcw className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {product.category}
                        </span>
                        {product?.sizes && (
                          <div className="flex gap-1">
                            {product?.sizes.map((size: any) => (
                              <span key={size} className="text-xs text-gray-400">
                                {size}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <h3 className="font-medium text-gray-900 line-clamp-2">{product.name}</h3>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">${product.salePrice}</span>
                        {product.originalPrice !== product.salePrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Color Options */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {product?.colors.map((color: any, colorIndex: number) => (
                            <button
                              key={colorIndex}
                              className="w-4 h-4 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>

                        <button className="text-gray-400 hover:text-blue-500 transition-colors md:opacity-0 md:group-hover:opacity-100 opacity-100">
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default NewArrival
