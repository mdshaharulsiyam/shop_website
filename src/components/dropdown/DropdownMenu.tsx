import { useGlobalContext } from '@/providers/ContextProvider'
import type { IDropdownMenu } from '@/types/propsTypes'
import { hexToRGBA2 } from '@/utils/hexToRGBA'
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from 'lucide-react'
import MenuLink from '../Links/MenuLink'

const DropdownMenu = ({ setShowMenu, showMenu, data, title }: IDropdownMenu) => {
  const { themeColor } = useGlobalContext()
  return (
    <div
      className="relative"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <MenuLink
        title={title}
      >
        <motion.div animate={{ rotate: showMenu ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 ml-1" />
        </motion.div>
      </MenuLink>


      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: themeColor.white,
              borderColor: hexToRGBA2(themeColor.black)
            }}
            className="absolute right-0 mt-2 w-48  rounded-lg shadow-xl border  py-2"
          >
            {data.map((item, index) => (
              <MenuLink
                href={item.href}
                title=""
                className='font-normal block'
              >
                <motion.p
                  whileHover={{ color: themeColor.black }}
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className=" px-4 py-2 text-sm transition-colors"
                >
                  {item.title}
                </motion.p>
              </MenuLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DropdownMenu
