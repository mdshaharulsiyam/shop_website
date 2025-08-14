import Banner from '@/components/home/Banner';
import Category from '@/components/home/Category';
import NewArrival from '@/components/home/NewArrival';


export default function Home() {
  return (
    <div className='mt-6'>
      <Banner />
      <Category />
      <NewArrival />
    </div>
  );
}
