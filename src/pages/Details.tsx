import Description from '@/components/details/Description'
import Images from '@/components/details/Images'
import SimilarProduct from '@/components/details/SimilarProduct'
import TabButton from '@/components/details/TabButton'
export const dummyData = {
  "product_name": "Mantu Women's Solid Slim Fit Classic Round Neck Cotton Fabric T-Shirt.",
  "sku": 562,
  "in_stock": true,
  "images": [
    "grey_tshirt.jpg",
    "blue_tshirt.jpg",
    "navy_blue_tshirt.jpg",
    "black_tshirt.jpg"
  ],
  "current_price": 664.00,
  "discount_percentage": 78,
  "original_price": 2999.00,
  "ratings": {
    "average_rating": 4,
    "number_of_ratings": 992
  },
  "real_time_visitors": 56,
  "sale_timer": {
    "days": 392,
    "hours": 20,
    "minutes": 22,
    "seconds": 37
  },
  "product_description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been been the industry's standard dummy text ever since the 1990.",
  "product_details": {
    "closure": "Hook & Loop",
    "sole": "Polyvinyl Chloride",
    "width": "Medium",
    "outer_material": "A-Grade Standard Quality"
  },
  "available_sizes": [
    "S",
    "M",
    "L",
    "XL"
  ],
  "available_colors": [
    "#A8C5D6",
    "#3477B7",
    "#8BBA5F",
    "#996633"
  ]
}
const Details = () => {
  const element = [
    <Images />,
    <Description data={dummyData} />
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
      <SimilarProduct />
      <TabButton />
    </>
  )
}

export default Details
