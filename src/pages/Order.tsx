import OrderTable from '@/components/order/OrderTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'


const Order = () => {
  const orderStatus = ['pending', 'shipped', 'delivered', 'canceled']
  return (
    <Tabs defaultValue={orderStatus[0]} className="w-full my-4 mb-0 pb-10">
      <TabsList>
        {
          orderStatus?.map((item: string) => <TabsTrigger className='capitalize' key={item} value={item}>{item}</TabsTrigger>)
        }
      </TabsList>
      {
        orderStatus?.map((item: string) => <TabsContent key={item} value={item}>
          <OrderTable status={item} />
        </TabsContent>)
      }

    </Tabs>
  )
}

export default Order
