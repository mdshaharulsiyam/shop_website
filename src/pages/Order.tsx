import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
const Order = () => {
  const orderStatus = ['pending', 'shipped', 'delivered', 'canceled']
  return (
    <Tabs defaultValue="account" className="w-full my-4 mb-0 pb-10">
      <TabsList>
        <TabsTrigger value="descriptions">Descriptions</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        {/* <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
        <TabsTrigger value="shop">Shop</TabsTrigger>
      </TabsList>
      <TabsContent value="descriptions">Make changes to your account here.</TabsContent>
      <TabsContent value="specifications">
      </TabsContent>
      {/* <TabsContent value="reviews">View your reviews here.</TabsContent> */}
      <TabsContent value="shop">
      </TabsContent>
    </Tabs>
  )
}

export default Order
