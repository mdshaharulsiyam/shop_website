import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import ProductCard from '../shared/ProductCard'
import { useGetAllProductQuery } from '@/Redux/apis/productSlice'
import { imageUrl } from '@/Redux/baseApi'
import { CloudCog } from 'lucide-react'
import { Pagination } from 'antd'
type ProductsProps = {
  search?: string
  sort?: string
  category?: string
  subCategory?: string
  minPrice?: number
  maxPrice?: number
}

const Products = ({ search, sort, category, subCategory, minPrice, maxPrice }: ProductsProps) => {
  // pagination state (no filters)
  const [page, setPage] = useState(1)
  const limit = 20

  // memoize query args to avoid unnecessary re-fetches
  const queryArgs = useMemo(() => ({
    order: 'desc' as const,
    sort: sort ?? 'createdAt',
    page,
    limit,
    search: search || undefined,
    category,
    sub_category: subCategory,
    minPrice,
    maxPrice,
  }), [search, sort, page, limit, category, subCategory, minPrice, maxPrice])

  // fetch products
  const { data, isLoading, isError, isFetching } = useGetAllProductQuery(queryArgs, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  // map API to card shape with optional chaining
  const products = useMemo(() => {
    const list = data?.data ?? []
    return list?.map((p: any) => {
      const price = Number(p?.price ?? 0)
      const discount = Number(p?.discount ?? 0)
      const sale = Math.max(0, price - (price * discount) / 100)
      return {
        id: p?._id,
        image: imageUrl(p?.img?.[0] ?? ''),
        badge: discount ? { text: `${discount}% OFF`, color: 'bg-gray-500' } : undefined,
        category: p?.category?.name ?? p?.sub_category?.name ?? '',
        sizes: [],
        name: p?.name ?? '',
        originalPrice: price,
        salePrice: sale,
        colors: [],
        rating: p?.rating ?? undefined,
      }
    }) ?? []
  }, [data])

  // paging helpers
  const canNext = (products?.length ?? 0) === limit
  // Prefer server-provided totals when available
  const total = (data as any)?.pagination?.totalItems ?? (page * limit + (canNext ? 1 : 0))

  // Reset page when filters change so we don't request out-of-range pages
  useEffect(() => {
    setPage(1)
  }, [search, category, subCategory, sort, minPrice, maxPrice])

  // Scroll to top on page change for better UX
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [page])

  const variants = {
    enter: () => ({
      opacity: 0,
      y: 40,
      scale: 0.98
    }),
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: () => ({
      opacity: 0,
      x: 40,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    })
  }

  return (
    <div className="container mx-auto py-10">
      {/* Products Grid with animation */}
      <div className="relative overflow-hidden min-h-[400px]">
        {/* Loading / Error States */}
        {(isLoading || isFetching) && (
          <div className="flex items-center justify-center h-60 text-gray-500 gap-2">
            <CloudCog className="w-5 h-5 animate-spin" /> Loading products...
          </div>
        )}
        {isError && !isLoading && !isFetching && (
          <div className="flex items-center justify-center h-60 text-red-500">Failed to load products.</div>
        )}
        <AnimatePresence mode="wait" custom={0}>
          {!isLoading && !isFetching && !isError && (
            <motion.div
              custom={0}
              variants={variants as any}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {products?.map((product: any, index: number) => (
                  <ProductCard key={product?.id} product={product} index={index} isVisible={true} />
                ))}
              </div>
              {!products?.length && (
                <div className="flex items-center justify-center h-60 text-gray-500">No products found.</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ant Design Pagination */}
      <div className="flex items-center justify-center mt-8">
        <Pagination
          current={page}
          total={total}
          pageSize={limit}
          onChange={(p) => setPage(p)}
          showSizeChanger={false}
          disabled={isLoading}
        />
      </div>
    </div>
  )
}


export default Products
