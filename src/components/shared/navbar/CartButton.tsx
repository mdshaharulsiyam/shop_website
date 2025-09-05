import BadgesButton from '@/components/buttons/BadgesButton';
import CartCard from '@/components/cart/CartCard';
import { useGlobalContext } from '@/providers/ContextProvider';
import { Drawer } from 'antd';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
const data = [
  {
    "name": "Wireless Headphones",
    "price": 59.99,
    "image": "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg"
  },
  {
    "name": "Smartwatch Pro",
    "price": 129.99,
    "image": "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg"
  },
  {
    "name": "Bluetooth Speaker",
    "price": 39.99,
    "image": "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg"
  },
  {
    "name": "Gaming Mouse",
    "price": 24.99,
    "image": "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg"
  },
  {
    "name": "Mechanical Keyboard",
    "price": 79.99,
    "image": "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg"
  }
]

const CartButton = () => {
  const [open, setOpen] = useState(false);
  const { width, themeColor } = useGlobalContext();
  return (
    <>
      <BadgesButton
        count={3}
        icon={<ShoppingCart className="h-5 w-5" />}
        handler={() => setOpen(true)}
      />
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Cart"
        width={width > 768 ? 320 : 320}
        style={{ padding: 0, backgroundColor: themeColor.white }}
      >
        {
          data.map((item, i) => (<CartCard key={i} item={item} />))
        }
      </Drawer>
    </>
  )
}

export default CartButton
