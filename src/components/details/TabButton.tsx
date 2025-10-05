import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ShopInfo from './tabContent/ShopInfo'
import Specifications from './tabContent/Specifications'
import type { IProductDetails } from "@/types/propsTypes"
const TabButton = ({data}: {data: IProductDetails}) => {
  const {description}=data
  return (
    <Tabs defaultValue="account" className="w-full my-4 mb-0 pb-10">
      <TabsList>
        <TabsTrigger value="descriptions">Descriptions</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        {/* <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
        <TabsTrigger value="shop">Shop</TabsTrigger>
      </TabsList>
      <TabsContent value="descriptions">
        <div dangerouslySetInnerHTML={{__html: description}}></div>
        </TabsContent>
      <TabsContent value="specifications">
        <Specifications data={data}/>
      </TabsContent>
      {/* <TabsContent value="reviews">View your reviews here.</TabsContent> */}
      <TabsContent value="shop">
        <ShopInfo data={data} />
      </TabsContent>
    </Tabs>
  )
}

export default TabButton
