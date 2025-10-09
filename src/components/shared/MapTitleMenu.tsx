import { useGlobalContext } from '@/providers/ContextProvider'
import { motion } from 'framer-motion'
import MenuLink from '../Links/MenuLink'
import type { IMapTitleMenu } from '@/types/propsTypes'
const MapTitleMenu = ({ data }: IMapTitleMenu) => {
  const { themeColor } = useGlobalContext()
  return (
    <>
      {data.map((category, index) => (
        <motion.div
          key={category?.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <MenuLink
            href={`/products?category=${encodeURIComponent(category?._id as any)}`}
            title={category?.name}
            className='font-semibold mb-3'
            style={{ color: themeColor.black }}
          />
          <ul className="space-y-2">
            {category.subCategories.map((subCategory) => (
              <MenuLink key={subCategory?.name}
                href={`/products?category=${encodeURIComponent(category?._id as any)}&subCategory=${encodeURIComponent(subCategory?._id as any)}`}
                title={subCategory?.name}
                className='text-sm font-normal'
              >
              </MenuLink>
            ))}
          </ul>
        </motion.div>
      ))}
    </>
  )
}

export default MapTitleMenu
