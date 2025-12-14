import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useGlobalContext } from '@/providers/ContextProvider'
import { Search } from 'lucide-react'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const SearchIcon = () => {
  const { themeColor } = useGlobalContext()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  useEffect(() => {
    const existing = searchParams.get('search') ?? ''
    setValue(existing)
  }, [searchParams])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) {
      return
    }
    const params = new URLSearchParams(window.location.search)
    params.set('search', trimmed)
    navigate(`/products?${params.toString()}`)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="hidden sm:flex cursor-pointer" aria-label="Search products">
          <Search className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={8}
        style={{
          backgroundColor: themeColor.white,
        }}
        className='w-80'
      >
        <form onSubmit={handleSubmit} className='flex justify-between items-center gap-2'>
          <Input
            autoFocus
            value={value}
            onChange={(event) => setValue(event.target.value)}
            type="text"
            placeholder="Search products..."
            style={{
              backgroundColor: themeColor.white,
            }}
          />
          <Button
            type="submit"
            variant="default"
            size="icon"
            className="cursor-pointer"
            disabled={!value.trim()}
            aria-label="Submit search"
          >
            <Search className="h-5 w-5" />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default SearchIcon
