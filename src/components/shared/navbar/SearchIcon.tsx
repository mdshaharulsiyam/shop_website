import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { useGlobalContext } from '@/providers/ContextProvider'
import { PopoverContent } from '@radix-ui/react-popover'
import { Search } from 'lucide-react'

const SearchIcon = () => {
  const { themeColor } = useGlobalContext();
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost" size="icon" className="hidden sm:flex cursor-pointer">
          <Search className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent style={{
        backgroundColor: themeColor.white,
      }} className='flex justify-between items-center p-2 rounded-md gap-2'>
        <Input style={{
          backgroundColor: themeColor.white,
        }} type="text" placeholder="Search..." required />
        <Button variant="ghost" size="icon" className="hidden sm:flex cursor-pointer">
          <Search className="h-5 w-5" />
        </Button>
      </PopoverContent>
    </Popover>

  )
}

export default SearchIcon
