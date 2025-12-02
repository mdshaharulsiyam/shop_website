import { useGlobalContext } from "@/providers/ContextProvider"
import type { IProductDetails } from "@/types/propsTypes"
import { hexToRGBA5 } from "@/utils/hexToRGBA"

const Specifications = ({ data }: { data: IProductDetails }) => {
  const { attributes } = data
  const { themeColor } = useGlobalContext()

  return (
    <ul className="mt-4 space-y-2 text-sm">
      {
        attributes?.map((attr) => (
          <div className="my-6">
            <h3 className="text-lg font-semibold text-gray-800">{attr?.name}</h3>
            <div className="flex space-x-2 mt-2">
              {attr?.value?.map((value, index) => (
                attr?.name === 'colors' ? <div
                  key={index}
                  className="w-8 h-8 rounded-full border cursor-pointer"
                  style={{ backgroundColor: value as any, borderColor: themeColor.blue }}
                ></div> : <div
                  key={index}
                  style={{
                    backgroundColor: hexToRGBA5(themeColor.white),
                    borderColor: themeColor.blue
                  }}
                  className="w-10 h-10 border rounded-full cursor-pointer transition-colors flex items-center justify-center"
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        ))
      }

    </ul>
  )
}

export default Specifications
