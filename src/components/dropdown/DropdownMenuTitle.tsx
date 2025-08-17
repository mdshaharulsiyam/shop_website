import { useGlobalContext } from '@/providers/ContextProvider'
import { hexToRGBA2 } from '@/utils/hexToRGBA'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import MenuLink from '../Links/MenuLink'
import MapTitleMenu from '../shared/MapTitleMenu'
import type { IDropdownMenuTitle } from '@/types/propsTypes'

const DropdownMenuTitle = ({ setShowMenu, showMenu, data, title }: IDropdownMenuTitle) => {
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
            className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-96  rounded-lg shadow-xl border  p-6"
          >
            <div className="grid grid-cols-2 gap-6">
              <MapTitleMenu data={data} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DropdownMenuTitle
