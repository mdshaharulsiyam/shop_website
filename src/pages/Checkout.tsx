import OrderCard from '@/components/order/OrderCard'
import { handlerRemove, handleUpdateQuantity } from '@/handler/checkoutHandler'
import type { IOrder } from '@/types/dataTypes'
const data = [
  {
    "name": "Stylish Chair",
    "image": "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg",
    "quantity": 2,
    "price": 75.00,
    "total_price": 150.00,
    "payment_by": "Credit Card",
    "isPaid": true
  },
  {
    "name": "Modern Desk",
    "image": "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg",
    "quantity": 1,
    "price": 250.00,
    "total_price": 250.00,
    "payment_by": "PayPal",
    "isPaid": true
  },
  {
    "name": "Sleek Lamp",
    "image": "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg",
    "quantity": 3,
    "price": 45.50,
    "total_price": 136.50,
    "payment_by": "Cash",
    "isPaid": false
  },
  {
    "name": "Bookshelf",
    "image": "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg",
    "quantity": 1,
    "price": 120.00,
    "total_price": 120.00,
    "payment_by": "Credit Card",
    "isPaid": true
  }
]
const Checkout = () => {

  return (
    <div className='py-6 container mx-auto'>
      <div style={{
      }} className='w-full flex justify-start items-center gap-[1%] lg:gap-[.5%]'>
        {
          data?.map((item: IOrder, i: number) => <OrderCard key={i} item={item} type='checkout' removeHandler={handlerRemove} handler={handleUpdateQuantity} />)
        }
      </div>
    </div>
  )
}

export default Checkout
