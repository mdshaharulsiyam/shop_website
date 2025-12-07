import Products from '@/components/product/Products';
import Search from '@/components/product/Search';
import { useGlobalContext } from '@/providers/ContextProvider';
import { useGetCategoriesQuery } from '@/Redux/apis/categorySlice';
import { Button, Drawer, Select, Slider, Space, Typography } from 'antd';
import { Filter } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '@/components/SEO';

const Product = () => {
  const { themeColor } = useGlobalContext();
  const [searchParams] = useSearchParams();

  // drawer state
  const [open, setOpen] = useState(false);

  // filter states
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [subCategory, setSubCategory] = useState<string | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sort, setSort] = useState<string | undefined>(undefined);

  // fetch categories + subs using unified endpoint
  const { data: topCatData } = useGetCategoriesQuery({ page: 1, limit: 100 });
  const { data: subCatData } = useGetCategoriesQuery({ 
    page: 1, 
    limit: 1000, 
    parent_id: category as string | undefined 
  });

  const topCategories = useMemo(() => topCatData?.data ?? [], [topCatData]);
  const subs = useMemo(() => subCatData?.data ?? [], [subCatData]);

  const categoryOptions = useMemo(
    () => topCategories?.map((c: any) => ({ label: c?.name, value: c?._id })) ?? [],
    [topCategories]
  );
  
  const subCategoryOptions = useMemo(
    () => subs?.map((s: any) => ({ label: s?.name, value: s?._id })) ?? [],
    [subs]
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleReset = () => {
    setSearch('');
    setCategory(undefined);
    setSubCategory(undefined);
    setPriceRange([0, 100000]);
    setSort(undefined);
  };

  // Debounce search input to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Initialize and reset filters from URL params (?category=...&subCategory=...)
  useEffect(() => {
    const c = searchParams.get('category') || undefined;
    const s = searchParams.get('subCategory') || undefined;
    setCategory(c);
    setSubCategory(s);
    setPriceRange([0, 100000]);
    setSort(undefined);
    setOpen(false);
  }, [searchParams]);

  // Get category and subcategory names for SEO
  const categoryName = useMemo(() => {
    if (!category) return '';
    const cat = topCategories.find((c: any) => c._id === category);
    return cat?.name || '';
  }, [category, topCategories]);

  const subCategoryName = useMemo(() => {
    if (!subCategory) return '';
    const sub = subs.find((s: any) => s._id === subCategory);
    return sub?.name || '';
  }, [subCategory, subs]);

  return (
    <>
      <SEO 
        title={`${categoryName || 'All Products'}${subCategoryName ? ` - ${subCategoryName}` : ''} | Shop Now`}
        description={`Browse our ${categoryName ? categoryName + ' collection' : 'products'}${subCategoryName ? ` in ${subCategoryName}` : ''}. Discover great deals and shop the latest trends with fast shipping and easy returns.`}
        keywords={`${categoryName || ''}, ${subCategoryName || ''}, products, shop, buy online, ecommerce, deals, offers, ${categoryName || ''} collection`}
      />
      
      <div className='container mx-auto px-4 py-6'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 mb-6'>
          <div className='w-full md:w-1/2 lg:w-1/3'>
            <Search value={search} onChange={setSearch} />
          </div>
          <button
            onClick={handleOpen}
            style={{ backgroundColor: themeColor?.white || '#ffffff' }}
            className='p-2 rounded-md cursor-pointer border border-gray-200 hover:bg-gray-50 transition-colors'
          >
            <Filter className='w-5 h-5' />
          </button>
        </div>

        {/* Filters Drawer */}
        <Drawer 
          title="Filter Products" 
          placement="right" 
          open={open} 
          onClose={handleClose} 
          width={360}
          footer={
            <div className='flex justify-end gap-3'>
              <Button onClick={handleReset}>Reset Filters</Button>
              <Button type='primary' onClick={handleClose}>
                Apply Filters
              </Button>
            </div>
          }
        >
          <Space direction="vertical" size="large" className='w-full'>
            <div>
              <Typography.Text strong>Category</Typography.Text>
              <Select
                allowClear
                className='w-full mt-2'
                placeholder="Select category"
                options={categoryOptions}
                value={category}
                onChange={(v) => { 
                  setCategory(v);
                  setSubCategory(undefined);
                }}
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
                onChange={setSubCategory}
                disabled={!category}
              />
            </div>

            <div>
              <Typography.Text strong>Price Range</Typography.Text>
              <div className='mt-3 px-2'>
                <Slider
                  range
                  min={0}
                  max={100000}
                  value={priceRange}
                  onChange={(value) => setPriceRange(value as [number, number])}
                />
                <div className='flex justify-between text-sm text-gray-500 mt-2'>
                  <span>${priceRange[0].toLocaleString()}</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <Typography.Text strong>Sort By</Typography.Text>
              <Select
                className='w-full mt-2'
                placeholder="Select sort field"
                options={[
                  { label: 'Newest', value: 'createdAt' },
                  { label: 'Price: Low to High', value: 'price_asc' },
                  { label: 'Price: High to Low', value: 'price_desc' },
                  { label: 'Most Popular', value: 'popular' },
                  { label: 'Best Rating', value: 'rating' },
                ]}
                value={sort}
                onChange={setSort}
                allowClear
              />
            </div>
          </Space>
        </Drawer>

        {/* Products list */}
        <div className='mt-8'>
          <h1 className='text-2xl font-bold mb-6'>
            {categoryName || 'All Products'}
            {subCategoryName && ` > ${subCategoryName}`}
          </h1>
          <Products
            search={debouncedSearch}
            sort={sort}
            category={category}
            subCategory={subCategory}
            minPrice={priceRange[0]}
            maxPrice={priceRange[1]}
          />
        </div>
      </div>
    </>
  );
};

export default Product;
