import Description from '@/components/details/Description'
import Images from '@/components/details/Images'
import SimilarProduct from '@/components/details/SimilarProduct'
import TabButton from '@/components/details/TabButton'
import { useGetProductDetailsQuery } from '@/Redux/apis/productSlice'
import { useParams } from 'react-router-dom'

const Details = () => {
  const { id } = useParams()
  const { data } = useGetProductDetailsQuery(id)
  const element = [
    <Images imageList={data?.data?.img || []} />,
    <Description data={data?.data || {}} />
  ]
  return (
    <>
      <div className='flex justify-between items-start flex-col md:flex-row p-3 gap-6 container mx-auto'>
        {
          element?.map((el, i) => (
            <div className='w-full lg:w-[calc(50%-24px)]' key={i}>
              {el}
            </div>
          ))
        }
      </div>
      <div className='container mx-auto p-3'>
        <SimilarProduct
          subCategoryId={data?.data?.sub_category?._id}
          currentProductId={data?.data?._id}
        />
      </div>
      <TabButton data={data?.data || {}} />
    </>
  )
}

export default Details
