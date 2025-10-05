import { useGlobalContext } from '@/providers/ContextProvider'
import type { IDetailsDescType } from '@/types/propsTypes'
import { hexToRGBA5, hexToRGBA6, hexToRGBA7 } from '@/utils/hexToRGBA'
import { FaStar } from 'react-icons/fa'
import IconButton from '../buttons/IconButton'
// import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const Description = ({ data }: IDetailsDescType) => {
  const { themeColor } = useGlobalContext()
  const {
    name,
    sort_description,
    price,
    discount,
    stock,
    attributes
  } = data

  const renderStars = () => {
    return (
      <div className="flex" >
        <FaStar style={{
          color: themeColor.yellow,
        }} size={24} />
        <span className="ml-2" style={{
          color: themeColor.gray
        }}>{50 + ""} Ratings</span>
      </div>
    )
  }

  // const formatTimer = (timer) => {
  //   return `${timer.days} Days ${String(timer.hours).padStart(2, '0')}:${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`
  // }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold " style={{
        color: hexToRGBA7(themeColor.black)
      }}>{name}</h1>
      <div style={{
        color: themeColor.gray
      }} className="flex items-center justify-between mt-2 text-sm ">
        <div className="flex items-center space-x-2">
          {renderStars()}
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-medium">{stock + ""}</span>
          <span style={{
            color: stock>0 ? themeColor.green : hexToRGBA7(themeColor.red)
          }} className={`font-semibold `}>
            {stock>0 ? 'IN STOCK' : 'OUT OF STOCK'}
          </span>
        </div>
      </div>

      <div className="my-4">
        <div className="flex items-end space-x-2">
          <span className="text-3xl font-bold " style={{
            color: themeColor.black
          }}>${price?.toFixed(2)}</span>
          <span style={{
            color: themeColor.gray
          }} className="line-through text-xl">${price?.toFixed(2)}</span>
          <span className="text-xl " style={{
            color: themeColor.red
          }}>-{discount?.toString()}%</span>
        </div>
        <p className="mt-1 text-sm " style={{
          color: themeColor.gray
        }}>M.R.P.: ${price?.toFixed(2)}</p>
      </div>

      <div style={{
        color: themeColor.gray
      }} className="my-6">
        <p>{sort_description}</p>
        {/* <ul className="mt-4 space-y-2 text-sm">
          {Object.entries(product_details).map(([key, value]) => (
            <li key={key}>
              <span className="font-semibold capitalize">{key.replace('_', ' ')}:</span> {value}
            </li>
          ))}
        </ul> */}
      </div>

      <div className="my-6">
        <h3 className="text-lg font-semibold text-gray-800">SIZE</h3>
        <div className="flex space-x-2 mt-2">
          {attributes?.filter((attr) => attr.name === 'size')?.[0]?.value?.map((size, index) => (
            <div
              key={index}
              style={{
                backgroundColor: hexToRGBA5(themeColor.white),
                borderColor: themeColor.blue
              }}
              className="w-10 h-10 border rounded-full cursor-pointer transition-colors flex items-center justify-center"
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="my-6">
        <h3 className="text-lg font-semibold text-gray-800">COLORS</h3>
        <div className="flex space-x-2 mt-2">
          {attributes?.filter((attr) => attr.name === 'colors')?.[0]?.value?.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full border cursor-pointer"
              style={{ backgroundColor: color as any, borderColor: themeColor.blue }}
            ></div>
          ))}
        </div>
      </div>
      <div className='flex justify-start items-center gap-2'>
        <IconButton handler={() => console.log(attributes)}
          style={{
            backgroundColor: hexToRGBA6(themeColor.blue),
            padding: '8px 20px',
          }}
          icon={<div>
            <p style={{
              color: themeColor.white
            }}>Add To Cart</p>
          </div>} />
        <IconButton handler={() => console.log(attributes)}
          style={{
            backgroundColor: hexToRGBA6(themeColor.green),
            padding: '8px 20px',
          }}
          icon={<div>
            <p style={{
              color: themeColor.white
            }}>Order Now</p>
          </div>} />
      </div>
    </div>
  )
}

export default Description