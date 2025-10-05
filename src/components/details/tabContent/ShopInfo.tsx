import { useGlobalContext } from '@/providers/ContextProvider';
import type { IProductDetails } from '@/types/propsTypes';
import { hexToRGBA7 } from '@/utils/hexToRGBA';

const ShopInfo = ({data}: {data: IProductDetails}) => {
  const { themeColor } = useGlobalContext();
  const {user,business}=data
  return (
    <div style={{
      background: themeColor.white,
      color: hexToRGBA7(themeColor.black),
    }}
      className='rounded-2xl p-3'
    >
      <div style={{
        backgroundColor: themeColor.white,
      }} className="flex items-center w-fit gap-3">
        <img className="w-[70px] h-[70px] object-cover rounded-lg" src='https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg' />
        <div className="flex items-start justify-start flex-col mt-1">
          <h3 className="mt-2 text-sm font-semibold">Name : {user?.name}</h3>
        {
          business && (
            <>
            <p className="text-sm font-medium">Products : 254</p>
            <p className="text-sm font-medium">Sales : 124</p>
            </>
          )
        }
        </div>
      </div>
      <ul className="flex items-start justify-start flex-col mt-3 list-disc pl-4 space-y-1">
        <li className=" font-medium">phone : {user?.phone}</li>
        <li className=" font-medium">Email : {user?.email}</li>
        <li className=" font-medium">Address : {business ? 'Business' : 'Mall Product'}</li>
        {business && <li className=" font-medium">Member since : Jan 1, 2020</li>}
      </ul>
      <p className='mt-3  text-lg'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      </p>
    </div>
  )
}

export default ShopInfo
