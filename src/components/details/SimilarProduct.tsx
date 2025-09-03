import { useGlobalContext } from '@/providers/ContextProvider'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'

const data = [
  {
    "product_name": "Dates Value Pouch",
    "image_url": "https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg",
    "rating": 4,
    "current_price": 56.00,
    "original_price": 60.00
  },
  {
    "product_name": "Graps Mix Snack",
    "image_url": "https://i.ibb.co.com/wZpjDkmw/photo-1505740420928-5e560c06d30e.jpg",
    "rating": 2,
    "current_price": 28.00,
    "original_price": 35.00
  },
  {
    "product_name": "Roasted Almonds Pack",
    "image_url": "https://i.ibb.co.com/35Z016Xj/pexels-madebymath-90946.jpg",
    "rating": 4,
    "current_price": 16.00,
    "original_price": 20.00
  }
]
const SimilarProduct = () => {
  const { themeColor } = useGlobalContext()
  return (
    <div>
      <Carousel className="w-full">
        <CarouselContent className="">
          {
            data.map((item, i) => (
              <CarouselItem key={i} className='md:basis-1/3 lg:basis-1/4 xl:basis-1/5'>
                <div style={{
                  backgroundColor: themeColor.white,
                }} key={i} className="flex items-center w-full p-3 rounded-2xl gap-3">
                  <img className="w-[70px] h-[70px] object-cover rounded-lg" src={item.image_url} alt={item.product_name} />
                  <div className="flex items-start justify-start flex-col mt-1">
                    <h3 className="mt-2 text-sm font-semibold">{item.product_name}</h3>
                    <div className='flex justify-start items-center gap-3'>
                      <span className="text-sm font-medium">${item.current_price.toFixed(2)}</span>
                      <span className="line-through text-sm text-gray-500">${item.original_price.toFixed(2)}</span>
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
