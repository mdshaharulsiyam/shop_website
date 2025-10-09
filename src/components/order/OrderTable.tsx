import type { IOrderTable } from '@/types/propsTypes'
import OrderCard from './OrderCard'
import { useGetAllOrdersQuery } from '@/Redux/apis/orderApis'
import { imageUrl } from '@/Redux/baseApi'
import { useMemo } from 'react'
const OrderTable = ({ status }: IOrderTable) => {
  const { data: res, isFetching } = useGetAllOrdersQuery({ delivery_status: status })
  const list = (res?.data || res?.result || []) as any[]

  // Flatten orders -> items ready for OrderCard
  const items = useMemo(() => {
    const rows: Array<{ name: string; image: string; quantity: number; price: number }> = []
    for (const order of list) {
      const orderItems = Array.isArray(order?.items) ? order.items : []
      for (const it of orderItems) {
        const prod = it?.product || {}
        const name = prod?.name || 'Product'
        const price = Number(prod?.price ?? 0)
        const imgArr = prod?.img || []
        const image = Array.isArray(imgArr) && imgArr[0] ? imageUrl(imgArr[0]) : 'https://via.placeholder.co/80?text=No+Image'
        rows.push({ name, image, quantity: Number(it?.quantity || 1), price })
      }
    }
    return rows
  }, [list])

  if (isFetching) {
    return <div className='w-full py-6 text-center'>Loading orders...</div>
  }

  if (!items.length) {
    return <div className='w-full py-6 text-center'>No orders found for "{status}"</div>
  }

  return (
    <div className='w-full flex justify-start items-center flex-col md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1%] lg:gap-[.5%]'>
      {items.map((item, i: number) => (
        <OrderCard key={i} item={item as any} />
      ))}
    </div>
  )
}

export default OrderTable
