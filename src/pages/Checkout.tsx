import IconButton from '@/components/buttons/IconButton'
import OrderCard from '@/components/order/OrderCard'
import { handlerRemove, handleUpdateQuantity } from '@/handler/checkoutHandler'
import { useGlobalContext } from '@/providers/ContextProvider'
import type { IOrder } from '@/types/dataTypes'
import { hexToRGBA6 } from '@/utils/hexToRGBA'
import { Input, Modal, Select } from 'antd'
import { MapPin, Phone } from 'lucide-react'
import { useState } from 'react'

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
  const { themeColor } = useGlobalContext()
  const [phone, setPhone] = useState("")
  const [addresses, setAddresses] = useState<string[]>([])
  const [selectedAddress, setSelectedAddress] = useState<string>("")
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [newAddress, setNewAddress] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [confirmPhone, setConfirmPhone] = useState("")

  return (
    <div className='py-6 container mx-auto'>
      <p className='text-2xl mb-2'>Products</p>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {
          data?.map((item: IOrder, i: number) => (
            <OrderCard
              key={i}
              item={item}
              type='checkout'
              removeHandler={handlerRemove}
              handler={handleUpdateQuantity}
            />
          ))
        }
      </div>


      {/* User details */}
      <div
        style={{
          backgroundColor: themeColor.white
        }}
        className='mt-6 p-4 rounded-md'>
        <p className='text-xl mb-2'>Your Details</p>
        <div className='space-y-2'>
          <p><strong>Name:</strong> Guest User</p>
          <p><strong>Email:</strong> guest@example.com</p>
          <p className='flex items-center gap-2'>
            <strong>Phone:</strong> {phone || "Not added"}
            <Phone className='w-4 h-4 cursor-pointer' onClick={() => setShowPhoneModal(true)} />
          </p>
          <p className='flex items-center gap-2'>
            <strong>Address:</strong> {selectedAddress || "Not added"}
            <MapPin className='w-4 h-4 cursor-pointer' onClick={() => setShowAddressModal(true)} />
          </p>
        </div>
      </div>

      <div
        style={{
          backgroundColor: themeColor.white
        }}
        className='mt-8 p-4 rounded-md '>
        <h2 className='text-xl font-semibold mb-2'>Delivery and Return Policy</h2>
        <p>🚚 <strong>Delivery Method</strong></p>
        <ul className='list-disc pl-6'>
          <li><strong>Inside Dhaka:</strong> Home delivery. Pay after receiving the product.</li>
          <li><strong>Outside Dhaka:</strong> Home delivery available across all districts, sub-districts, and unions. Pay after receiving the product.</li>
        </ul>
        <p className='mt-2'>💰 <strong>Delivery Charge</strong></p>
        <ul className='list-disc pl-6'>
          <li>Inside Dhaka: 80 BDT</li>
          <li>Outside Dhaka: 130 BDT</li>
        </ul>
        <p className='mt-2'>🚚 <strong>Return Policy</strong></p>
        <p>
          Please check the product in front of the delivery person. If you don’t like the product or find any issue,
          call our helpline immediately. Otherwise, you must record an unboxing video and send it to us.
          If there’s a problem, we will exchange the product, but you must pay the delivery charge again.
        </p>
      </div>

      {/* Confirm Order */}
      <div
        style={{
          backgroundColor: themeColor.white
        }}
        className='mt-8 p-4  rounded-md'>
        <h2 className='text-xl font-semibold mb-2'>Confirm Your Order</h2>
        <p className='mb-2'>Send the delivery charge to <strong>01566026301</strong>. Then enter the transaction ID and your phone number below:</p>
        <Input
          placeholder='Transaction ID'
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className=' '
        />
        <p className='mb-4'></p>
        <Input
          placeholder='Phone Number'
          value={confirmPhone}
          onChange={(e) => setConfirmPhone(e.target.value)}
          className='mb-2'
        />
        <IconButton handler={() => console.log('Order Now')}
          style={{
            backgroundColor: hexToRGBA6(themeColor.green),
            padding: '4px 10px',
            marginTop: 10
          }}
          icon={<button >
            <p style={{
              color: themeColor.white
            }}>Confirm Order</p>
          </button>} />
      </div>

      {/* Phone Modal */}
      <Modal
        title="Edit Phone Number"
        open={showPhoneModal}
        onCancel={() => setShowPhoneModal(false)}
        onOk={() => setShowPhoneModal(false)}
      >
        <Input
          placeholder='Enter phone number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Modal>

      {/* Address Modal */}
      <Modal
        title="Manage Delivery Address"
        open={showAddressModal}
        onCancel={() => setShowAddressModal(false)}
        onOk={() => {
          if (newAddress) {
            setAddresses([...addresses, newAddress])
            setSelectedAddress(newAddress)
            setNewAddress("")
          }
          setShowAddressModal(false)
        }}
      >
        <Input
          placeholder='Add new address'
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          className='mb-3'
        />
        {addresses.length > 0 && (
          <Select
            className='w-full'
            placeholder='Select address'
            value={selectedAddress || undefined}
            onChange={(val) => setSelectedAddress(val)}
          >
            {addresses.map((addr, idx) => (
              <Select.Option key={idx} value={addr}>
                {addr}
              </Select.Option>
            ))}
          </Select>
        )}
      </Modal>
    </div>
  )
}

export default Checkout
