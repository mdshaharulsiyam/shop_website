import OrderTable from '@/components/order/OrderTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGlobalContext } from '@/providers/ContextProvider'
import { useMemo, useState } from 'react'

const Order = () => {
  const orderStatus = ['pending', 'shipped', 'delivered', 'canceled']
  const { user } = useGlobalContext()
  const isVendor = useMemo(() => String(user?.role).toUpperCase() === 'VENDOR', [user?.role])
  const [showMyOrders, setShowMyOrders] = useState(!isVendor)

  return (
    <div className='container mx-auto my-4 mb-0 pb-10 space-y-4'>
      {isVendor && (
        <div className='flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm'>
          <div>
            <p className='text-lg font-semibold text-gray-900'>Viewing {showMyOrders ? 'Personal Purchases' : 'Shop Orders'}</p>
            <p className='text-sm text-gray-600'>
              {showMyOrders
                ? 'Showing orders you placed as a customer.'
                : 'Showing orders customers placed for your business.'}
            </p>
          </div>
          <button
            onClick={() => setShowMyOrders((prev) => !prev)}
            className='rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50'
          >
            Switch to {showMyOrders ? 'Shop Orders' : 'My Orders'}
          </button>
        </div>
      )}
      <Tabs defaultValue={orderStatus[0]} className="w-full">
        <TabsList>
          {
            orderStatus?.map((item: string) => <TabsTrigger className='capitalize' key={item} value={item}>{item}</TabsTrigger>)
          }
        </TabsList>
        {
          orderStatus?.map((item: string) => <TabsContent key={item} value={item}>
            <OrderTable status={item} myOrder={showMyOrders} />
          </TabsContent>)
        }

      </Tabs>
    </div>
  )
}

export default Order
