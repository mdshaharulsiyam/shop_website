import Products from '@/components/product/Products'
import Search from '@/components/product/Search'
import { useGlobalContext } from '@/providers/ContextProvider'
import { Filter } from 'lucide-react'

const Product = () => {
  const { themeColor } = useGlobalContext()
  return (
    <div className='container mx-auto'>
      <div className='flex justify-between items-center gap-3 mt-3'>
        <Search />
        <button
          style={{
            backgroundColor: themeColor.white,

          }}
          className='p-2 rounded-md cursor-pointer'>
          <Filter />
        </button>
      </div>
      <Products />
      {/* <div className='lg:flex lg:flex-row justify-between items-start'>
        <div className='w-full lg:w-[70%]'>

        </div>
      </div> */}
    </div>
  )
}

export default Product
