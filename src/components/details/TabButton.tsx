import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ShopInfo from './tabContent/ShopInfo'
import Specifications from './tabContent/Specifications'
const TabButton = () => {
  return (
    <Tabs defaultValue="account" className="w-full my-4 mb-0 pb-4">
      <TabsList>
        <TabsTrigger value="descriptions">Descriptions</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        {/* <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
        <TabsTrigger value="shop">Shop</TabsTrigger>
      </TabsList>
      <TabsContent value="descriptions">Make changes to your account here.</TabsContent>
      <TabsContent value="specifications">
        <Specifications />
      </TabsContent>
      {/* <TabsContent value="reviews">View your reviews here.</TabsContent> */}
      <TabsContent value="shop">
        <ShopInfo />
      </TabsContent>
    </Tabs>
  )
}

export default TabButton
