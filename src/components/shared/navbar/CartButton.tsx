import BadgesButton from '@/components/buttons/BadgesButton';
import IconButton from '@/components/buttons/IconButton';
import CartCard from '@/components/cart/CartCard';
import { useGlobalContext } from '@/providers/ContextProvider';
import { useDeleteCartMutation, useGetCartQuery } from '@/Redux/apis/cartApis';
import { imageUrl } from '@/Redux/baseApi';
import { hexToRGBA4, hexToRGBA6 } from '@/utils/hexToRGBA';
import { createJWT } from '@/utils/jwt';
import { Drawer } from 'antd';
import { ArrowBigLeft, ArrowBigRight, ShoppingCart } from 'lucide-react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const CartButton = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const { width, themeColor } = useGlobalContext();
  const { data: cartRes, isFetching } = useGetCartQuery({ page, limit });
  const [deleteCart, { isLoading: isDeleting }] = useDeleteCartMutation();
  const items = useMemo(() => {
    const list = cartRes?.data || [];
    return list.map((it: any) => ({
      id: it?._id,
      product_id: it?.product_id?._id,
      name: it?.product_id?.name,
      price: it?.price, // unit price
      image: it?.product_id?.img?.[0]
        ? imageUrl(it.product_id.img[0])
        : 'https://via.placeholder.co/64?text=No+Image',
      quantity: it?.quantity,
      total_price: it?.total_price,
      variants: it?.variants || [],
      img: it?.product_id?.img || [],
    }));
  }, [cartRes]);
  const total = useMemo(() => {
    const list = cartRes?.data || [];
    return list.reduce((sum: number, it: any) => sum + Number(it?.total_price || 0), 0);
  }, [cartRes]);
  const count = cartRes?.pagination?.totalItems || items.length || 0;
  const totalPages = cartRes?.pagination?.totalPages || 1;
  const canPrev = page > 1 && !isFetching && !isDeleting;
  const canNext = page < totalPages && !isFetching && !isDeleting;
  const prevHandler = () => { if (canPrev) setPage((p) => Math.max(1, p - 1)); };
  const nextHandler = () => { if (canNext) setPage((p) => Math.min(totalPages, p + 1)); };
  return (
    <>
      <BadgesButton
        count={count}
        icon={<ShoppingCart className="h-5 w-5" />}
        handler={() => setOpen(true)}
      />
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={`Cart`}
        width={width > 768 ? 320 : 320}
        style={{ padding: 0, backgroundColor: themeColor.white }}
      >
        {items.map((item, i) => (
          <CartCard
            key={i}
            item={item}
            setOpen={setOpen}
            removeHandler={async (id: string) => {
              const promise = deleteCart(id).unwrap();
              await toast.promise(promise, {
                loading: 'Removing item...',
                success: (res) => res?.message || 'Removed from cart',
                error: (err) => err?.data?.message || 'Failed to remove',
              });
              // No manual refetch; RTK Query will refetch due to tag invalidation
            }}
          />
        ))}
        <div style={{
          borderColor: hexToRGBA4(themeColor.gray)
        }} className='mt-4 border-t px-4 py-3'>
          <div className='flex items-center justify-between text-2xl'>
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className='flex items-center justify-between text-base mt-3'>
            <div style={{
              color: themeColor.white
            }} className='flex items-center justify-start text-base gap-2'>
              <IconButton
                handler={prevHandler}
                style={{
                  backgroundColor: hexToRGBA6(themeColor.blue),
                  padding: '4px 10px',
                  borderRadius: '8px',
                  opacity: canPrev ? 1 : 0.5
                }}
                icon={<ArrowBigLeft />}
              />
              <IconButton
                handler={nextHandler}
                style={{
                  backgroundColor: hexToRGBA6(themeColor.blue),
                  padding: '4px 10px',
                  borderRadius: '8px',
                  opacity: canNext ? 1 : 0.5
                }}
                icon={<ArrowBigRight />}
              />
            </div>
            <IconButton handler={async () => {
              const raw = cartRes?.data || [];
              if (!raw.length) {
                toast.error('No products selected');
                return;
              }
              try {
                const checkoutData = {
                  items: raw.map((it: any) => ({
                    id: it?._id,
                    product_id: it?.product_id?._id,
                    name: it?.product_id?.name,
                    price: it?.price,
                    quantity: it?.quantity,
                    total_price: it?.total_price,
                    variants: it?.variants || [],
                    img: it?.product_id?.img || [],
                    business: it?.product_id?.business || null,
                  })),
                  total: total,
                  ts: Date.now(),
                };
                const secret = (import.meta as any).env?.VITE_JWT_SECRET || 'cart_secret';
                const token = await createJWT(checkoutData as any, secret);
                window.location.href = `/checkout?token=${encodeURIComponent(token)}`;
              } catch (e) {
                toast.error('Unable to prepare checkout');
              }
            }}
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
          <div className='mt-2 text-xs' style={{ color: themeColor.gray }}>
            Page {cartRes?.pagination?.currentPage || page} of {cartRes?.pagination?.totalPages || 1}
          </div>
        </div>
      </Drawer>
    </>
  )
}
export default CartButton
