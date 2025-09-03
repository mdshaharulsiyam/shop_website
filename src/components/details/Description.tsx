import type { DetailsDescType } from '@/types/propsTypes'
import { Star } from 'lucide-react'
// import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const Description = ({ data }: DetailsDescType) => {
  const {
    product_name,
    sku,
    in_stock,
    current_price,
    discount_percentage,
    original_price,
    ratings,
    real_time_visitors,
    sale_timer,
    product_description,
    product_details,
    available_sizes,
    available_colors
  } = data

  const renderStars = () => {
    const filledStars = ratings?.average_rating || 0
    const emptyStars = 5 - Number(filledStars)
    return (
      <div className="flex text-yellow-400">
        {Array(filledStars).fill(0).map((_, i) => (
          <Star key={i} />
        ))}
        {Array(emptyStars).fill(0).map((_, i) => (
          <Star key={i} className="opacity-50" />
        ))}
        <span className="ml-2 text-gray-500">{ratings?.number_of_ratings?.toString()} Ratings</span>
      </div>
    )
  }

  // const formatTimer = (timer) => {
  //   return `${timer.days} Days ${String(timer.hours).padStart(2, '0')}:${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`
  // }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{product_name}</h1>
      <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          {renderStars()}
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-medium">SKU#: {sku}</span>
          <span className={`font-semibold ${in_stock ? 'text-green-500' : 'text-red-500'}`}>
            {in_stock ? 'IN STOCK' : 'OUT OF STOCK'}
          </span>
        </div>
      </div>

      <div className="my-4">
        <div className="flex items-end space-x-2">
          <span className="text-3xl font-bold text-gray-900">${current_price.toFixed(2)}</span>
          <span className="text-xl text-gray-500 line-through">${original_price.toFixed(2)}</span>
          <span className="text-xl text-red-500">-{discount_percentage?.toString()}%</span>
        </div>
        <p className="mt-1 text-sm text-gray-500">M.R.P.: ${original_price.toFixed(2)}</p>
      </div>

      <div className="text-gray-700 my-6">
        <p>{product_description}</p>
        <ul className="mt-4 space-y-2 text-sm">
          {Object.entries(product_details).map(([key, value]) => (
            <li key={key}>
              <span className="font-semibold capitalize">{key.replace('_', ' ')}:</span> {value}
            </li>
          ))}
        </ul>
      </div>

      <div className="my-6">
        <h3 className="text-lg font-semibold text-gray-800">SIZE</h3>
        <div className="flex space-x-2 mt-2">
          {available_sizes.map((size, index) => (
            <div
              key={index}
              className="px-4 py-2 border rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="my-6">
        <h3 className="text-lg font-semibold text-gray-800">COLORS</h3>
        <div className="flex space-x-2 mt-2">
          {available_colors.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
              style={{ backgroundColor: color as any }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Description