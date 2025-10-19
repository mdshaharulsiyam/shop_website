import { handleCardClick } from '@/handler/productCardHandler'
import type { IProductCard } from '@/types/propsTypes'
import { Eye, Heart, RotateCcw, ShoppingCart } from 'lucide-react'

const ProductCard = ({ product, index, isVisible }: IProductCard) => {
  console.log(product)
  return (
    <div onClick={() => handleCardClick(product.id?.toString())}
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
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors cursor-pointer">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors cursor-pointer">
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          {/* <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
            <RotateCcw className="w-4 h-4 text-gray-600" />
          </button> */}
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
          <span className="font-bold text-gray-900">${product.salePrice?.toFixed(2)}</span>
          {product.originalPrice !== product.salePrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice?.toFixed(2)}
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
  )
}

export default ProductCard
