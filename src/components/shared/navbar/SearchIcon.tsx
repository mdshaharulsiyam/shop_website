import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

const SearchIcon = () => {
  return (
    <div className='cursor-pointer'>
      <Button variant="ghost" size="icon" className="hidden sm:flex">
        <Search className="h-5 w-5" />
      </Button>
    </div>
  )
}

export default SearchIcon
