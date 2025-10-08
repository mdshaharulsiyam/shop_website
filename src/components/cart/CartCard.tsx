import { useGlobalContext } from '@/providers/ContextProvider'
import type { ICartCard } from '@/types/propsTypes'
import { hexToRGBA4, hexToRGBA6 } from '@/utils/hexToRGBA'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import IconButton from '../buttons/IconButton'

const CartCard = ({ item, setOpen, removeHandler }: ICartCard) => {
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
          <p className="text-sm text-gray-500">${item?.price.toFixed(2)} {item?.quantity ? `x ${item.quantity}` : ''}</p>
          {Array.isArray(item?.variants) && item.variants.length > 0 && (
            <div className='flex flex-wrap gap-2 mt-1'>
              {item.variants.map((v) => {
                const isColor = v.name?.toLowerCase() === 'colors';
                return (
                  <div key={`${v.name}-${v.value}`} className='flex items-center gap-1'>
                    {isColor ? (
                      <span
                        title={v.value}
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          backgroundColor: v.value as any,
                          border: '1px solid rgba(0,0,0,0.15)'
                        }}
                      />
                    ) : (
                      <span className='text-xs px-2 py-0.5 border rounded-full'>
                        {v.name}: {v.value}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <button
          onClick={() => item?.id && removeHandler && removeHandler(item.id)}
          className='absolute top-3 right-3 cursor-pointer'
          aria-label='Remove from cart'
        >
          <X className='w-4 h-4' />
        </button>
      </div>
      {typeof item?.total_price === 'number' && (
        <div className='flex items-center justify-between text-sm mb-2'>
          <span>Total</span>
          <span className='font-semibold'>${item.total_price.toFixed(2)}</span>
        </div>
      )}
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
