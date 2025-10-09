import OrderCard from '@/components/order/OrderCard'
import { useGlobalContext } from '@/providers/ContextProvider'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyJWT } from '@/utils/jwt'
import { imageUrl } from '@/Redux/baseApi'
import { usePatchProfileMutation } from '@/Redux/apis/authSlice'
import { useCreateShippingAddressMutation, useGetAllShippingAddressesQuery } from '@/Redux/apis/shippingAddressApis'
import { useCreateOrderMutation } from '@/Redux/apis/orderApis'
import toast from 'react-hot-toast'
import { PlusCircle, Edit3 } from 'lucide-react'

const Checkout = () => {
  const { themeColor ,user} = useGlobalContext()
  const location = useLocation()
  const [items, setItems] = useState<Array<{ id?: string; _id?: string; name: string; image: string; quantity: number; price: number; variants?: Array<{name:string; value:string}> }>>([])
  const [decodeError, setDecodeError] = useState<string | null>(null)
const navigate = useNavigate()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    if (!token) {
      setDecodeError('No products selected')
      return
    }
    const secret = (import.meta as any).env?.VITE_JWT_SECRET || 'cart_secret'
    ;(async () => {
      try {
        const payload = await verifyJWT<any>(token, secret)
        const mapped = (payload?.items || []).map((it: any) => ({
          id: it?.id,
          _id: it?.product_id,
          name: it?.name,
          image: Array.isArray(it?.img) && it.img[0] ? imageUrl(it.img[0]) : 'https://via.placeholder.co/80?text=No+Image',
          quantity: Number(it?.quantity || 1),
          price: Number(it?.price || 0),
          variants: Array.isArray(it?.variants) ? it.variants : [],
        }))
        if (!mapped.length) setDecodeError('No products selected')
        setItems(mapped)
      } catch (e) {
        setDecodeError('Invalid or expired checkout data')
      }
    })()
  }, [location.search])
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addresses, setAddresses] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [newAddress, setNewAddress] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentPhoneNumber, setPaymentPhoneNumber] = useState('');
  const [patchProfile, { isLoading: isUpdatingPhone }] = usePatchProfileMutation();
  const { data: addrRes } = useGetAllShippingAddressesQuery();
  const [createAddress] = useCreateShippingAddressMutation();
  const [createOrder, { isLoading: isPlacingOrder }] = useCreateOrderMutation();

  useEffect(() => {
    // Initialize phone number from user if available
    if (user?.phone) setPhoneNumber(user.phone as any)
  }, [user])

  useEffect(() => {
    // Load addresses from API once
    const list = (addrRes?.result || addrRes?.data || []) as Array<{ address: string }>
    if (Array.isArray(list) && list.length) {
      const only = list.map((a) => a.address).filter(Boolean)
      setAddresses(only)
      if (!selectedAddress && only[0]) setSelectedAddress(only[0])
    }
  }, [addrRes])

  const userDetails = {
    name: user?.name || 'Unknown User',
    email: (user as any)?.email || 'Unknown',
    phoneNumber: phoneNumber,
    address: selectedAddress
  };

  const openPhoneModal = () => setIsPhoneModalOpen(true);
  const closePhoneModal = () => setIsPhoneModalOpen(false);

  const openAddressModal = () => setIsAddressModalOpen(true);
  const closeAddressModal = () => setIsAddressModalOpen(false);

  const handlePhoneSave = async () => {
    if (!phoneNumber) {
      toast.error('Please enter a phone number')
      return
    }
    try {
      await toast.promise(
        patchProfile({ phone: phoneNumber }).unwrap(),
        {
          loading: 'Updating phone...',
          success: 'Phone number updated',
          error: (err) => err?.data?.message || 'Failed to update phone',
        }
      )
      closePhoneModal();
    } catch (e) {}
  };

  const handleAddressSave = async () => {
    if (!newAddress) return;
    if (addresses.includes(newAddress)) {
      toast.error('Address already added')
      return;
    }
    // Optimistic insert
    setAddresses((prev) => [...prev, newAddress])
    setSelectedAddress(newAddress)
    setNewAddress('')
    closeAddressModal()
    try {
      const res = await createAddress({ address: newAddress }).unwrap()
      if (!res?.success) {
        // rollback
        setAddresses((prev) => prev.filter((a) => a !== newAddress))
        if (selectedAddress === newAddress) setSelectedAddress(prev => prev && prev !== newAddress ? prev : (addresses[0] || ''))
        toast.error(res?.message || 'Failed to add address')
      } else {
        toast.success(res?.message || 'Address added')
      }
    } catch (e: any) {
      // rollback immediately on failure
      setAddresses((prev) => prev.filter((a) => a !== newAddress))
      if (selectedAddress === newAddress) setSelectedAddress(addresses[0] || '')
      toast.error(e?.data?.message || 'Failed to add address')
    }
  };

  const handleConfirmOrder = async () => {
    if (!items.length) {
      toast.error('No products selected')
      return
    }
    if (!selectedAddress) {
      toast.error('Please select a delivery address')
      return
    }
    if (!transactionId || !paymentPhoneNumber) {
      toast.error('Please provide transaction ID and payment phone')
      return
    }
    const body = {
      items: items.map((x) => ({
        product: (x._id || x.id) as string,
        quantity: x.quantity,
        variants: Array.isArray(x.variants) ? x.variants : undefined,
      })),
      total_amount: total,
      final_amount: total,
      delivery_address: selectedAddress,
      transaction_id: transactionId,
      payement_phone: paymentPhoneNumber,
    }
    try {
      const promise = createOrder(body as any).unwrap()
       toast.promise(promise, {
        loading: 'Placing order...',
        success: (res) => res?.message || 'Order placed successfully',
        error: (err) => err?.data?.message || 'Failed to place order',
      })
      promise.then(()=>{
        navigate("/order")
      })
      // Optionally redirect or clear local cart state
    } catch {}
  };
  const handlerRemove = (id: string) => {
    setItems(prev => prev.filter(x => (x.id || x._id) !== id))
  }

  const handleUpdateQuantity = (id: string, qty: number) => {
    setItems(prev => prev.map(x => (x.id === id || x._id === id) ? { ...x, quantity: Math.max(1, qty) } : x))
  }

  const total = useMemo(() => items.reduce((s, it) => s + it.price * it.quantity, 0), [items])

  return (
    <div className='py-6 container mx-auto'>
      <p className='text-2xl mb-2'>Products</p>
      {decodeError && (
        <p className='mb-4 text-red-600'>{decodeError}</p>
      )}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {
          items?.map((item, i: number) => (
            <OrderCard
              key={i}
              item={item}
              type='checkout'
              removeHandler={(id) => handlerRemove(id)}
              handler={(id, count) => handleUpdateQuantity(id, count)}
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
            {!userDetails.phoneNumber && (
              <button onClick={openPhoneModal} className='text-blue-500 hover:text-blue-700 transition-colors duration-200 flex items-center gap-1'>
                <PlusCircle className='w-5 h-5' /> Add phone
              </button>
            )}
          </div>
          <div className='flex items-start justify-between'>
            <p className='text-lg'><span className='font-semibold'>Delivery Address:</span> {userDetails.address || 'Not added yet'}</p>
            <button onClick={openAddressModal} className='text-blue-500 hover:text-blue-700 transition-colors duration-200 flex items-center gap-1'>
              <Edit3 className='w-5 h-5' /> Edit
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
          <div className='flex items-center justify-between text-xl'>
            <span>Total</span>
            <span className='font-bold'>${total.toFixed(2)}</span>
          </div>
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
            disabled={isPlacingOrder}
            className={`w-full cursor-pointer py-3 text-white text-xl font-bold rounded-lg transition-colors duration-200 ${isPlacingOrder ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {isPlacingOrder ? 'Processing...' : 'Confirm Order'}
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
