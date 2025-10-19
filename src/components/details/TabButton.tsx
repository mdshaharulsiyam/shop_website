import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ShopInfo from './tabContent/ShopInfo'
import Specifications from './tabContent/Specifications'
import Reviews from './tabContent/Reviews'
import type { IProductDetails } from "@/types/propsTypes"
const TabButton = ({data}: {data: IProductDetails}) => {
  const {description, _id}=data
  return (
    <Tabs defaultValue="account" className="w-full my-4 mb-0 pb-10">
      <TabsList>
        <TabsTrigger value="descriptions">Descriptions</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="shop">Shop</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="descriptions">
        <div dangerouslySetInnerHTML={{__html: description}}></div>
        </TabsContent>
      <TabsContent value="specifications">
        <Specifications data={data}/>
      </TabsContent>
      <TabsContent value="shop">
        <ShopInfo data={data} />
      </TabsContent>
      <TabsContent value="reviews">
        <Reviews productId={_id} />
      </TabsContent>
    </Tabs>
  )
}

export default TabButton
