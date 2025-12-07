import Description from '@/components/details/Description'
import Images from '@/components/details/Images'
import SimilarProduct from '@/components/details/SimilarProduct'
import TabButton from '@/components/details/TabButton'
import { useGetProductDetailsQuery } from '@/Redux/apis/productSlice'
import { useParams } from 'react-router-dom'
import SEO from '@/components/SEO'
import { useEffect, useState } from 'react'

const Details = () => {
  const { id } = useParams()
  const { data } = useGetProductDetailsQuery(id)
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    if (data?.data) {
      setProduct(data.data)
    }
  }, [data])
  const element = [
    <Images imageList={data?.data?.img || []} />,
    <Description data={data?.data || {}} />
  ]
  return (
    <>
      <SEO 
        title={`${product?.name || 'Product Details'} | ${product?.category?.name || ''} ${product?.sub_category?.name ? ' - ' + product.sub_category.name : ''}`}
        description={product?.description || `View details for ${product?.name || 'this product'}. ${product?.short_description || ''}`}
        keywords={`${product?.name || ''}, ${product?.category?.name || ''}, ${product?.sub_category?.name || ''}, buy ${product?.name || 'product'}, ${product?.category?.name || ''} for sale`}
        image={product?.img?.[0]}
      />
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
