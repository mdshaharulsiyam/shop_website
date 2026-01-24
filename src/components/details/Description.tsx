import { useGlobalContext } from '@/providers/ContextProvider'
import { useCreateCartMutation } from '@/Redux/apis/cartApis'
import { useCreateConversationMutation } from '@/Redux/apis/messageSlice'
import type { IDetailsDescType } from '@/types/propsTypes'
import { hexToRGBA5, hexToRGBA6, hexToRGBA7 } from '@/utils/hexToRGBA'
import { createJWT } from '@/utils/jwt'
import { MessageOutlined } from '@ant-design/icons'
import { Button, Divider, InputNumber, Modal, Radio } from 'antd'
import React from 'react'
import toast from 'react-hot-toast'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import IconButton from '../buttons/IconButton'

const Description = ({ data }: IDetailsDescType) => {
  const { themeColor } = useGlobalContext()
  const navigate = useNavigate()
  const {
    name,
    sort_description,
    price,
    discount,
    stock,
    attributes,
    user
  } = data

  // Modal + variant state
  const [open, setOpen] = React.useState(false)
  const [modalMode, setModalMode] = React.useState<'cart' | 'order'>('cart')
  const [selected, setSelected] = React.useState<Record<string, string>>({})
  const [qty, setQty] = React.useState<number>(1)
  const [createCart, { isLoading: isCreating }] = useCreateCartMutation()
  const [createConversation, { isLoading: creatingConversation }] = useCreateConversationMutation()

  // Initialize defaults: pick first value of each attribute
  React.useEffect(() => {
    const initial: Record<string, string> = {}
    attributes?.forEach(attr => {
      if (Array.isArray(attr.value) && attr.value.length > 0) {
        initial[attr.name] = attr.value[0]
      }
    })
    setSelected(initial)
  }, [attributes])

  const onChangeAttr = (name: string, value: string) => {
    setSelected(prev => ({ ...prev, [name]: value }))
  }

  const openVariantModal = () => {
    setModalMode('cart')
    setOpen(true)
  }

  const openOrderModal = () => {
    setModalMode('order')
    setOpen(true)
  }

  const handleAddToCart = async () => {
    // Build payload for backend /cart/create
    const unitPrice = typeof discount === 'number' && discount > 0
      ? Number((price * (1 - discount / 100))?.toFixed(2))
      : price;
    const total = Number((unitPrice * qty)?.toFixed(2));
    const variants = Object.entries(selected).map(([name, value]) => ({ name, value }));
    const payload = {
      product_id: data._id,
      quantity: qty,
      price: unitPrice,
      total_price: total,
      variants,
    };
    // Call API: POST /cart/create (auth required)
    const promise = createCart(payload).unwrap()
    await toast.promise(promise, {
      loading: 'Adding to cart...',
      success: (res) => res?.message || 'Added to cart',
      error: (err) => err?.data?.message || 'Failed to add to cart',
    })
    setOpen(false)
  }

  const handleMessageVendor = async () => {
    if (!user?._id) {
      toast.error('Vendor information not available')
      return
    }

    try {
      await createConversation(user._id).unwrap()
      toast.success('Opening conversation...')
      navigate('/messages')
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to start conversation')
    }
  }

  const handleOrderNow = async () => {
    // Calculate unit price and total
    const unitPrice = typeof discount === 'number' && discount > 0
      ? Number((price * (1 - discount / 100))?.toFixed(2))
      : price;
    const total = Number((unitPrice * qty)?.toFixed(2));
    const variants = Object.entries(selected).map(([name, value]) => ({ name, value }));

    try {
      // Create checkout data with single product
      const checkoutData = {
        items: [{
          product_id: data._id,
          name: data.name,
          price: unitPrice,
          quantity: qty,
          total_price: total,
          variants: variants,
          img: data.img || [],
        }],
        total: total,
        ts: Date.now(),
      };

      const secret = (import.meta as any).env?.VITE_JWT_SECRET || 'cart_secret';
      const token = await createJWT(checkoutData as any, secret);
      window.location.href = `/checkout?token=${encodeURIComponent(token)}`;
    } catch (e) {
      toast.error('Unable to prepare checkout');
    }
  }

  const renderStars = () => {
    return (
      <div className="flex" >
        <FaStar style={{
          color: themeColor.yellow,
        }} size={24} />
        <span className="ml-2" style={{
          color: themeColor.gray
        }}>{50 + ""} Ratings</span>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold " style={{
        color: hexToRGBA7(themeColor.black)
      }}>{name}</h1>
      <div style={{
        color: themeColor.gray
      }} className="flex items-center justify-between mt-2 text-sm ">
        <div className="flex items-center space-x-2">
          {renderStars()}
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-medium">{stock + ""}</span>
          <span style={{
            color: stock > 0 ? themeColor.green : hexToRGBA7(themeColor.red)
          }} className={`font-semibold `}>
            {stock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
          </span>
        </div>
      </div>

      <div className="my-4">
        <div className="flex items-end space-x-2">
          <span className="text-3xl font-bold " style={{
            color: themeColor.black
          }}>৳{price?.toFixed(2)}</span>
          <span style={{
            color: themeColor.gray
          }} className="line-through text-xl">${price?.toFixed(2)}</span>
          <span className="text-xl " style={{
            color: themeColor.red
          }}>-{discount?.toString()}%</span>
        </div>
        <p className="mt-1 text-sm " style={{
          color: themeColor.gray
        }}>M.R.P.: ৳{price?.toFixed(2)}</p>
      </div>

      <div style={{
        color: themeColor.gray
      }} className="my-6">
        <p>{sort_description}</p>
        {/* <ul className="mt-4 space-y-2 text-sm">
          {Object.entries(product_details).map(([key, value]) => (
            <li key={key}>
              <span className="font-semibold capitalize">{key.replace('_', ' ')}:</span> {value}
            </li>
          ))}
        </ul> */}
      </div>

      <div className="my-6">
        <h3 className="text-lg font-semibold text-gray-800">SIZE</h3>
        <div className="flex space-x-2 mt-2">
          {attributes?.filter((attr) => attr.name === 'size')?.[0]?.value?.map((size, index) => (
            <div
              key={index}
              style={{
                backgroundColor: hexToRGBA5(themeColor.white),
                borderColor: themeColor.blue
              }}
              className="w-10 h-10 border rounded-full cursor-pointer transition-colors flex items-center justify-center"
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="my-6">
        <h3 className="text-lg font-semibold text-gray-800">COLORS</h3>
        <div className="flex space-x-2 mt-2">
          {attributes?.filter((attr) => attr.name === 'colors')?.[0]?.value?.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full border cursor-pointer"
              style={{ backgroundColor: color as any, borderColor: themeColor.blue }}
            ></div>
          ))}
        </div>
      </div>
      <div className='flex justify-start items-center gap-2 flex-wrap'>
        <IconButton handler={openVariantModal}
          style={{
            backgroundColor: hexToRGBA6(themeColor.blue),
            padding: '8px 20px',
          }}
          icon={<div>
            <p style={{
              color: themeColor.white
            }}>Add To Cart</p>
          </div>} />
        <IconButton handler={openOrderModal}
          style={{
            backgroundColor: hexToRGBA6(themeColor.green),
            padding: '8px 20px',
          }}
          icon={<div>
            <p style={{
              color: themeColor.white
            }}>Order Now</p>
          </div>} />
        {user?._id && (
          <Button
            type='default'
            icon={<MessageOutlined />}
            onClick={handleMessageVendor}
            loading={creatingConversation}
            style={{ padding: '10px 20px', height: 'auto' }}
          >
            Message Vendor
          </Button>
        )}
      </div>

      {/* Variant selection modal */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title={
          <div className="flex items-center justify-between w-full mt-3">
            <span>Select Options</span>
            <span style={{ color: themeColor.gray, fontSize: 12 }}>In stock: {stock}</span>
          </div>
        }
        okText={modalMode === 'cart' ? 'Add to Cart' : 'Proceed to Checkout'}
        onOk={modalMode === 'cart' ? handleAddToCart : handleOrderNow}
        okButtonProps={{ loading: modalMode === 'cart' ? isCreating : false }}
      >
        <div className="space-y-5">
          {/* Summary */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold">{name}</h3>
              <p className="text-xs" style={{ color: themeColor.gray }}>Configure your selection</p>
            </div>
            <div className="text-right">
              <p className="text-sm" style={{ color: themeColor.gray }}>Unit price</p>
              <p className="text-lg font-bold">৳{(typeof discount === 'number' && discount > 0 ? Number((price * (1 - discount / 100))?.toFixed(2)) : price)?.toFixed(2)}</p>
            </div>
          </div>
          <Divider style={{ margin: '8px 0' }} />

          {/* Attributes */}
          {attributes?.map((attr) => (
            <div key={attr._id} className="space-y-2">
              <h4 className="font-medium">{attr?.name?.toUpperCase()}</h4>
              {attr?.name?.toLowerCase() === 'colors' ? (
                <div className="flex items-center gap-3 flex-wrap">
                  {attr.value.map((color) => {
                    const isSelected = selected[attr.name] === color
                    return (
                      <div
                        key={color}
                        onClick={() => onChangeAttr(attr.name, color)}
                        title={color}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          backgroundColor: color as any,
                          border: `2px solid ${isSelected ? themeColor.blue : hexToRGBA5(themeColor.gray)}`,
                          boxShadow: isSelected ? `0 0 0 2px ${hexToRGBA5(themeColor.blue)}` : 'none',
                          cursor: 'pointer'
                        }}
                      />
                    )
                  })}
                </div>
              ) : (
                <Radio.Group
                  value={selected[attr.name]}
                  onChange={(e) => onChangeAttr(attr.name, e.target.value)}
                >
                  {attr.value.map((val) => (
                    <Radio.Button key={val} value={val} style={{ marginRight: 8, marginBottom: 6 }}>
                      {val}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              )}
            </div>
          ))}

          {/* Quantity and total */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium mb-2">Quantity</h4>
              <InputNumber min={1} max={stock || 99} value={qty} onChange={(v) => setQty(Number(v) || 1)} />
            </div>
            <div className="text-right">
              <p className="text-sm" style={{ color: themeColor.gray }}>Total</p>
              <p className="text-lg font-bold">
                ৳{(
                  (typeof discount === 'number' && discount > 0 ? Number((price * (1 - discount / 100))?.toFixed(2)) : price)
                  * qty
                )?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Description