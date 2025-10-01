
import { useGlobalContext } from '@/providers/ContextProvider'
import { hexToRGBA7 } from '@/utils/hexToRGBA'
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import PaginationDots from '../paginations_dots/PaginationDots'
import ProductCard from '../shared/ProductCard'
import { useGetAllProductQuery } from '@/Redux/apis/productSlice'
import { imageUrl } from '@/Redux/baseApi'
import { CloudCog } from 'lucide-react'

const NewArrival = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0) // 🔹 track slide direction
  const { themeColor } = useGlobalContext()
  const { data, isLoading, isError } = useGetAllProductQuery({ order: "desc", sort: "createdAt", page: 1, limit: 10 })

  // Map API data to ProductCard shape (with optional chaining and safe defaults)
  const mappedProducts = useMemo(() => {
    const list = data?.data ?? []
    return list?.map((p: any) => {
      const price = Number(p?.price ?? 0)
      const discount = Number(p?.discount ?? 0)
      const sale = Math.max(0, price - (price * discount) / 100)
      return {
        id: p?._id,
        image: imageUrl(p?.img?.[0] ?? ""),
        badge: discount ? { text: `${discount}% OFF`, color: "bg-gray-500" } : undefined,
        category: p?.category?.name ?? p?.sub_category?.name ?? "",
        sizes: [], 
        name: p?.name ?? "",
        originalPrice: price,
        salePrice: sale,
        colors: [],
        rating: p?.rating ?? undefined,
      }
    }) ?? []
  }, [data])

  // Determine columns by viewport (2 / 3 / 4)
  const [cols, setCols] = useState(2)
  useEffect(() => {
    const computeCols = () => {
      const w = typeof window !== 'undefined' ? window?.innerWidth ?? 0 : 0
      // 4 cols only on wide screens (1280px, Tailwind xl)
      if (w >= 1280) setCols(4)
      else if (w >= 768) setCols(3) // md
      else if (w >= 640) setCols(2) // sm
      else setCols(1)
    }
    computeCols()
    window?.addEventListener('resize', computeCols)
    return () => window?.removeEventListener('resize', computeCols)
  }, [])

  // Chunk products into slides matching current column count
  const productSets = useMemo(() => {
    const chunkSize = Math.max(1, cols)
    const chunks: any[] = []
    for (let i = 0; i < (mappedProducts?.length ?? 0); i += chunkSize) {
      chunks.push(mappedProducts.slice(i, i + chunkSize))
    }
    return chunks
  }, [mappedProducts, cols])

  const currentProducts = productSets?.[currentSlide] ?? []

  // Ensure currentSlide is within bounds when productSets change
  useEffect(() => {
    if ((productSets?.length ?? 0) === 0) {
      setCurrentSlide(0)
      return
    }
    if (currentSlide > productSets.length - 1) {
      setCurrentSlide(0)
    }
  }, [productSets?.length])

  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 40 : -40,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? 40 : -40,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    })
  }

  return (
    <div className="container mx-auto">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2
            style={{
              color: hexToRGBA7(themeColor.black)
            }}
            className="text-2xl font-bold">New Arrivals</h2>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {productSets?.length > 0 && (
              <PaginationDots
                setCurrentSlide={setCurrentSlide}
                currentSlide={currentSlide}
                slideNumber={productSets?.length}
                setDirection={setDirection}
              />
            )}
          </div>
        </div>

        {/* Products Grid with animation */}
        <div className="relative overflow-hidden min-h-[400px]">
          {/* Loading / Error States */}
          {isLoading && (
            <div className="flex items-center justify-center h-60 text-gray-500 gap-2">
              <CloudCog className="w-5 h-5 animate-spin" /> Loading new arrivals...
            </div>
          )}
          {isError && !isLoading && (
            <div className="flex items-center justify-center h-60 text-red-500">Failed to load products.</div>
          )}
          <AnimatePresence mode="wait" custom={direction}>
            {!isLoading && !isError && (
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={variants as any}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts?.map((product: any, index: number) => (
                    <ProductCard key={product?.id} product={product} index={index} isVisible={true} />
                  ))}
                </div>
                {!currentProducts?.length && (
                  <div className="flex items-center justify-center h-60 text-gray-500">No products found.</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default NewArrival
