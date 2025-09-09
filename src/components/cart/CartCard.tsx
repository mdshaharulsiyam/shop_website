import { useGlobalContext } from '@/providers/ContextProvider'
import type { ICartCard } from '@/types/propsTypes'
import { hexToRGBA4, hexToRGBA6 } from '@/utils/hexToRGBA'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import IconButton from '../buttons/IconButton'

const CartCard = ({ item, setOpen }: ICartCard) => {
  const { themeColor } = useGlobalContext()
  return (
    <div style={{
      color: themeColor.gray,
      borderColor: hexToRGBA4(themeColor.gray)
    }}
      className='p-2 border rounded-2xl mb-4 relative'
    >
      <div className="flex items-center space-x-4 mb-2" >
        <img src={item?.image} alt={item.name} className="w-16 h-16 object-cover rounded-2xl" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold">{item?.name}</h3>
          <p className="text-sm text-gray-500">BDT {item?.price.toFixed(2)}</p>
        </div>
        <button className='absolute top-3 right-3 cursor-pointer'>
          <X className='w-4 h-4' />
        </button>
      </div>
      <IconButton handler={() => console.log('Order Now')}
        style={{
          backgroundColor: hexToRGBA6(themeColor.green),
          padding: '4px 10px',
        }}
        icon={<Link onClick={() => setOpen(false)} to={`/checkout`}>
          <p style={{
            color: themeColor.white
          }}>Order Now</p>
        </Link>} />
    </div>
  )
}

export default CartCard
