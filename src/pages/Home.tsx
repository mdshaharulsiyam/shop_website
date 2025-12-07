import Banner from '@/components/home/Banner'
import Category from '@/components/home/Category'
import NewArrival from '@/components/home/NewArrival'
import Product from '@/components/home/Product'
import Benefit from '@/components/shared/Benefit'
import SEO from '@/components/SEO'

const Home = () => {
  return (
    <>
      <SEO 
        title="Welcome to Our Online Store | Shop the Latest Trends"
        description="Discover amazing products at great prices. Shop the latest trends in fashion, electronics, home goods, and more. Fast shipping and easy returns."
        keywords="online shopping, ecommerce, buy online, fashion, electronics, home goods, deals, discounts"
      />
      <div className='container mx-auto'>
        <Banner />
        <Category />
        <NewArrival />
        <Benefit />
        <Product />
      </div>
    </>
  )
}

export default Home
