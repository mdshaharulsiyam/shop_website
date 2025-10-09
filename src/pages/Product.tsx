import Products from '@/components/product/Products'
import Search from '@/components/product/Search'
import { useGlobalContext } from '@/providers/ContextProvider'
import { Filter } from 'lucide-react'
import { Drawer, Select, Slider, Button, Space, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetCategoriesQuery } from '@/Redux/apis/categorySlice'

const Product = () => {
  const { themeColor } = useGlobalContext()
  const [searchParams] = useSearchParams()

  // drawer state
  const [open, setOpen] = useState(false)

  // filter states
  const [category, setCategory] = useState<string | undefined>(undefined)
  const [subCategory, setSubCategory] = useState<string | undefined>(undefined)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [sort, setSort] = useState<string | undefined>(undefined)

  // fetch categories + subs using unified endpoint
  const { data: topCatData } = useGetCategoriesQuery({ page: 1, limit: 100 })
  const { data: subCatData } = useGetCategoriesQuery({ page: 1, limit: 1000, parent_id: category as string | undefined })

  const topCategories = useMemo(() => topCatData?.data ?? [], [topCatData])
  const subs = useMemo(() => subCatData?.data ?? [], [subCatData])

  const categoryOptions = useMemo(
    () => topCategories?.map((c: any) => ({ label: c?.name, value: c?._id })) ?? [],
    [topCategories]
  )
  const subCategoryOptions = useMemo(
    () => subs?.map((s: any) => ({ label: s?.name, value: s?._id })) ?? [],
    [subs]
  )

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleReset = () => {
    setCategory(undefined)
    setSubCategory(undefined)
    setPriceRange([0, 100000])
    setSort(undefined)
  }

  // Initialize and reset filters from URL params (?category=...&subCategory=...)
  useEffect(() => {
    const c = searchParams.get('category') || undefined
    const s = searchParams.get('subCategory') || undefined
    // Always sync to URL params (can be undefined)
    setCategory(c)
    setSubCategory(s)
    // Reset other filters when navigation changes params
    setPriceRange([0, 100000])
    setSort(undefined)
    setOpen(false)
  }, [searchParams])

  return (
    <div className='container mx-auto'>
      <div className='flex justify-between items-center gap-3 mt-3'>
        <Search />
        <button
          onClick={handleOpen}
          style={{ backgroundColor: themeColor.white }}
          className='p-2 rounded-md cursor-pointer'>
          <Filter />
        </button>
      </div>

      {/* Filters Drawer */}
      <Drawer title="Filters" placement="right" open={open} onClose={handleClose} width={360}>
        <Space direction="vertical" size="large" className='w-full'>
          <div>
            <Typography.Text strong>Category</Typography.Text>
            <Select
              allowClear
              className='w-full mt-2'
              placeholder="Select category"
              options={categoryOptions}
              value={category}
              onChange={(v) => { setCategory(v); setSubCategory(undefined) }}
            />
          </div>

          <div>
            <Typography.Text strong>Sub Category</Typography.Text>
            <Select
              allowClear
              className='w-full mt-2'
              placeholder="Select sub category"
              options={subCategoryOptions}
              value={subCategory}
              onChange={(v) => setSubCategory(v)}
              disabled={!category}
            />
          </div>

          <div>
            <Typography.Text strong>Price Range</Typography.Text>
            <div className='mt-3'>
              <Slider
                range
                min={0}
                max={100000}
                step={10}
                value={priceRange}
                onChange={(v: any) => setPriceRange(v as [number, number])}
              />
              <div className='text-sm text-gray-600'>{priceRange?.[0]} - {priceRange?.[1]}</div>
            </div>
          </div>

          <div>
            <Typography.Text strong>Sort By</Typography.Text>
            <Select
              allowClear
              className='w-full mt-2'
              placeholder="Select sort field"
              options={[
                { label: 'Newest', value: 'createdAt' },
                { label: 'Price', value: 'price' },
                { label: 'Stock', value: 'stock' },
                { label: 'Discount', value: 'discount' },
              ]}
              value={sort}
              onChange={(v) => setSort(v)}
            />
          </div>

          <Space className='w-full justify-end'>
            <Button onClick={handleReset}>Reset</Button>
            <Button type='primary' onClick={handleClose}>Apply</Button>
          </Space>
        </Space>
      </Drawer>

      {/* Products list */}
      <Products
        sort={sort}
        category={category}
        subCategory={subCategory}
        minPrice={priceRange?.[0]}
        maxPrice={priceRange?.[1]}
      />
    </div>
  )
}

export default Product
