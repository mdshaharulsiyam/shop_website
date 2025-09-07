import { useGlobalContext } from '@/providers/ContextProvider'
import { Input } from '../ui/input'

const Search = () => {
  const { themeColor } = useGlobalContext()
  return <Input className='mt-2 py-5 w-full' style={{
    backgroundColor: themeColor.white,
  }} type="text" placeholder="Search..." required />
}

export default Search
