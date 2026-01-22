import { handleCardClick } from '@/handler/productCardHandler'
import { useGlobalContext } from '@/providers/ContextProvider'
import { useCreateCartMutation } from '@/Redux/apis/cartApis'
import { useGetProductDetailsQuery } from '@/Redux/apis/productSlice'
import type { IProductCard } from '@/types/propsTypes'
import { createJWT } from '@/utils/jwt'
import { Divider, InputNumber, Modal, Radio } from 'antd'
import { ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaShippingFast } from 'react-icons/fa'

const ProductCard = ({ product, index, isVisible }: IProductCard) => {
  const { themeColor } = useGlobalContext()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'cart' | 'order'>('cart')
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [qty, setQty] = useState<number>(1)

  // Fetch product details when modal opens
  const { data: detailsData, isLoading: isLoadingDetails } = useGetProductDetailsQuery(
    product.id,
    { skip: !modalOpen }
  )
  const [createCart, { isLoading: isCreating }] = useCreateCartMutation()

  const productDetails = detailsData?.data

  // Initialize defaults when product details load
  useEffect(() => {
    if (productDetails?.attributes) {
      const initial: Record<string, string> = {}
      productDetails.attributes.forEach((attr: any) => {
        if (Array.isArray(attr.value) && attr.value.length > 0) {
          initial[attr.name] = attr.value[0]
        }
      })
      setSelected(initial)
    }
  }, [productDetails])

  const onChangeAttr = (name: string, value: string) => {
    setSelected(prev => ({ ...prev, [name]: value }))
  }

  const handleCardContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalOpen) return
    const target = e.target as HTMLElement
    if (target.closest('[data-prevent-card-nav="true"]')) return
    handleCardClick(product.id?.toString())
  }

  const handleOpenCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    setModalMode('cart')
    setModalOpen(true)
  }

  const handleOpenOrder = (e: React.MouseEvent) => {
    e.stopPropagation()
    setModalMode('order')
    setModalOpen(true)
  }

  const handleAddToCart = async () => {
    if (!productDetails) return
    const unitPrice = productDetails.discount > 0
      ? Number((productDetails.price * (1 - productDetails.discount / 100)).toFixed(2))
      : productDetails.price
    const total = Number((unitPrice * qty).toFixed(2))
    const variants = Object.entries(selected).map(([name, value]) => ({ name, value }))

    const payload = {
      product_id: productDetails._id,
      quantity: qty,
      price: unitPrice,
      total_price: total,
      variants,
    }

    const promise = createCart(payload).unwrap()
    await toast.promise(promise, {
      loading: 'Adding to cart...',
      success: (res) => res?.message || 'Added to cart',
      error: (err) => err?.data?.message || 'Failed to add to cart',
    })
    setModalOpen(false)
    setQty(1)
  }

  const handleOrderNow = async () => {
    if (!productDetails) return
    const unitPrice = productDetails.discount > 0
      ? Number((productDetails.price * (1 - productDetails.discount / 100)).toFixed(2))
      : productDetails.price
    const total = Number((unitPrice * qty).toFixed(2))
    const variants = Object.entries(selected).map(([name, value]) => ({ name, value }))

    try {
      const checkoutData = {
        items: [{
          product_id: productDetails._id,
          name: productDetails.name,
          price: unitPrice,
          quantity: qty,
          total_price: total,
          variants: variants,
          img: productDetails.img || [],
          business: productDetails.business,
        }],
        total: total,
        ts: Date.now(),
      }

      const secret = (import.meta as any).env?.VITE_JWT_SECRET || 'cart_secret'
      const token = await createJWT(checkoutData as any, secret)
      window.location.href = `/checkout?token=${encodeURIComponent(token)}`
    } catch (e) {
      toast.error('Unable to prepare checkout')
    }
  }
  return (
    <div onClick={handleCardContainerClick}
      key={product.id}
      className={`bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-500 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Product Image */}
      <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-100">
        {product.badge && (
          <div
            className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium text-white z-10 ${product.badge.color}`}
          >
            {product.badge.text}
          </div>
        )}

        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full object-cover group-hover:scale-105 aspect-[0.9] transition-transform duration-300"
        />

        {/* Action Buttons */}
        <div
          data-prevent-card-nav="true"
          className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
        >
          <button
            onClick={handleOpenCart}
            data-prevent-card-nav="true"
            className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={handleOpenOrder}
            data-prevent-card-nav="true"
            className="w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer"
            title="Order Now"
          >
            <FaShippingFast className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
          {product?.sizes && (
            <div className="flex gap-1">
              {product?.sizes.map((size: any) => (
                <span key={size} className="text-xs text-gray-400">
                  {size}
                </span>
              ))}
            </div>
          )}
        </div>

        <h3 className="font-medium text-gray-900 line-clamp-2">{product.name}</h3>

        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">৳{product.salePrice?.toFixed(2)}</span>
          {product.originalPrice !== product.salePrice && (
            <span className="text-sm text-gray-400 line-through">
              ৳{product.originalPrice?.toFixed(2)}
            </span>
          )}
        </div>

        {/* Color Options */}
        <div className="flex items-center justify-between" data-prevent-card-nav="true">
          <div className="flex gap-1">
            {product?.colors.map((color: any, colorIndex: number) => (
              <button
                type="button"
                data-prevent-card-nav="true"
                key={colorIndex}
                className="w-4 h-4 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          {/* 
          <button className="text-gray-400 hover:text-blue-500 transition-colors md:opacity-0 md:group-hover:opacity-100 opacity-100">
            <ShoppingCart className="w-4 h-4" />
          </button> */}
        </div>
      </div>

      {/* Variant Selection Modal */}
      <Modal
        open={modalOpen}
        onCancel={(e) => {
          e.stopPropagation()
          setModalOpen(false)
          setQty(1)
        }}
        title={
          <div className="flex items-center justify-between w-full mt-3">
            <span>{modalMode === 'cart' ? 'Add to Cart' : 'Order Now'}</span>
            {productDetails && (
              <span style={{ color: themeColor.gray, fontSize: 12 }}>
                In stock: {productDetails.stock}
              </span>
            )}
          </div>
        }
        okText={modalMode === 'cart' ? 'Add to Cart' : 'Proceed to Checkout'}
        onOk={modalMode === 'cart' ? handleAddToCart : handleOrderNow}
        okButtonProps={{ loading: modalMode === 'cart' ? isCreating : false }}
      >
        {isLoadingDetails ? (
          <div className="flex items-center justify-center py-8">Loading...</div>
        ) : productDetails ? (
          <div className="space-y-5">
            {/* Summary */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">{productDetails.name}</h3>
                <p className="text-xs" style={{ color: themeColor.gray }}>Configure your selection</p>
              </div>
              <div className="text-right">
                <p className="text-sm" style={{ color: themeColor.gray }}>Unit price</p>
                <p className="text-lg font-bold">
                  ${(productDetails.discount > 0
                    ? Number((productDetails.price * (1 - productDetails.discount / 100)).toFixed(2))
                    : productDetails.price
                  ).toFixed(2)}
                </p>
              </div>
            </div>
            <Divider style={{ margin: '8px 0' }} />

            {/* Attributes */}
            {productDetails.attributes?.map((attr: any) => (
              <div key={attr._id} className="space-y-2">
                <h4 className="font-medium">{attr?.name?.toUpperCase()}</h4>
                {attr?.name?.toLowerCase() === 'colors' ? (
                  <div className="flex items-center gap-3 flex-wrap">
                    {attr.value.map((color: string) => {
                      const isSelected = selected[attr.name] === color
                      return (
                        <div
                          key={color}
                          onClick={(e) => {
                            e.stopPropagation()
                            onChangeAttr(attr.name, color)
                          }}
                          title={color}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            backgroundColor: color,
                            border: `2px solid ${isSelected ? themeColor.blue : '#e5e7eb'}`,
                            boxShadow: isSelected ? `0 0 0 2px rgba(59, 130, 246, 0.3)` : 'none',
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
                    {attr.value.map((val: string) => (
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
                <InputNumber
                  min={1}
                  max={productDetails.stock || 99}
                  value={qty}
                  onChange={(v) => setQty(Number(v) || 1)}
                />
              </div>
              <div className="text-right">
                <p className="text-sm" style={{ color: themeColor.gray }}>Total</p>
                <p className="text-lg font-bold">
                  ${(
                    (productDetails.discount > 0
                      ? Number((productDetails.price * (1 - productDetails.discount / 100)).toFixed(2))
                      : productDetails.price
                    ) * qty
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8 text-red-500">
            Failed to load product details
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ProductCard
