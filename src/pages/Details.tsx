import Description from '@/components/details/Description'
import Images from '@/components/details/Images'

const Details = () => {
  const element = [
    <Images />,
    <Description />
  ]
  return (
    <div className='flex justify-between items-start flex-col md:flex-row p-3 gap-6'>
      {
        element?.map((el, i) => (
          <div className='w-full lg:w-[calc(50%-24px)]' key={i}>
            {el}
          </div>
        ))
      }
    </div>
  )
}

export default Details
