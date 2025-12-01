import { useGetAllOrdersQuery } from '@/Redux/apis/orderApis'
import { imageUrl } from '@/Redux/baseApi'
import type { IOrderTable } from '@/types/propsTypes'
import { Pagination, Tag } from 'antd'
import { useEffect, useState } from 'react'

const OrderTable = ({ status }: IOrderTable) => {
  const PAGE_SIZE = 8
  const [page, setPage] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [status])

  const { data: res, isFetching } = useGetAllOrdersQuery({ delivery_status: status, page, limit: PAGE_SIZE })
  const orders = (res?.data || res?.result || []) as any[]

  if (isFetching) {
    return <div className='w-full py-6 text-center'>Loading orders...</div>
  }

  if (!orders.length) {
    return <div className='w-full py-6 text-center'>No orders found for "{status}"</div>
  }

  const totalItems = res?.pagination?.totalItems
    ?? res?.pagination?.total
    ?? res?.pagination?.totalDocs
    ?? (page * PAGE_SIZE + (orders.length === PAGE_SIZE ? PAGE_SIZE : 0))

  const renderItemVariants = (variants: Array<{ name: string; value: string }>) => (
    <div className='text-xs text-gray-500 flex flex-wrap gap-2 mt-1'>
      {variants.map((variant, idx) => {
        const isColor = variant.name?.toLowerCase().includes('color')
        return (
          <span key={`${variant.name}-${idx}`} className='inline-flex items-center gap-1'>
            {isColor && (
              <span
                className='inline-block rounded-full border'
                style={{ width: 12, height: 12, backgroundColor: variant.value || '#ccc' }}
              />
            )}
            <span className='font-semibold capitalize'>{variant.name}:</span> {variant.value}
          </span>
        )
      })}
    </div>
  )

  return (
    <div className='w-full flex flex-col gap-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {orders.map((order: any) => {
          const items = Array.isArray(order?.items) ? order.items : []
          return (
            <div
              key={order?._id || order?.id}
              className='rounded-2xl border border-gray-200 bg-white shadow-sm p-4 space-y-4 h-full min-h-[320px] flex flex-col'
            >
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <div className='space-y-1'>
                  <p className='text-sm text-gray-500'>Order ID</p>
                  <p className='font-semibold text-gray-900'>#{order?._id || order?.id || 'N/A'}</p>
                </div>
                <div className='space-y-1 text-right'>
                  <p className='text-sm text-gray-500'>Placed On</p>
                  <p className='font-medium text-gray-900'>{order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—'}</p>
                </div>
                <Tag color={status === 'delivered' ? 'green' : status === 'processing' ? 'blue' : 'gold'}>{(order?.delivery_status || status || 'pending').toUpperCase()}</Tag>
              </div>

              <div className='space-y-3 flex-1 overflow-auto pr-1'>
                {items.map((it: any, idx: number) => {
                  const product = it?.product || {}
                  const imgArr = product?.img || []
                  const image = Array.isArray(imgArr) && imgArr[0] ? imageUrl(imgArr[0]) : 'https://via.placeholder.co/80?text=No+Image'
                  const qty = Number(it?.quantity || 1)
                  const unitPrice = Number(product?.price ?? it?.price ?? 0)
                  return (
                    <div key={`${order?._id}-item-${idx}`} className='flex items-start gap-4 rounded-xl border border-gray-100 p-3'>
                      <img src={image} alt={product?.name || 'Product'} className='w-20 h-20 rounded-lg object-cover' />
                      <div className='flex-1 space-y-1'>
                        <div className='flex flex-wrap items-center justify-between gap-2'>
                          <p className='font-medium text-gray-900'>{product?.name || 'Product'}</p>
                          <p className='text-sm text-gray-500'>Qty: <span className='font-semibold text-gray-900'>{qty}</span></p>
                        </div>
                        <p className='text-sm text-gray-600'>Unit Price: ${unitPrice.toFixed(2)}</p>
                        <p className='text-sm text-gray-900 font-semibold'>Subtotal: ${(unitPrice * qty).toFixed(2)}</p>
                        {Array.isArray(it?.variants) && it.variants.length > 0 && renderItemVariants(it.variants)}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className='flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3 text-sm'>
                <div>
                  <p className='text-gray-500'>Payment Method</p>
                  <p className='font-medium text-gray-900'>{order?.payment_method || 'N/A'}</p>
                </div>
                <div className='text-right'>
                  <p className='text-gray-500'>Total Amount</p>
                  <p className='text-lg font-semibold text-gray-900'>${Number(order?.final_amount ?? order?.total_amount ?? 0).toFixed(2)}</p>
                </div>
                {order?.transaction_id && (
                  <div>
                    <p className='text-gray-500'>Transaction ID</p>
                    <p className='font-mono text-gray-900'>{order.transaction_id}</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      {totalItems > PAGE_SIZE && (
        <div className='w-full flex justify-center'>
          <Pagination
            current={page}
            pageSize={PAGE_SIZE}
            total={totalItems}
            onChange={(p) => setPage(p)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  )
}

export default OrderTable
