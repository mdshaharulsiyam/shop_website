"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const Category = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const categorySlides = [
    [
      {
        title: "Fashion Clothes",
        discount: "35%",
        items: 16,
        images: ["/fashion-clothing-rack.png", "/red-dress-on-hanger.png", "/casual-wear-collection.png"],
      },
      {
        title: "Generic Cosmetics",
        discount: "22%",
        items: 45,
        images: ["/makeup-palette.png", "/lipstick-collection.png", "/beauty-products-collection.png"],
      },
      {
        title: "Stylish Shoes",
        discount: "65%",
        items: 58,
        images: ["/sneakers-collection.png", "/placeholder-uz2ua.png", "/casual-footwear.png"],
      },
      {
        title: "Digital Watches",
        discount: "45%",
        items: 64,
        images: ["/smartwatch-collection.png", "/placeholder-bhdf4.png", "/luxury-timepiece.png"],
      },
      {
        title: "Leather Belts",
        discount: "63%",
        items: 75,
        images: ["/leather-belt-collection.png", "/designer-belt-buckle.png", "/placeholder-6fhdg.png"],
      },
    ],
    [
      {
        title: "Electronics",
        discount: "40%",
        items: 32,
        images: ["/smartphone-collection.png", "/placeholder-4n8wd.png", "/tech-gadgets-display.png"],
      },
      {
        title: "Home Decor",
        discount: "30%",
        items: 28,
        images: ["/home-decor.png", "/modern-living-room.png", "/decorative-accessories.png"],
      },
      {
        title: "Sports Gear",
        discount: "50%",
        items: 41,
        images: [
          "/placeholder.svg?height=80&width=80",
          "/placeholder.svg?height=80&width=80",
          "/placeholder.svg?height=80&width=80",
        ],
      },
      {
        title: "Books",
        discount: "25%",
        items: 89,
        images: [
          "/placeholder.svg?height=80&width=80",
          "/placeholder.svg?height=80&width=80",
          "/placeholder.svg?height=80&width=80",
        ],
      },
      {
        title: "Jewelry",
        discount: "55%",
        items: 23,
        images: [
          "/placeholder.svg?height=80&width=80",
          "/placeholder.svg?height=80&width=80",
          "/placeholder.svg?height=80&width=80",
        ],
      },
    ],
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % categorySlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + categorySlides.length) % categorySlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with title and pagination */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Category</h2>

          {/* Pagination dots */}
          <div className="flex items-center gap-2">
            {categorySlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {categorySlides.map((slideCategories, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {slideCategories.map((category, index) => (
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

                      {/* Category Info */}
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{category.title}</h3>
                        <p className="text-sm text-gray-600">Items ({category.items})</p>
                      </div>

                      {/* Product Images Grid */}
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows (Optional - for mobile) */}
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
