import OrderCard from '@/components/order/OrderCard'
import { useGlobalContext } from '@/providers/ContextProvider'
import type { IOrder } from '@/types/dataTypes'
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
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addresses, setAddresses] = useState([
    "123 Main St, Dhaka, Bangladesh",
    "456 Other Rd, Chittagong, Bangladesh"
  ]);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [newAddress, setNewAddress] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentPhoneNumber, setPaymentPhoneNumber] = useState('');

  const userDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: phoneNumber,
    address: selectedAddress
  };

  const openPhoneModal = () => setIsPhoneModalOpen(true);
  const closePhoneModal = () => setIsPhoneModalOpen(false);

  const openAddressModal = () => setIsAddressModalOpen(true);
  const closeAddressModal = () => setIsAddressModalOpen(false);

  const handlePhoneSave = () => {
    // Add logic to save phone number to state or backend
    console.log("Saving phone number:", phoneNumber);
    closePhoneModal();
  };

  const handleAddressSave = () => {
    if (newAddress && !addresses.includes(newAddress)) {
      setAddresses([...addresses, newAddress]);
      setSelectedAddress(newAddress);
      setNewAddress('');
    }
    closeAddressModal();
  };

  const handleConfirmOrder = () => {
    console.log("Order Confirmed with details:", { transactionId, paymentPhoneNumber });
  };
  const handlerRemove = (item: any) => {
    console.log('Removing:', item);
  };

  const handleUpdateQuantity = (item: any) => {
    console.log('Updating quantity for:', item);
  };

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
      <div className='mt-8 bg-white p-6 rounded-xl shadow-lg'>
        <p className='text-3xl font-bold mb-4'>Delivery Details</p>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <p className='text-lg'><span className='font-semibold'>Name:</span> {userDetails.name}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-lg'><span className='font-semibold'>Email:</span> {userDetails.email}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-lg'><span className='font-semibold'>Phone Number:</span> {userDetails.phoneNumber || 'Not added yet'}</p>
            <button onClick={openPhoneModal} className='text-blue-500 hover:text-blue-700 transition-colors duration-200'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M21.731 2.269a2.684 2.684 0 00-3.784 0l-15 15a2.684 2.684 0 000 3.784l.266.266a2.684 2.684 0 003.784 0l15-15a2.684 2.684 0 000-3.784L21.731 2.27zM11.625 7.5L8.5 4.375 16.5 4.5l3.125 3.125L11.625 7.5zM2.875 15.375l.188.188L5.5 13.5l-2.625-2.625-.187.187zM4.375 17.5L7.5 14.375l2.625 2.625-3.125 3.125L4.375 17.5zM15 17.5l-2.625 2.625-3.125-3.125L11.875 14.375 15 17.5zM17.5 15L14.375 11.875l-2.625 2.625 3.125 3.125L17.5 15z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className='flex items-start justify-between'>
            <p className='text-lg'><span className='font-semibold'>Delivery Address:</span> {userDetails.address || 'Not added yet'}</p>
            <button onClick={openAddressModal} className='text-blue-500 hover:text-blue-700 transition-colors duration-200'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M21.731 2.269a2.684 2.684 0 00-3.784 0l-15 15a2.684 2.684 0 000 3.784l.266.266a2.684 2.684 0 003.784 0l15-15a2.684 2.684 0 000-3.784L21.731 2.27zM11.625 7.5L8.5 4.375 16.5 4.5l3.125 3.125L11.625 7.5zM2.875 15.375l.188.188L5.5 13.5l-2.625-2.625-.187.187zM4.375 17.5L7.5 14.375l2.625 2.625-3.125 3.125L4.375 17.5zM15 17.5l-2.625 2.625-3.125-3.125L11.875 14.375 15 17.5zM17.5 15L14.375 11.875l-2.625 2.625 3.125 3.125L17.5 15z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className='mt-8 bg-white p-6 rounded-xl shadow-lg'>
        <p className='text-3xl font-bold mb-4'>Delivery and Return Policy</p>
        <div className='space-y-4 text-gray-700'>
          <div>
            <p className='text-xl font-semibold'>🚚 Delivery Method:</p>
            <ul className='list-disc list-inside ml-4'>
              <li><span className='font-medium'>Within Dhaka:</span> Home delivery. Pay after receiving the product.</li>
              <li><span className='font-medium'>Outside Dhaka:</span> Home delivery is available in all districts, upazilas, and union levels across the country. Pay after receiving the product.</li>
            </ul>
          </div>
          <div>
            <p className='text-xl font-semibold'>💰 Delivery Charge:</p>
            <ul className='list-disc list-inside ml-4'>
              <li><span className='font-medium'>Within Dhaka:</span> 80/- BDT</li>
              <li><span className='font-medium'>Outside Dhaka:</span> 130/- BDT</li>
            </ul>
          </div>
          <div>
            <p className='text-xl font-semibold'>🚚 Return Policy:</p>
            <p>Please inspect and check the product in front of the delivery person. If you don't like the product or if there is any issue, please call our helpline to report the problem. Otherwise, you must video the unboxing of the product and send it to us. If there's an issue, we will exchange the product, but you will have to pay the delivery charge again to receive the new product.</p>
          </div>
        </div>
      </div>
      <div className='mt-8 bg-white p-6 rounded-xl shadow-lg'>
        <p className='text-3xl font-bold mb-4'>Confirm Order</p>
        <div className='space-y-4'>
          <p className='text-gray-700'>
            Please send the delivery charge to <span className='font-bold text-blue-600'>01566026301</span> and then insert the transaction ID and your payment phone number below to confirm your order.
          </p>
          <div>
            <label htmlFor='transactionId' className='block text-lg font-semibold mb-2'>Transaction ID</label>
            <input
              type='text'
              id='transactionId'
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder='Enter transaction ID'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div>
            <label htmlFor='paymentPhoneNumber' className='block text-lg font-semibold mb-2'>Payment Phone Number</label>
            <input
              type='text'
              id='paymentPhoneNumber'
              value={paymentPhoneNumber}
              onChange={(e) => setPaymentPhoneNumber(e.target.value)}
              placeholder='Enter your phone number'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <button
            onClick={handleConfirmOrder}
            className='w-full py-3 bg-green-600 text-white text-xl font-bold rounded-lg hover:bg-green-700 transition-colors duration-200'
          >
            Confirm Order
          </button>
        </div>
      </div>
      {isPhoneModalOpen && (
        <div className='fixed inset-0  flex items-center justify-center p-4'>
          <div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-4'>Edit Phone Number</h2>
            <input
              type='text'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='Enter phone number'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg mb-4'
            />
            <div className='flex justify-end space-x-2'>
              <button onClick={closePhoneModal} className='px-4 py-2 bg-gray-300 rounded-lg'>Cancel</button>
              <button onClick={handlePhoneSave} className='px-4 py-2 bg-blue-500 text-white rounded-lg'>Save</button>
            </div>
          </div>
        </div>
      )}

      {isAddressModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-lg'>
            <h2 className='text-2xl font-bold mb-4'>Select or Add Address</h2>
            <div className='space-y-4'>
              {addresses.map((addr, index) => (
                <div key={index}
                  onClick={() => setSelectedAddress(addr)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${selectedAddress === addr ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}
                >
                  <p className='text-lg'>{addr}</p>
                </div>
              ))}
              <div className='mt-4'>
                <p className='text-lg font-semibold mb-2'>Add a new address</p>
                <div className='flex items-center gap-2'>
                  <input
                    type='text'
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder='Enter new address'
                    className='flex-grow px-4 py-2 border border-gray-300 rounded-lg'
                  />
                  <button
                    onClick={handleAddressSave}
                    className='p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className='flex justify-end space-x-2 mt-4'>
              <button onClick={closeAddressModal} className='px-4 py-2 bg-gray-300 rounded-lg'>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout
