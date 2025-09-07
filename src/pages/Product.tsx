import Search from '@/components/product/Search'
import { Filter } from 'lucide-react'

const Product = () => {
  return (
    <div className=''>
      <div className='flex justify-between items-center gap-3'>
        <Search />
        <Filter />
      </div>
      {/* <div className='lg:flex lg:flex-row justify-between items-start'>
        <div className='w-full lg:w-[70%]'>

        </div>
      </div> */}
    </div>
  )
}

export default Product
