import { useGlobalContext } from '@/providers/ContextProvider'
import type { IOrderCard } from '@/types/propsTypes'
import { hexToRGBA4, hexToRGBA7 } from '@/utils/hexToRGBA'
import { Minus, Plus } from 'lucide-react'
import IconButton from '../buttons/IconButton'

const OrderCard = ({ item, type = "order", handler, removeHandler }: IOrderCard) => {
  const { themeColor } = useGlobalContext()
  console.log(handler, removeHandler)
  return (
    <div className='p-2 rounded-md mb-2 flex justify-between items-center gap-2 w-full relative' style={{
      background: themeColor.white,
      borderColor: hexToRGBA4(themeColor.black),
      color: hexToRGBA7(themeColor.black)
    }}>
      <div className='flex justify-between items-start gap-2'>
        <img src={item?.image} alt={item?.name} className='w-20 h-20 rounded-md object-cover' />
        <div>
          <div className='flex justify-between items-start gap-2'>
            <p className='uppercase'>{item?.name}</p>
            {
              type == "order" && <p className=''>({item?.quantity})</p>
            }
          </div>
          {Array.isArray(item?.variants) && item.variants.length > 0 && (
            <div className='text-xs text-gray-600 mb-1 flex items-center gap-2 flex-wrap'>
              {item.variants.map((v, i) => {
                const isColor = String(v?.name || '').toLowerCase().includes('color');
                if (isColor) {
                  return (
                    <span key={i} className='inline-flex items-center gap-1 mr-2'>
                      <span
                        className='inline-block rounded-full border'
                        style={{ width: 14, height: 14, backgroundColor: v?.value || '#ccc' }}
                        title={`${v.name}: ${v.value}`}
                      />
                      <span>{v.value}</span>
                    </span>
                  );
                }
                return (
                  <span key={i} className='mr-2'>
                    <span className='font-semibold'>{v.name}:</span> {v.value}
                  </span>
                );
              })}
            </div>
          )}
          <p className='text-sm my-1'>Price : {item?.price} TK</p>
          <p className='text-sm'>Total price : {item?.price * item?.quantity} TK</p>
          {type == 'checkout' &&
            <div className='flex justify-start items-center gap-1'>
              <IconButton
                style={{
                  padding: 2,
                  background: themeColor.red,
                  color: themeColor.white
                }}

                handler={() => {
                  const newQty = Math.max(1, (item?.quantity || 1) - 1)
                  handler && handler((item as any)?.id || (item as any)?._id, newQty)
                }}
                icon={<Minus size={16} />}
              />
              <p className=''>{item?.quantity}</p>
              <IconButton
                style={{
                  padding: 2,
                  background: themeColor.green,
                  color: themeColor.white
                }}

                handler={() => {
                  const newQty = (item?.quantity || 1) + 1
                  handler && handler((item as any)?.id || (item as any)?._id, newQty)
                }}
                icon={<Plus size={16} />}
              />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default OrderCard
