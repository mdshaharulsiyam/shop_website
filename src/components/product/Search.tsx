import { useGlobalContext } from '@/providers/ContextProvider'
import { Input } from '../ui/input'

interface SearchProps {
  value: string
  onChange: (value: string) => void
}

const Search = ({ value, onChange }: SearchProps) => {
  const { themeColor } = useGlobalContext()
  return (
    <Input 
      className='py-5 w-full' 
      style={{
        backgroundColor: themeColor.white,
      }} 
      type="text" 
      placeholder="Search products..." 
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default Search
