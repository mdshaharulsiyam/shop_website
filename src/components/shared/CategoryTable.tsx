import { useGlobalContext } from '@/providers/ContextProvider'
import type { ICategory } from '@/types/dataTypes'
import { hexToRGBA2, hexToRGBA5, hexToRGBA7 } from '@/utils/hexToRGBA'
import { useNavigate } from 'react-router-dom'

const CategoryTable = ({ category }: { category: ICategory }) => {
  const { themeColor } = useGlobalContext()
  const navigate = useNavigate()
  return (
    <div
      style={{
        backgroundColor: themeColor.white
      }}
      className=" rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Discount Badge */}
      <div className="relative mb-4">
        {/* <Badges title={category?.discount} /> */}
      </div>

      {/* Info */}
      <div className="mb-4">
        <h3
          style={{
            color: hexToRGBA7(themeColor.black)
          }}
          className="text-lg font-semibold  mb-1">{category.title}</h3>
        <p
          style={{
            color: hexToRGBA5(themeColor.black)
          }}
          className="text-sm">Items ({category.items})</p>
      </div>

      {/* Images */}
      <div className="grid grid-cols-3 gap-2">
        {category.images.map((image, imgIndex) => (
          <div style={{
            backgroundColor: hexToRGBA2(themeColor.black)
          }} key={imgIndex} className="aspect-square rounded-lg overflow-hidden">
            <img onClick={() => navigate(`/details/${image?._id}`)}
              src={image?.img || "/placeholder.svg"}
              alt={`${category.title} ${imgIndex + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryTable
