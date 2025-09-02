import Banner from '@/components/home/Banner'
import Category from '@/components/home/Category'
import NewArrival from '@/components/home/NewArrival'
import Product from '@/components/home/Product'
import Benefit from '@/components/shared/Benefit'

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <NewArrival />
      <Benefit />
      <Product />
    </div>
  )
}

export default Home
