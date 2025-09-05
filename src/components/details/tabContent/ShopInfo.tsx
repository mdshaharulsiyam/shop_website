import { useGlobalContext } from '@/providers/ContextProvider';

const ShopInfo = () => {
  const { themeColor } = useGlobalContext();
  return (
    <div style={{
      background: themeColor.white
    }}
      className='rounded-2xl'
    >
      <div style={{
        backgroundColor: themeColor.white,
      }} className="flex items-center w-fit p-3 rounded-2xl gap-3">
        <img className="w-[70px] h-[70px] object-cover rounded-lg" src='https://i.ibb.co.com/LD07JNgc/Product-Showcase-1.jpg' />
        <div className="flex items-start justify-start flex-col mt-1">
          <h3 className="mt-2 text-sm font-semibold">Products : 524</h3>
          <p className="text-sm font-medium">Sales : 124</p>
        </div>
      </div>
    </div>
  )
}

export default ShopInfo
