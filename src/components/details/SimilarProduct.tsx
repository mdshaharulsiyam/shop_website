import { useGlobalContext } from '@/providers/ContextProvider'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { useGetAllProductQuery } from '@/Redux/apis/productSlice'
import { imageUrl } from '@/Redux/baseApi'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

interface SimilarProductProps {
  subCategoryId?: string
  currentProductId?: string
}

const SimilarProduct = ({ subCategoryId, currentProductId }: SimilarProductProps) => {
  const { themeColor } = useGlobalContext()
  const navigate = useNavigate()
  
  // Fetch products by subcategory
  const { data: productsData } = useGetAllProductQuery(
    subCategoryId ? { sub_category: subCategoryId, limit: 10 } : undefined,
    { skip: !subCategoryId }
  )

  // Transform API data to display format and exclude current product
  const products = useMemo(() => {
    const list = productsData?.data || productsData?.result || []
    return list
      .filter((p: any) => p?._id !== currentProductId) // Exclude current product
      .slice(0, 10) // Limit to 10 products
      .map((p: any) => {
        const price = Number(p?.price || 0)
        const discount = Number(p?.discount || 0)
        const currentPrice = discount > 0 ? price * (1 - discount / 100) : price
        return {
          _id: p?._id,
          product_name: p?.name || 'Unknown Product',
          image_url: p?.img?.[0] ? imageUrl(p.img[0]) : 'https://via.placeholder.co/70?text=No+Image',
          current_price: currentPrice,
          original_price: price,
        }
      })
  }, [productsData, currentProductId])

  // Don't render if no products
  if (!products.length) return null
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold" style={{ color: themeColor.black }}>
          Similar Products
        </h2>
      </div>
      <Carousel className="w-full my-4">
        <CarouselContent className="">
          {
            products.map((item: any, i: any) => (
              <CarouselItem key={i} className='md:basis-1/3 lg:basis-1/4 xl:basis-1/5'>
                <div 
                  style={{
                    backgroundColor: themeColor.white,
                  }} 
                  className="flex items-center w-full p-3 rounded-2xl gap-3 cursor-pointer hover:shadow-lg transition-shadow" 
                  onClick={() => navigate(`/details/${item._id}`)}
                >
                  <img className="w-[70px] h-[70px] object-cover rounded-lg" src={item.image_url} alt={item.product_name} />
                  <div className="flex items-start justify-start flex-col mt-1">
                    <h3 className="mt-2 text-sm font-semibold line-clamp-2">{item.product_name}</h3>
                    <div className='flex justify-start items-center gap-3'>
                      <span className="text-sm font-medium">${item.current_price.toFixed(2)}</span>
                      {item.current_price < item.original_price && (
                        <span className="line-through text-sm text-gray-500">${item.original_price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))
          }
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default SimilarProduct
