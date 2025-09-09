import { useGlobalContext } from '@/providers/ContextProvider'
import type { IOrderCard } from '@/types/propsTypes'
import { hexToRGBA4, hexToRGBA7 } from '@/utils/hexToRGBA'
import { Minus, Plus } from 'lucide-react'
import IconButton from '../buttons/IconButton'

const OrderCard = ({ item, type = "order", handler, removeHandler }: IOrderCard) => {
  const { themeColor } = useGlobalContext()
  return (
    <div className='p-2 rounded-md mb-2 flex justify-between items-center gap-2 w-full md:w-[49.5%] xl:w-[33%] relative' style={{
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

                handler={() => console.log('')}
                icon={<Minus size={16} />}
              />
              <p className=''>{item?.quantity}</p>
              <IconButton
                style={{
                  padding: 2,
                  background: themeColor.green,
                  color: themeColor.white
                }}

                handler={() => console.log('')}
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
