import BadgesButton from '@/components/buttons/BadgesButton';
import IconButton from '@/components/buttons/IconButton';
import CartCard from '@/components/cart/CartCard';
import { useGlobalContext } from '@/providers/ContextProvider';
import { hexToRGBA4, hexToRGBA6 } from '@/utils/hexToRGBA';
import { Drawer } from 'antd';
import { ArrowBigLeft, ArrowBigRight, ShoppingCart } from 'lucide-react';
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
          data.map((item, i) => (<CartCard key={i} item={item} setOpen={setOpen} />))
        }
        <div style={{
          borderColor: hexToRGBA4(themeColor.gray)
        }} className='mt-4 border-t px-4 py-3'>
          <div className='flex items-center justify-between text-2xl'>
            <p>Total</p>
            <p>$299.95</p>
          </div>
          <div className='flex items-center justify-between text-base mt-3'>
            <div style={{
              color: themeColor.white
            }} className='flex items-center justify-start text-base gap-2'>
              <IconButton handler={() => console.log('Order Now')}
                style={{
                  backgroundColor: hexToRGBA6(themeColor.blue),
                  padding: '4px 10px',
                  borderRadius: '8px'
                }}
                icon={<ArrowBigLeft />} />
              <IconButton handler={() => console.log('Order Now')}
                style={{
                  backgroundColor: hexToRGBA6(themeColor.blue),
                  padding: '4px 10px',
                  borderRadius: '8px'
                }}
                icon={<ArrowBigRight />}
              />
            </div>
            <IconButton handler={() => console.log('Order Now')}
              style={{
                backgroundColor: hexToRGBA6(themeColor.green),
                padding: '4px 10px',
                borderRadius: '8px'
              }}
              icon={<div>
                <p style={{
                  color: themeColor.white
                }}>Checkout</p>
              </div>} />

          </div>
        </div>
      </Drawer>
    </>
  )
}

export default CartButton
