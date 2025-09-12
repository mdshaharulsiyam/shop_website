import type { IOrder } from '@/types/dataTypes'
import type { IOrderTable } from '@/types/propsTypes'
import OrderCard from './OrderCard'
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
const OrderTable = ({ status }: IOrderTable) => {
  console.log(status)
  return (
    <div className='w-full flex justify-start items-center flex-col md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1%] lg:gap-[.5%]'>
      {
        data?.map((item: IOrder, i: number) => <OrderCard key={i} item={item} />)
      }
    </div>
  )
}

export default OrderTable
